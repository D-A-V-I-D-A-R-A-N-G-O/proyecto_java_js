// User Books Page
// Copy this file to: frontend/usuario/js/user-libros.js

const API = "http://localhost:8080/libros";
const API_PRESTAMOS = "http://localhost:8080/prestamos";

async function cargarLibros() {
    try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario) return;

        const respuesta = await fetch(API);
        if (!respuesta.ok) {
            throw new Error("Error al cargar libros");
        }

        const libros = await respuesta.json();
        const container = document.getElementById("librosList");
        container.innerHTML = "";

        if (!Array.isArray(libros) || libros.length === 0) {
            container.innerHTML = "<div class='alert alert-info'>No hay libros disponibles</div>";
            return;
        }

        libros.forEach(libro => {
            const estado = libro.estado ? "Disponible" : "Prestado";
            const boton = libro.estado 
                ? `<button class="btn btn-primary btn-sm" onclick="solicitarPrestamo(${libro.idLibro}, '${libro.titulo.replace(/'/g, "\\'")}')">Solicitar</button>`
                : `<span class="badge bg-danger">No disponible</span>`;

            container.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <div class="card-body">
                            <h5 class="card-title">${libro.titulo}</h5>
                            <p class="card-text">
                                <strong>Autor:</strong> ${libro.autor}<br>
                                <strong>Estado:</strong> <span class="badge ${libro.estado ? 'bg-success' : 'bg-danger'}">${estado}</span>
                            </p>
                            <p class="card-text">${libro.sinopsis || "Sin descripción"}</p>
                        </div>
                        <div class="card-footer">
                            ${boton}
                        </div>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        console.error("Error:", err);
        document.getElementById("librosList").innerHTML = "<div class='alert alert-danger'>Error al cargar los libros</div>";
    }
}

async function solicitarPrestamo(idLibro, titulo) {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    if (!usuario) return;

    if (!confirm(`¿Deseas solicitar el préstamo de "${titulo}"?`)) {
        return;
    }

    try {
        const respuesta = await fetch(API_PRESTAMOS, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                idUsuario: usuario.idUsuario,
                idLibro: idLibro,
                fechaPrestamo: new Date().toISOString()
            })
        });

        if (respuesta.ok) {
            alert("Préstamo registrado exitosamente");
            cargarLibros();
        } else {
            const error = await respuesta.text();
            alert("Error: " + error);
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Error al solicitar el préstamo");
    }
}

window.onload = cargarLibros;
