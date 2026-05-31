const API_URL = 'http://localhost:8080/api';

const loginForm = document.getElementById('loginForm');
const messageDiv = document.getElementById('message');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    if (!nombre || !contrasena) {
        mostrarMensaje('Por favor completa todos los campos', 'error');
        return;
    }

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, contrasena })
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem('usuario', JSON.stringify(data));
            localStorage.setItem('token', data.id);

            mostrarMensaje('¡Login exitoso! Redirigiendo...', 'success');
            setTimeout(() => {
                window.location.href = '../administrador/html/user-index.html';
            }, 1500);
        } else {
            mostrarMensaje(data.mensaje || 'Credenciales incorrectas', 'error');
        }
    } catch (error) {
        console.error('Error al conectar:', error);
        mostrarMensaje('Error de conexión con el servidor', 'error');
    }
});

function mostrarMensaje(texto, tipo) {
    messageDiv.textContent = texto;
    messageDiv.className = `message ${tipo}`;
    messageDiv.style.display = 'block';

    if (tipo === 'error') {
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 3000);
    }
}