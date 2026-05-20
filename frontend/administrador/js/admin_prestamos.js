const API = "http://localhost:8080/prestamos";

window.onload = function () {
    verificarAdmin();
    cargarPrestamos();
};

function verificarAdmin(){
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if(!usuario){
        window.location.href = "../../ingreso/ingreso.html";
        return;
    }

    if(usuario.rol !== "ADMIN"){
        alert("No tienes permisos");
        window.location.href = "index.html";
    }
}

async function cargarPrestamos(){
    try {
        const respuesta = await fetch(API);
        
        if (!respuesta.ok) {
            console.error("Error al cargar préstamos");
            return;
        }

        const prestamos = await respuesta.json();
        const tabla = document.getElementById("tablaPrestamos");
        tabla.innerHTML = "";

        if (!Array.isArray(prestamos) || prestamos.length === 0) {
            tabla.innerHTML = "<tr><td colspan='7' class='text-center'>No hay préstamos registrados</td></tr>";
            return;
        }

        prestamos.forEach(prestamo => {
            const fechaPrestamo = new Date(prestamo.fechaPrestamo).toLocaleDateString();
            const fechaDevolucion = prestamo.fechaDevolucion ? new Date(prestamo.fechaDevolucion).toLocaleDateString() : "Pendiente";
            const estado = prestamo.estado || "Activo";

            tabla.innerHTML += `
                <tr>
                    <td>${prestamo.idPrestamo}</td>
                    <td>${prestamo.usuario ? prestamo.usuario.nombre : 'N/A'}</td>
                    <td>${prestamo.libro ? prestamo.libro.titulo : 'N/A'}</td>
                    <td>${fechaPrestamo}</td>
                    <td>${fechaDevolucion}</td>
                    <td>${estado}</td>
                    <td>
                        <button class="btn btn-success btn-sm" onclick="registrarDevolucion(${prestamo.idPrestamo})">
                            Devolución
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Error:", err);
        document.getElementById("tablaPrestamos").innerHTML = "<tr><td colspan='7' class='text-center text-danger'>Error al cargar los datos</td></tr>";
    }
}

async function registrarDevolucion(idPrestamo){
    if(!confirm("¿Registrar devolución del préstamo?")){
        return;
    }

    try {
        const respuesta = await fetch(`${API}/${idPrestamo}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                estado: "Devuelto"
            })
        });

        if(respuesta.ok) {
            alert("Devolución registrada exitosamente");
            cargarPrestamos();
        }
    } catch (err) {
        console.error("Error:", err);
        alert("Error al registrar la devolución");
    }
}
