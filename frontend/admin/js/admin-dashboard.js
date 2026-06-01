const API_URL = 'http://localhost:8080/api';
let usuarioActual = null;

window.addEventListener('DOMContentLoaded', async () => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
        window.location.href = '../../ingreso/index.html';
        return;
    }

    usuarioActual = JSON.parse(usuario);

    if (usuarioActual.rol !== 'admin') {
        alert('No tienes permisos de administrador');
        window.location.href = '../../usuario/dashboard.html';
        return;
    }

    document.getElementById('usuarioInfo').textContent = `Bienvenido, ${usuarioActual.nombre} (Admin)`;
    await inicializar();
});

async function inicializar() {
    await cargarDashboard();

    // Navegación
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

    // Formularios
    document.getElementById('usuarioForm').addEventListener('submit', (e) => {
        e.preventDefault();
        guardarUsuario();
    });

    document.getElementById('libroForm').addEventListener('submit', (e) => {
        e.preventDefault();
        guardarLibro();
    });

    // Botones
    document.querySelector('[data-bs-target="#usuarioModal"]').addEventListener('click', () => {
        limpiarFormularioUsuario();
    });

    document.querySelector('[data-bs-target="#libroModal"]').addEventListener('click', () => {
        limpiarFormularioLibro();
    });
}

function mostrarSeccion(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');

    document.querySelectorAll('[data-section]').forEach(link => {
        link.classList.toggle('active', link.dataset.section === sectionId);
    });

    const titulos = {
        dashboard: 'Dashboard',
        usuarios: 'Gestión de Usuarios',
        libros: 'Gestión de Libros',
        prestamos: 'Gestión de Préstamos',
        resenas: 'Gestión de Reseñas'
    };

    document.getElementById('pageTitle').textContent = titulos[sectionId] || 'Dashboard';

    // Cargar datos
    if (sectionId === 'usuarios') cargarUsuarios();
    if (sectionId === 'libros') cargarLibros();
    if (sectionId === 'prestamos') cargarPrestamos();
    if (sectionId === 'resenas') cargarResenas();
}

async function cargarDashboard() {
    try {
        const [usuarios, libros, prestamos, resenas] = await Promise.all([
            fetch(`${API_URL}/usuarios`).then(r => r.json()),
            fetch(`${API_URL}/libros`).then(r => r.json()),
            fetch(`${API_URL}/prestamos`).then(r => r.json()),
            fetch(`${API_URL}/resenas`).then(r => r.json())
        ]);

        document.getElementById('totalUsuarios').textContent = usuarios.length;
        document.getElementById('totalLibros').textContent = libros.length;
        document.getElementById('prestamosActivos').textContent = prestamos.filter(p => !p.fechaDevolucion).length;
        document.getElementById('totalResenas').textContent = resenas.length;
    } catch (error) {
        mostrarAlerta('Error al cargar dashboard', 'danger');
    }
}

async function cargarUsuarios() {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        const usuarios = await response.json();
        renderizarUsuarios(usuarios);
    } catch (error) {
        mostrarAlerta('Error al cargar usuarios', 'danger');
    }
}

