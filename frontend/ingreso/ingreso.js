async function login(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value;
    const contrasena = document.getElementById("contrasena").value;
    const mensajeDiv = document.getElementById("mensaje");

    if (!nombre || !contrasena) {
        mensajeDiv.textContent = "Por favor complete todos los campos";
        mensajeDiv.classList.remove("d-none");
        return;
    }

    try {
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

        if (respuesta.ok) {
            const usuario = await respuesta.json();

            localStorage.setItem(
                "usuario",
                JSON.stringify(usuario)
            );

            if (usuario.rol === "ADMIN") {
                window.location.href = "../administrador/html/index.html"
            } else {
                window.location.href = "../usuario/html/index.html"
            }

        } else {
            const error = await respuesta.text();
            mensajeDiv.textContent = error || "Error al iniciar sesión";
            mensajeDiv.classList.remove("d-none");
        }
    } catch (err) {
        mensajeDiv.textContent = "Error de conexión: " + err.message;
        mensajeDiv.classList.remove("d-none");
    }
}