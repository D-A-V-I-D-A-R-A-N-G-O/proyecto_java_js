const API_URL = 'http://localhost:8080/api';
let usuarioActual = null;

window.addEventListener('DOMContentLoaded', () => {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
        window.location.href = '../../ingreso/ingreso.html';
        return;
    }

    usuarioActual = JSON.parse(usuario);

    if (usuarioActual.rol !== 'admin') {
        alert('No tienes permisos de administrador');
        window.location.href = '../html/user-index.html';
        return;
    }

    inicializar();
});

async function inicializar() {
    await cargarUsuarios();
    await cargarLibros();
    await cargarPrestamos();

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

    // Modales
    configurarModales();
}

function mostrarSeccion(sectionId) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(sectionId).classList.add('active');
}

async function cargarUsuarios() {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        const usuarios = await response.json();
        renderizarUsuarios(usuarios);
    } catch (error) {
        mostrarMensaje('Error al cargar usuarios', 'error');
    }
}

function renderizarUsuarios(usuarios) {
    const tbody = document.getElementById('usuariosTableBody');
    tbody.innerHTML = '';

    if (usuarios.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No hay usuarios</td></tr>';
        return;
    }

    usuarios.forEach(usuario => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nombre}</td>
            <td>${usuario.email}</td>
            <td>${usuario.celular}</td>
            <td><span class="badge ${usuario.rol === 'admin' ? 'admin' : ''}">${usuario.rol}</span></td>
            <td>
                <button class="btn-small" onclick="editarUsuario(${usuario.id})">Editar</button>
                <button class="btn-small btn-danger" onclick="eliminarUsuario(${usuario.id})">Eliminar</button>
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
        mostrarMensaje('Error al cargar libros', 'error');
    }
}

function renderizarLibros(libros) {
    const tbody = document.getElementById('librosTableBody');
    tbody.innerHTML = '';

    if (libros.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center">No hay libros</td></tr>';
        return;
    }

    libros.forEach(libro => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${libro.id}</td>
            <td>${libro.titulo}</td>
            <td>${libro.autor}</td>
            <td>${libro.sinopsis || '-'}</td>
            <td><span class="badge ${libro.estado ? 'disponible' : 'ocupado'}">${libro.estado ? 'Disponible' : 'Ocupado'}</span></td>
            <td>
                <button class="btn-small" onclick="editarLibro(${libro.id})">Editar</button>
                <button class="btn-small btn-danger" onclick="eliminarLibro(${libro.id})">Eliminar</button>
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
        mostrarMensaje('Error al cargar préstamos', 'error');
    }
}

function renderizarPrestamos(prestamos) {
    const tbody = document.getElementById('prestamosTableBody');
    tbody.innerHTML = '';

    if (prestamos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align:center">No hay préstamos</td></tr>';
        return;
    }

    prestamos.forEach(prestamo => {
        const row = document.createElement('tr');
        const estado = prestamo.fechaDevolucion ? 'Devuelto' : 'Activo';
        const badgeClass = prestamo.fechaDevolucion ? 'devuelto' : 'activo';

        row.innerHTML = `
            <td>${prestamo.id}</td>
            <td>${prestamo.usuario.nombre}</td>
            <td>${prestamo.libro.titulo}</td>
            <td>${formatearFecha(prestamo.fechaPrestamo)}</td>
            <td>${prestamo.fechaDevolucion ? formatearFecha(prestamo.fechaDevolucion) : '-'}</td>
            <td><span class="badge ${badgeClass}">${estado}</span></td>
            <td>
                <button class="btn-small" onclick="verDetalles(${prestamo.id})">Detalles</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function configurarModales() {
    // Modal Usuario
    const usuarioModal = document.getElementById('usuarioModal');
    const usuarioForm = document.getElementById('usuarioForm');

    document.getElementById('btnAddUsuario').addEventListener('click', () => {
        document.getElementById('usuarioId').value = '';
        usuarioForm.reset();
        document.getElementById('usuarioModalTitle').textContent = 'Nuevo Usuario';
        document.getElementById('usuarioContrasena').required = true;
        usuarioModal.style.display = 'block';
    });

    usuarioForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('usuarioId').value;
        const nombre = document.getElementById('usuarioNombre').value;
        const email = document.getElementById('usuarioEmail').value;
        const celular = document.getElementById('usuarioCelular').value;
        const contrasena = document.getElementById('usuarioContrasena').value;
        const rol = document.getElementById('usuarioRol').value;

        if (!nombre || !email || !celular || !rol) {
            mostrarMensaje('Completa todos los campos', 'error');
            return;
        }

        if (!id && !contrasena) {
            mostrarMensaje('La contraseña es requerida para nuevos usuarios', 'error');
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
                mostrarMensaje(id ? 'Usuario actualizado' : 'Usuario creado', 'success');
                usuarioModal.style.display = 'none';
                await cargarUsuarios();
            } else {
                mostrarMensaje('Error al guardar usuario', 'error');
            }
        } catch (error) {
            mostrarMensaje('Error de conexión', 'error');
        }
    });

    // Modal Libro
    const libroModal = document.getElementById('libroModal');
    const libroForm = document.getElementById('libroForm');

    document.getElementById('btnAddLibro').addEventListener('click', () => {
        document.getElementById('libroId').value = '';
        libroForm.reset();
        document.getElementById('libroModalTitle').textContent = 'Nuevo Libro';
        libroModal.style.display = 'block';
    });

    libroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('libroId').value;
        const titulo = document.getElementById('libroTitulo').value;
        const autor = document.getElementById('libroAutor').value;
        const sinopsis = document.getElementById('libroSinopsis').value;
        const estado = document.getElementById('libroEstado').value === 'true';

        if (!titulo || !autor) {
            mostrarMensaje('Completa los campos requeridos', 'error');
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
                mostrarMensaje(id ? 'Libro actualizado' : 'Libro creado', 'success');
                libroModal.style.display = 'none';
                await cargarLibros();
            } else {
                mostrarMensaje('Error al guardar libro', 'error');
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
        document.getElementById('usuarioContrasena').required = false;
        document.getElementById('usuarioModalTitle').textContent = 'Editar Usuario';

        document.getElementById('usuarioModal').style.display = 'block';
    } catch (error) {
        mostrarMensaje('Error al cargar usuario', 'error');
    }
}

async function editarLibro(id) {
    try {
        const response = await fetch(`${API_URL}/libros/${id}`);
        const libro = await response.json();

        document.getElementById('libroId').value = libro.id;
        document.getElementById('libroTitulo').value = libro.titulo;
        document.getElementById('libroAutor').value = libro.autor;
        document.getElementById('libroSinopsis').value = libro.sinopsis;
        document.getElementById('libroEstado').value = libro.estado ? 'true' : 'false';
        document.getElementById('libroModalTitle').textContent = 'Editar Libro';

        document.getElementById('libroModal').style.display = 'block';
    } catch (error) {
        mostrarMensaje('Error al cargar libro', 'error');
    }
}

async function eliminarUsuario(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este usuario?')) return;

    try {
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarMensaje('Usuario eliminado', 'success');
            await cargarUsuarios();
        } else {
            mostrarMensaje('Error al eliminar usuario', 'error');
        }
    } catch (error) {
        mostrarMensaje('Error de conexión', 'error');
    }
}

async function eliminarLibro(id) {
    if (!confirm('¿Estás seguro de que deseas eliminar este libro?')) return;

    try {
        const response = await fetch(`${API_URL}/libros/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            mostrarMensaje('Libro eliminado', 'success');
            await cargarLibros();
        } else {
            mostrarMensaje('Error al eliminar libro', 'error');
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
