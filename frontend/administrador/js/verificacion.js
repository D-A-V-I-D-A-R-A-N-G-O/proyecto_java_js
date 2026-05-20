async function displayUserName() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const nombreSpan = document.getElementById("nombre");
    
    if (!usuario) {
        window.location.href = "../../ingreso/ingreso.html";
    } else {
        nombreSpan.innerText = "Hola, " + usuario.nombre;
    }
}

function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "../../ingreso/ingreso.html";
}

window.onload = displayUserName();