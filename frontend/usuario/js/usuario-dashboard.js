const API_URL = 'http://localhost:8080/api';
let usuarioActual = null;
let libroSeleccionadoId = null;

// Verificar autenticación
window.addEventListener('DOMContentLoaded', async () => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
        window.location.href = '../../ingreso/index.html';
        return;
    }

    usuarioActual = JSON.parse(usuario);
    await inicializar();
});

async function inicializar() {
    // Cargar datos iniciales
    await Promise.all([
        cargarDashboard(),
        cargarLibros(),
        cargarPrestamos(),
        cargarResenas()
    ]);

    // Event listeners para navegación
    document.querySelectorAll('[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            mostrarSeccion(link.dataset.section);
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });

    // Búsqueda
    document.getElementById('searchLibros').addEventListener('input', filtrarLibros);

    // Formulario reseña
    document.getElementById('resenaForm').addEventListener('submit', (e) => {
        e.preventDefault();
        guardarResena();
    });
}

function mostrarSeccion(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    // Update navbar
    document.querySelectorAll('[data-section]').forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
    });

    // Reload data
    if (sectionId === 'libros') {
        cargarLibros();
    } else if (sectionId === 'prestamos') {
        cargarPrestamos();
    } else if (sectionId === 'resenas') {
        cargarResenas();
    }
}

async function cargarDashboard() {
    try {
        const [libros, prestamos, resenas] = await Promise.all([
            fetch(`${API_URL}/libros`).then(r => r.json()),
            fetch(`${API_URL}/prestamos/usuario/${usuarioActual.id}`).then(r => r.json()),
            fetch(`${API_URL}/resenas/usuario/${usuarioActual.id}`).then(r => r.json())
        ]);

        document.getElementById('totalLibros').textContent = libros.length;
        document.getElementById('prestamosActivos').textContent = prestamos.filter(p => !p.fechaDevolucion).length;
        document.getElementById('misResenas').textContent = resenas.length;
    } catch (error) {
        console.error('Error cargando dashboard:', error);
        mostrarAlerta('Error al cargar el dashboard', 'danger');
    }
}

async function cargarLibros() {
    try {
        const response = await fetch(`${API_URL}/libros`);
        const libros = await response.json();
        renderizarLibros(libros);

        // Cargar en select de reseña
        const select = document.getElementById('resenaLibro');
        select.innerHTML = '<option value="">Selecciona un libro</option>';
        libros.forEach(libro => {
            const option = document.createElement('option');
            option.value = libro.id;
            option.textContent = libro.titulo;
            select.appendChild(option);
        });
    } catch (error) {
        mostrarAlerta('Error al cargar libros', 'danger');
    }
}