function renderizarUsuarios(usuarios) {
    const tbody = document.getElementById('usuariosTableBody');
    tbody.innerHTML = '';

    if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">No hay usuarios</td></tr>';
        return;
    }

    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        const rolBadge = usuario.rol === 'admin' ? 'bg-danger' : 'bg-secondary';
        row.innerHTML = `
            <td><strong>${usuario.id}</strong></td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.celular}</td>
            <td><span class="badge ${rolBadge}">${usuario.rol}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarUsuario(${usuario.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${usuario.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function cargarLibros() {
    try {
        const response = await fetch(`${API_URL}/libros`);
        const libros = await response.json();
        renderizarLibros(libros);
    } catch (error) {
        mostrarAlerta('Error al cargar libros', 'danger');
    }
}

function renderizarLibros(libros) {
    const tbody = document.getElementById('librosTableBody');
    tbody.innerHTML = '';

    if (libros.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" class="text-center py-4">No hay libros</td></tr>';
        return;
    }

    libros.forEach(libro => {
        const row = document.createElement('tr');
        const estadoBadge = libro.estado ? 'bg-success' : 'bg-danger';
        row.innerHTML = `
            <td><strong>${libro.id}</strong></td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td><span class="badge ${estadoBadge}">${libro.estado ? 'Disponible' : 'Ocupado'}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="editarLibro(${libro.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="eliminarLibro(${libro.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

async function cargarPrestamos() {
    try {
        const response = await fetch(`${API_URL}/prestamos`);
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
        tbody.innerHTML = '<tr><td colspan="6" class="text-center py-4">No hay préstamos</td></tr>';
        return;
    }

    prestamos.forEach(prestamo => {
        const row = document.createElement('tr');
        const estado = prestamo.fechaDevolucion ? 'Devuelto' : 'Activo';
        const estadoBadge = prestamo.fechaDevolucion ? 'bg-secondary' : 'bg-success';
        row.innerHTML = `
            <td><strong>${prestamo.id}</strong></td>
            <td>${prestamo.usuario.nombre}</td>
            <td>${prestamo.libro.titulo}</td>
            <td>${formatearFecha(prestamo.fechaPrestamo)}</td>
            <td>${prestamo.fechaDevolucion ? formatearFecha(prestamo.fechaDevolucion) : '-'}</td>
            <td><span class="badge ${estadoBadge}">${estado}</span></td>
        `;
        tbody.appendChild(row);
    });
}

async function cargarResenas() {
    try {
        const response = await fetch(`${API_URL}/resenas`);
        const resenas = await response.json();
        renderizarResenas(resenas);
    } catch (error) {
        mostrarAlerta('Error al cargar reseñas', 'danger');
    }
}

function renderizarResenas(resenas) {
    const tbody = document.getElementById('resenasTableBody');
    tbody.innerHTML = '';

    if (resenas.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" class="text-center py-4">No hay reseñas</td></tr>';
        return;
    }

    resenas.forEach(resena => {
        const row = document.createElement('tr');
        const estrellas = '⭐'.repeat(resena.puntuacion);
        row.innerHTML = `
            <td><strong>${resena.id}</strong></td>
            <td>${resena.usuario.nombre}</td>
            <td>${resena.libro.titulo}</td>
            <td>${estrellas}</td>
            <td>${resena.comentario ? resena.comentario.substring(0, 50) + '...' : '-'}</td>
            <td>${formatearFecha(resena.fechaCreacion)}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="eliminarResena(${resena.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function limpiarFormularioUsuario() {
    document.getElementById('usuarioForm').reset();
    document.getElementById('usuarioId').value = '';
    document.getElementById('usuarioModalTitle').textContent = 'Nuevo Usuario';
}

function limpiarFormularioLibro() {
    document.getElementById('libroForm').reset();
    document.getElementById('libroId').value = '';
    document.getElementById('libroModalTitle').textContent = 'Nuevo Libro';
}

async function guardarUsuario() {
    const id = document.getElementById('usuarioId').value;
    const nombre = document.getElementById('usuarioNombre').value;
    const email = document.getElementById('usuarioEmail').value;
    const celular = document.getElementById('usuarioCelular').value;
    const contrasena = document.getElementById('usuarioContrasena').value;
    const rol = document.getElementById('usuarioRol').value;

    if (!nombre || !email || !celular || !rol) {
        mostrarAlerta('Completa todos los campos requeridos', 'warning');
        return;
    }

    if (!id && !contrasena) {
        mostrarAlerta('La contraseña es requerida para nuevos usuarios', 'warning');
        return;
    }

    const payload = { nombre, email, celular, rol };
    if (contrasena) payload.contrasena = contrasena;

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/usuarios/${id}` : `${API_URL}/usuarios`;

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            mostrarAlerta(id ? 'Usuario actualizado' : 'Usuario creado', 'success');
            bootstrap.Modal.getInstance(document.getElementById('usuarioModal')).hide();
            await Promise.all([cargarUsuarios(), cargarDashboard()]);
        } else {
            mostrarAlerta('Error al guardar usuario', 'danger');
        }
    } catch (error) {
        mostrarAlerta('Error de conexión', 'danger');
    }
}

async function guardarLibro() {
    const id = document.getElementById('libroId').value;
    const titulo = document.getElementById('libroTitulo').value;
    const autor = document.getElementById('libroAutor').value;
    const sinopsis = document.getElementById('libroSinopsis').value;
    const estado = document.getElementById('libroEstado').value === 'true';

    if (!titulo || !autor) {
        mostrarAlerta('Completa los campos requeridos', 'warning');
        return;
    }

    const payload = { titulo, autor, sinopsis, estado };

    try {
        const method = id ? 'PUT' : 'POST';
        const url = id ? `${API_URL}/libros/${id}` : `${API_URL}/libros`;

        const response = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            mostrarAlerta(id ? 'Libro actualizado' : 'Libro creado', 'success');
            bootstrap.Modal.getInstance(document.getElementById('libroModal')).hide();
            await Promise.all([cargarLibros(), cargarDashboard()]);
        } else {
            mostrarAlerta('Error al guardar libro', 'danger');
        }
    } catch (error) {
        mostrarAlerta('Error de conexión', 'danger');
    }
}

async function editarUsuario(id) {
    try {
        const response = await fetch(`${API_URL}/usuarios/${id}`);
        const usuario = await response.json();

        document.getElementById('usuarioId').value = usuario.id;
        document.getElementById('usuarioNombre').value = usuario.nombre;
        document.getElementById('usuarioEmail').value = usuario.email;
        document.getElementById('usuarioCelular').value = usuario.celular;
        document.getElementById('usuarioRol').value = usuario.rol;
        document.getElementById('usuarioContrasena').value = '';
        document.getElementById('usuarioModalTitle').textContent = 'Editar Usuario';

        new bootstrap.Modal(document.getElementById('usuarioModal')).show();
    } catch (error) {
        mostrarAlerta('Error al cargar usuario', 'danger');
    }
}

async function editarLibro(id) {
    try {
        const response = await fetch(`${API_URL}/libros/${id}`);
        const libro = await response.json();

        document.getElementById('libroId').value = libro.id;
        document.getElementById('libroTitulo').value = libro.titulo;
        document.getElementById('libroAutor').value = libro.autor;
        document.getElementById('libroSinopsis').value = libro.sinopsis || '';
        document.getElementById('libroEstado').value = libro.estado ? 'true' : 'false';
        document.getElementById('libroModalTitle').textContent = 'Editar Libro';

        new bootstrap.Modal(document.getElementById('libroModal')).show();
    } catch (error) {
        mostrarAlerta('Error al cargar libro', 'danger');
    }
}

async function eliminarUsuario(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

    try {
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarAlerta('Usuario eliminado', 'success');
            await Promise.all([cargarUsuarios(), cargarDashboard()]);
        } else {
            mostrarAlerta('Error al eliminar usuario', 'danger');
        }
    } catch (error) {
        mostrarAlerta('Error de conexión', 'danger');
    }
}

async function eliminarLibro(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este libro?')) return;

    try {
        const response = await fetch(`${API_URL}/libros/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarAlerta('Libro eliminado', 'success');
            await Promise.all([cargarLibros(), cargarDashboard()]);
        } else {
            mostrarAlerta('Error al eliminar libro', 'danger');
        }
    } catch (error) {
        mostrarAlerta('Error de conexión', 'danger');
    }
}

async function eliminarResena(id) {
    if (!confirm('¿Estás seguro?')) return;

    try {
        const response = await fetch(`${API_URL}/resenas/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarAlerta('Reseña eliminada', 'success');
            await cargarResenas();
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