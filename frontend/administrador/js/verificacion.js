async function nombre() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    nombre = document.getElementById("nombre")
    
    if (!usuario) {

    window.location.href = "../../ingreso/ingreso.html";

    } else{
        nombre.innerText = "Hola " + usuario.nombre 
    }
}

window.onload = nombre()