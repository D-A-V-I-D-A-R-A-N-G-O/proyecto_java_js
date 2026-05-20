// User verification and utilities
// Copy this file to: frontend/usuario/js/user-verificacion.js

function verificarUsuario() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (!usuario) {
        window.location.href = "../../ingreso/ingreso.html";
        return false;
    }

    if (usuario.rol !== "USER") {
        alert("Acceso denegado");
        window.location.href = "../../ingreso/ingreso.html";
        return false;
    }

    return usuario;
}

async function displayUserName() {
    const usuario = verificarUsuario();
    if (!usuario) return;

    const nombreSpan = document.getElementById("nombre");
    if (nombreSpan) {
        nombreSpan.innerText = "Hola, " + usuario.nombre;
    }

    const bienvenida = document.getElementById("bienvenida");
    if (bienvenida) {
        bienvenida.innerText = "Bienvenido, " + usuario.nombre;
    }
}

function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "../../ingreso/ingreso.html";
}

window.onload = displayUserName;
