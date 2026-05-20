async function nombre() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    const nombreSpan = document.getElementById("nombre");
    
    if (!usuario) {
        window.location.href = "../../ingreso/ingreso.html";
    } else {
        nombreSpan.innerText = "Hola " + usuario.nombre;
    }
}

window.onload = nombre();