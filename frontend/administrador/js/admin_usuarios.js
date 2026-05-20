const API = "http://localhost:8080/usuarios";

window.onload = function () {

    verificarAdmin();

    cargarUsuarios();
};

function verificarAdmin(){

    const usuario =
        JSON.parse(localStorage.getItem("usuario"));

    if(!usuario){

        window.location.href = "login.html";

        return;
    }

    if(usuario.rol !== "ADMIN"){

        alert("No tienes permisos");

        window.location.href = "index.html";
    }
}

async function cargarUsuarios(){

    const respuesta = await fetch(API);

    const usuarios = await respuesta.json();

    const tabla =
        document.getElementById("tablaUsuarios");

    tabla.innerHTML = "";

    usuarios.forEach(usuario => {

        tabla.innerHTML += `
            <tr>
                <td>${usuario.idUsuario}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.celular}</td>
                <td>${usuario.rol}</td>

                <td>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="editarUsuario(
                            ${usuario.idUsuario}
                        )">

                        Editar

                    </button>

                    <button
                        class="btn btn-danger btn-sm"
                        onclick="eliminarUsuario(
                            ${usuario.idUsuario}
                        )">

                        Eliminar

                    </button>

                </td>
            </tr>
        `;
    });
}

async function guardarUsuario(){

    const id =
        document.getElementById(
            "idUsuario"
        ).value;

    const usuario = {

        nombre:
            document.getElementById(
                "nombre"
            ).value,

        contrasena:
            document.getElementById(
                "contrasena"
            ).value,

        celular:
            document.getElementById(
                "celular"
            ).value,

        rol:
            document.getElementById(
                "rol"
            ).value
    };

    if(id){

        await fetch(`${API}/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(usuario)
        });

    }else{

        await fetch(API, {

            method: "POST",

            headers: {
                "Content-Type":
                    "application/json"
            },

            body: JSON.stringify(usuario)
        });
    }

    limpiarFormulario();

    cargarUsuarios();
}

async function editarUsuario(id){

    const respuesta =
        await fetch(`${API}/${id}`);

    const usuario =
        await respuesta.json();

    document.getElementById(
        "idUsuario"
    ).value = usuario.idUsuario;

    document.getElementById(
        "nombre"
    ).value = usuario.nombre;

    document.getElementById(
        "contrasena"
    ).value = usuario.contrasena;

    document.getElementById(
        "celular"
    ).value = usuario.celular;

    document.getElementById(
        "rol"
    ).value = usuario.rol;
}

async function eliminarUsuario(id){

    if(!confirm("¿Eliminar usuario?")){
        return;
    }

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    cargarUsuarios();
}

function limpiarFormulario(){

    document.getElementById(
        "idUsuario"
    ).value = "";

    document.getElementById(
        "nombre"
    ).value = "";

    document.getElementById(
        "contrasena"
    ).value = "";

    document.getElementById(
        "celular"
    ).value = "";

    document.getElementById(
        "rol"
    ).value = "USER";
}