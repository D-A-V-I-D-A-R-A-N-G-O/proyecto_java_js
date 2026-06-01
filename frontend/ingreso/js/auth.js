const API_URL = 'http://localhost:8080/api';

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    if (!nombre || !contrasena) {
        mostrarAlerta('Por favor completa todos los campos', 'warning');
        return;
    }

    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Cargando...';

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

            mostrarAlerta('¡Login exitoso! Redirigiendo...', 'success');
            setTimeout(() => {
                if (data.rol === 'admin') {
                    window.location.href = '../admin/dashboard.html';
                } else {
                    window.location.href = '../usuario/dashboard.html';
                }
            }, 1500);
        } else {
            mostrarAlerta(data.mensaje || 'Credenciales incorrectas', 'danger');
            btn.disabled = false;
            btn.innerHTML = '<i class="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión';
        }
    } catch (error) {
        console.error('Error:', error);
        mostrarAlerta('Error de conexión con el servidor', 'danger');
        btn.disabled = false;
        btn.innerHTML = '<i class="bi bi-box-arrow-in-right me-2"></i>Iniciar Sesión';
    }
});

function mostrarAlerta(mensaje, tipo) {
    const alertContainer = document.getElementById('alertContainer');
    const alert = document.createElement('div');
    alert.className = `alert alert-${tipo} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
        <i class="bi bi-${tipo === 'success' ? 'check-circle' : tipo === 'warning' ? 'exclamation-triangle' : 'exclamation-circle'} me-2"></i>
        ${mensaje}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.innerHTML = '';
    alertContainer.appendChild(alert);
}
