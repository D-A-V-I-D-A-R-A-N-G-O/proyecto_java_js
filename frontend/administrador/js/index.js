const API_URL = 'http://localhost:8080/api';
let usuarioActual = null;

// Verificar autenticación
window.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
        window.location.href = '../../ingreso/ingreso.html';
        return;
    }

    usuarioActual = JSON.parse(usuario);
    inicializar();
});

async function inicializar() {
    // Cargar estadísticas
    await cargarDashboard();
    await cargarLibros();
    await cargarPrestamosUsuario();
    await cargarResenasUsuario();

    // Event listeners para navegación
    document.querySelectorAll('.navbar-menu a[data-section]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            mostrarSeccion(section);
        });
    });

    // Logout
    document.getElementById('logoutBtn').addEventListener('click', (e) => {
        e.preventDefault();
        logout();
    });

    // Modales
    configurarModales();

    // Búsqueda
    document.getElementById('searchLibros').addEventListener('input', filtrarLibros);
}

function mostrarSeccion(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

async function cargarDashboard() {
    try {
        const [libros, prestamos, resenas] = await Promise.all([
            fetch(`${API_URL}/libros`).then(r => r.json()),
            fetch(`${API_URL}/prestamos/activos`).then(r => r.json()),
            fetch(`${API_URL}/resenas/usuario/${usuarioActual.id}`).then(r => r.json())
        ]);

        document.getElementById('totalLibros').textContent = libros.length;
        document.getElementById('prestamosActivos').textContent = prestamos.length;
        document.getElementById('misResenas').textContent = resenas.length;
    } catch (error) {
        console.error('Error cargando dashboard:', error);
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
        mostrarMensaje('Error al cargar libros', 'error');
    }
}

function renderizarLibros(libros) {
    const tbody = document.getElementById('librosTableBody');
    tbody.innerHTML = '';

    if (libros.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">No hay libros disponibles</td></tr>';
        return;
    }

    libros.forEach(libro => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.sinopsis || '-'}</td>
            <td><span class="badge ${libro.estado ? 'disponible' : 'ocupado'}">${libro.estado ? 'Disponible' : 'Ocupado'}</span></td>
            <td>
                <button class="btn-small" onclick="solicitarPrestamo(${libro.id}, '${libro.titulo}')">Solicitar</button>
                <button class="btn-small" onclick="mostrarResenaLibro(${libro.id})">Reseñar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function filtrarLibros() {
    const searchTerm = document.getElementById('searchLibros').value.toLowerCase();
    const rows = document.querySelectorAll('#librosTableBody tr');

    rows.forEach(row => {
        const titulo = row.cells[0].textContent.toLowerCase();
        const autor = row.cells[1].textContent.toLowerCase();

        if (titulo.includes(searchTerm) || autor.includes(searchTerm)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

async function cargarPrestamosUsuario() {
    try {
        const response = await fetch(`${API_URL}/prestamos/usuario/${usuarioActual.id}`);
        const prestamos = await response.json();
        renderizarPrestamos(prestamos);
    } catch (error) {
        mostrarMensaje('Error al cargar préstamos', 'error');
    }
}

function renderizarPrestamos(prestamos) {
    const tbody = document.getElementById('prestamosTableBody');
    tbody.innerHTML = '';

    if (prestamos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">No tienes préstamos activos</td></tr>';
        return;
    }

    prestamos.forEach(prestamo => {
        const row = document.createElement('tr');
        const estado = prestamo.fechaDevolucion ? 'Devuelto' : 'Activo';
        const badgeClass = prestamo.fechaDevolucion ? 'devuelto' : 'activo';

        row.innerHTML = `
            <td>${prestamo.libro.titulo}</td>
            <td>${prestamo.libro.autor}</td>
            <td>${formatearFecha(prestamo.fechaPrestamo)}</td>
            <td>${prestamo.fechaDevolucion ? formatearFecha(prestamo.fechaDevolucion) : '-'}</td>
            <td><span class="badge ${badgeClass}">${estado}</span></td>
        `;
        tbody.appendChild(row);
    });
}

async function cargarResenasUsuario() {
    try {
        const response = await fetch(`${API_URL}/resenas/usuario/${usuarioActual.id}`);
        const resenas = await response.json();
        renderizarResenas(resenas);
    } catch (error) {
        mostrarMensaje('Error al cargar reseñas', 'error');
    }
}

function renderizarResenas(resenas) {
    const tbody = document.getElementById('resenasTableBody');
    tbody.innerHTML = '';

    if (resenas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center">No has escrito reseñas todavía</td></tr>';
        return;
    }

    resenas.forEach(resena => {
        const row = document.createElement('tr');
        const estrellas = '⭐'.repeat(resena.puntuacion);

        row.innerHTML = `
            <td>${resena.libro.titulo}</td>
            <td>${estrellas}</td>
            <td>${resena.comentario || '-'}</td>
            <td>${formatearFecha(resena.fechaCreacion)}</td>
            <td>
                <button class="btn-small" onclick="editarResena(${resena.id})">Editar</button>
                <button class="btn-small btn-danger" onclick="eliminarResena(${resena.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function solicitarPrestamo(libroId, libroTitulo) {
    const modal = document.getElementById('prestamoModal');
    document.getElementById('modalLibroInfo').textContent = `Libro: ${libroTitulo}`;

    document.getElementById('confirmarPrestamo').onclick = async () => {
        try {
            const response = await fetch(`${API_URL}/prestamos`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    libro: { id: libroId },
                    usuario: { id: usuarioActual.id }
                })
            });

            if (response.ok) {
                mostrarMensaje('Préstamo solicitado correctamente', 'success');
                modal.style.display = 'none';
                await cargarPrestamosUsuario();
                await cargarDashboard();
            } else {
                mostrarMensaje('Error al solicitar préstamo', 'error');
            }
        } catch (error) {
            mostrarMensaje('Error de conexión', 'error');
        }
    };

    modal.style.display = 'block';
}

function mostrarResenaLibro(libroId) {
    document.getElementById('resenaLibro').value = libroId;
    document.getElementById('resenaModal').style.display = 'block';
}

function configurarModales() {
    // Modal reseña
    const resenaModal = document.getElementById('resenaModal');
    const resenaForm = document.getElementById('resenaForm');
    document.getElementById('btnAddResena').addEventListener('click', () => {
        document.getElementById('resenaLibro').value = '';
        resenaForm.reset();
        resenaModal.style.display = 'block';
    });

    resenaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const libroId = document.getElementById('resenaLibro').value;
        const puntuacion = document.getElementById('resenaPuntuacion').value;
        const comentario = document.getElementById('resenaComentario').value;

        if (!libroId || !puntuacion) {
            mostrarMensaje('Completa los campos requeridos', 'error');
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
                mostrarMensaje('Reseña guardada correctamente', 'success');
                resenaModal.style.display = 'none';
                resenaForm.reset();
                await cargarResenasUsuario();
                await cargarDashboard();
            } else {
                mostrarMensaje('Error al guardar reseña', 'error');
            }
        } catch (error) {
            mostrarMensaje('Error de conexión', 'error');
        }
    });

    // Cerrar modales
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

async function eliminarResena(resenaId) {
    if (!confirm('¿Estás seguro de que deseas eliminar esta reseña?')) return;

    try {
        const response = await fetch(`${API_URL}/resenas/${resenaId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarMensaje('Reseña eliminada', 'success');
            await cargarResenasUsuario();
            await cargarDashboard();
        } else {
            mostrarMensaje('Error al eliminar reseña', 'error');
        }
    } catch (error) {
        mostrarMensaje('Error de conexión', 'error');
    }
}

function mostrarMensaje(texto, tipo) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = texto;
    messageDiv.className = `message ${tipo}`;
    messageDiv.style.display = 'block';

    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

function formatearFecha(fechaString) {
    const fecha = new Date(fechaString);
    return fecha.toLocaleDateString('es-ES');
}

function logout() {
    localStorage.removeItem('usuario');
    localStorage.removeItem('token');
    window.location.href = '../../ingreso/ingreso.html';
}