function renderizarLibros(libros) {
    const grid = document.getElementById('librosGrid');
    grid.innerHTML = '';

    if (libros.length === 0) {
        grid.innerHTML = '<div class="col-12"><div class="alert alert-info">No hay libros disponibles</div></div>';
        return;
    }

    libros.forEach(libro => {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="card book-card border-0 shadow-sm h-100">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <h5 class="card-title">${libro.titulo}</h5>
                        <span class="badge ${libro.estado ? 'bg-success' : 'bg-danger'}">
                            ${libro.estado ? 'Disponible' : 'Ocupado'}
                        </span>
                    </div>
                    <p class="card-text small text-muted mb-3">
                        <strong>Autor:</strong> ${libro.autor}
                    </p>
                    <p class="card-text small mb-3">
                        ${libro.sinopsis ? libro.sinopsis.substring(0, 100) + '...' : 'Sin sinopsis'}
                    </p>
                    <div class="d-grid gap-2">
                        <button
                            class="btn btn-sm btn-primary"
                            onclick="abrirModalPrestamo(${libro.id}, '${libro.titulo}')"
                            ${!libro.estado ? 'disabled' : ''}
                        >
                            <i class="bi bi-box-seam me-1"></i>Solicitar Préstamo
                        </button>
                        <button
                            class="btn btn-sm btn-outline-warning"
                            onclick="abrirModalResena(${libro.id})"
                        >
                            <i class="bi bi-star me-1"></i>Dejar Reseña
                        </button>
                    </div>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function filtrarLibros() {
    const searchTerm = document.getElementById('searchLibros').value.toLowerCase();
    const cards = document.querySelectorAll('.book-card');

    cards.forEach(card => {
        const titulo = card.querySelector('.card-title').textContent.toLowerCase();
        const autor = card.textContent.toLowerCase();

        if (titulo.includes(searchTerm) || autor.includes(searchTerm)) {
            card.closest('.col-md-6').style.display = '';
        } else {
            card.closest('.col-md-6').style.display = 'none';
        }
    });
}

async function cargarPrestamos() {
    try {
        const response = await fetch(`${API_URL}/prestamos/usuario/${usuarioActual.id}`);
        const prestamos = await response.json();
        renderizarPrestamos(prestamos);
    } catch (error) {
        mostrarAlerta('Error al cargar préstamos', 'danger');
    }
}

function renderizarPrestamos(prestamos) {
    const tbody = document.getElementById('prestamosTableBody');
    tbody.innerHTML = '';

    if (prestamos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4">No tienes préstamos</td></tr>';
        return;
    }

    prestamos.forEach(prestamo => {
        const estado = prestamo.fechaDevolucion ? 'Devuelto' : 'Activo';
        const badge = prestamo.fechaDevolucion ? 'bg-secondary' : 'bg-success';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${prestamo.libro.titulo}</strong></td>
            <td>${prestamo.libro.autor}</td>
            <td>${formatearFecha(prestamo.fechaPrestamo)}</td>
            <td>${prestamo.fechaDevolucion ? formatearFecha(prestamo.fechaDevolucion) : '-'}</td>
            <td><span class="badge ${badge}">${estado}</span></td>
        `;
        tbody.appendChild(row);
    });
}

async function cargarResenas() {
    try {
        const response = await fetch(`${API_URL}/resenas/usuario/${usuarioActual.id}`);
        const resenas = await response.json();
        renderizarResenas(resenas);
    } catch (error) {
        mostrarAlerta('Error al cargar reseñas', 'danger');
    }
}

function renderizarResenas(resenas) {
    const container = document.getElementById('resenasContainer');
    container.innerHTML = '';

    if (resenas.length === 0) {
        container.innerHTML = '<div class="col-12"><div class="alert alert-info">No has escrito reseñas todavía</div></div>';
        return;
    }

    resenas.forEach(resena => {
        const estrellas = '⭐'.repeat(resena.puntuacion);
        const card = document.createElement('div');
        card.className = 'col-md-6 col-lg-4';
        card.innerHTML = `
            <div class="card review-card border-0 shadow-sm h-100">
                <div class="card-body">
                    <h5 class="card-title">${resena.libro.titulo}</h5>
                    <p class="card-text small text-muted mb-2">
                        <strong>Autor:</strong> ${resena.libro.autor}
                    </p>
                    <div class="mb-3">
                        <span class="stars">${estrellas}</span>
                        <span class="text-muted small">(${resena.puntuacion}/5)</span>
                    </div>
                    <p class="card-text small mb-3">
                        ${resena.comentario || 'Sin comentario'}
                    </p>
                    <small class="text-muted">
                        <i class="bi bi-calendar me-1"></i>${formatearFecha(resena.fechaCreacion)}
                    </small>
                    <div class="mt-3 d-flex gap-2">
                        <button
                            class="btn btn-sm btn-outline-primary flex-grow-1"
                            onclick="editarResena(${resena.id})"
                        >
                            <i class="bi bi-pencil me-1"></i>Editar
                        </button>
                        <button
                            class="btn btn-sm btn-outline-danger"
                            onclick="eliminarResena(${resena.id})"
                        >
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function abrirModalPrestamo(libroId, libroTitulo) {
    libroSeleccionadoId = libroId;
    document.getElementById('modalLibroInfo').textContent = `¿Deseas solicitar el préstamo de "${libroTitulo}"?`;
    const modal = new bootstrap.Modal(document.getElementById('prestamoModal'));
    modal.show();
}

async function confirmarPrestamo() {
    if (!libroSeleccionadoId) return;

    try {
        const response = await fetch(`${API_URL}/prestamos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                libro: { id: libroSeleccionadoId },
                usuario: { id: usuarioActual.id }
            })
        });

        if (response.ok) {
            mostrarAlerta('Préstamo solicitado correctamente', 'success');
            bootstrap.Modal.getInstance(document.getElementById('prestamoModal')).hide();
            await Promise.all([cargarDashboard(), cargarPrestamos(), cargarLibros()]);
        } else {
            const errorData = await response.json();
            const mensajeError = errorData.error || 'Error al solicitar préstamo';
            mostrarAlerta(mensajeError, 'danger');
        }
    } catch (error) {
        mostrarAlerta('Error de conexión', 'danger');
    }
}

function abrirModalResena(libroId) {
    document.getElementById('resenaLibro').value = libroId;
    const modal = new bootstrap.Modal(document.getElementById('resenaModal'));
    modal.show();
}

async function guardarResena() {
    const libroId = document.getElementById('resenaLibro').value;
    const puntuacion = document.getElementById('resenaPuntuacion').value;
    const comentario = document.getElementById('resenaComentario').value;

    if (!libroId || !puntuacion) {
        mostrarAlerta('Completa los campos requeridos', 'warning');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/resenas`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                usuario: { id: usuarioActual.id },
                libro: { id: parseInt(libroId) },
                puntuacion: parseInt(puntuacion),
                comentario
            })
        });

        if (response.ok) {
            mostrarAlerta('Reseña guardada correctamente', 'success');
            bootstrap.Modal.getInstance(document.getElementById('resenaModal')).hide();
            document.getElementById('resenaForm').reset();
            await Promise.all([cargarResenas(), cargarDashboard()]);
        } else {
            mostrarAlerta('Error al guardar reseña', 'danger');
        }
    } catch (error) {
        mostrarAlerta('Error de conexión', 'danger');
    }
}

async function editarResena(resenaId) {
    // Implementar edición
    mostrarAlerta('Funcionalidad en desarrollo', 'info');
}

async function eliminarResena(resenaId) {
    if (!confirm('¿Estás seguro?')) return;

    try {
        const response = await fetch(`${API_URL}/resenas/${resenaId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarAlerta('Reseña eliminada', 'success');
            await Promise.all([cargarResenas(), cargarDashboard()]);
        } else {
            mostrarAlerta('Error al eliminar reseña', 'danger');
        }
    } catch (error) {
        mostrarAlerta('Error de conexión', 'danger');
    }
}

function mostrarAlerta(mensaje, tipo) {
    const container = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert alert-${tipo} alert-dismissible fade show`;
    alert.innerHTML = `
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    container.appendChild(alert);

    setTimeout(() => alert.remove(), 5000);
}

function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES');
}

function logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    window.location.href = '../ingreso/index.html';
}