const API = "http://localhost:8080/libros";



async function cargarLibros() {

    const respuesta = await fetch(API);
    const libros = await respuesta.json();

    const tabla = document.getElementById("tablaLibros");

    tabla.innerHTML = "";

    libros.forEach(libro => {

        tabla.innerHTML += `
            <tr>
                <td>${libro.idLibro}</td>
                <td>${libro.titulo}</td>
                <td>${libro.autor}</td>
                <td>${libro.estado ? "Disponible" : "Prestado"}</td>

                <td>
                    <button class="btn btn-warning btn-sm"
                        onclick="editarLibro(${libro.idLibro})">
                        Editar
                    </button>

                    <button class="btn btn-danger btn-sm"
                        onclick="eliminarLibro(${libro.idLibro})">
                        Eliminar
                    </button>
                </td>
            </tr>
        `;
    });
}

async function guardarLibro() {

    const id = document.getElementById("idLibro").value;

    const libro = {
        titulo: document.getElementById("titulo").value,
        autor: document.getElementById("autor").value,
        sinopsis: document.getElementById("sinopsis").value,
        estado: document.getElementById("estado").value === "true"
    };

    if(id){

        await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(libro)
        });

    }else{

        await fetch(API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(libro)
        });
    }

    limpiarFormulario();

    cargarLibros();
}

async function editarLibro(id) {

    const respuesta = await fetch(`${API}/id/${id}`);

    const libro = await respuesta.json();

    document.getElementById("idLibro").value = libro.idLibro;
    document.getElementById("titulo").value = libro.titulo;
    document.getElementById("autor").value = libro.autor;
    document.getElementById("sinopsis").value = libro.sinopsis;
    document.getElementById("estado").value = libro.estado;
}

async function eliminarLibro(id) {

    if(!confirm("¿Eliminar libro?")){
        return;
    }

    await fetch(`${API}/${id}`, {
        method: "DELETE"
    });

    cargarLibros();
}

function limpiarFormulario(){

    document.getElementById("idLibro").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("sinopsis").value = "";
    document.getElementById("estado").value = "true";
}

window.onload = cargarLibros();