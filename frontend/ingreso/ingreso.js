async function login() {

    const nombre = document.getElementById("nombre").value;
    const contrasena = document.getElementById("contrasena").value;

    const respuesta = await fetch(
        "http://localhost:8080/auth/login",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                nombre: nombre,
                contrasena: contrasena
            })
        }
    );

    const mensaje = document.getElementById("mensaje");

    if (respuesta.ok) {

        const usuario = await respuesta.json();

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );

        window.location.href = "index.html";

    } else {

        const error = await respuesta.text();

        mensaje.innerText = error;
    }
}