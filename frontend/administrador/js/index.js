async function nombre() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    
    nombre = document.getElementById("bienvenido")
    
    if (!usuario) {

    window.location.href = "login.html";
    } else{
        nombre.innerText = "Hola " + usuario.nombre + " bienvenido al sistema de biblioteca de prueba"
    }
}

window.onload = nombre()