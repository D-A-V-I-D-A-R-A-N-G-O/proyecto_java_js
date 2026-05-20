// User Loans Page
// Copy this file to: frontend/usuario/js/user-prestamos.js

const API_PRESTAMOS = "http://localhost:8080/prestamos";

async function cargarMisPrestamos() {
    try {
        const usuario = JSON.parse(localStorage.getItem("usuario"));
        if (!usuario) return;

        const respuesta = await fetch(API_PRESTAMOS);
        if (!respuesta.ok) {
            throw new Error("Error al cargar préstamos");
        }

        const todosLosPrestamos = await respuesta.json();
        const misPrestamos = todosLosPrestamos.filter(p => p.usuario && p.usuario.idUsuario === usuario.idUsuario);

        const tabla = document.getElementById("tablaPrestamos");
        tabla.innerHTML = "";

        if (!Array.isArray(misPrestamos) || misPrestamos.length === 0) {
            tabla.innerHTML = "<tr><td colspan='5' class='text-center'>No tienes préstamos activos</td></tr>";
            return;
        }

        misPrestamos.forEach(prestamo => {
            const fechaPrestamo = new Date(prestamo.fechaPrestamo).toLocaleDateString();
            const fechaDevolucion = prestamo.fechaDevolucion ? new Date(prestamo.fechaDevolucion).toLocaleDateString() : "Pendiente";
            const estado = prestamo.estado || "Activo";

            tabla.innerHTML += `
                <tr>
                    <td>${prestamo.libro ? prestamo.libro.titulo : 'N/A'}</td>
                    <td>${prestamo.libro ? prestamo.libro.autor : 'N/A'}</td>
                    <td>${fechaPrestamo}</td>
                    <td>${fechaDevolucion}</td>
                    <td><span class="badge ${estado === 'Activo' ? 'bg-primary' : 'bg-success'}">${estado}</span></td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Error:", err);
        document.getElementById("tablaPrestamos").innerHTML = "<tr><td colspan='5' class='text-center text-danger'>Error al cargar los datos</td></tr>";
    }
}

window.onload = cargarMisPrestamos;
