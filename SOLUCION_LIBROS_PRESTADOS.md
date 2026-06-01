╔════════════════════════════════════════════════════════════════════════════╗
║                                                                            ║
║        ✅ SOLUCIONADO: Libros prestados no pueden volver a prestarse       ║
║                                                                            ║
╚════════════════════════════════════════════════════════════════════════════╝

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 CAMBIOS REALIZADOS:

1️⃣ PrestamoService.java (BACKEND)
   ✅ Agregada validación: antes de prestar, verifica si el libro ya tiene 
      un préstamo activo (sin devolución)
   ✅ Si intenta prestar un libro ya prestado, lanza excepción
   ✅ Al crear préstamo: marca automáticamente el libro como ocupado (estado=false)
   ✅ Al devolver préstamo: marca automáticamente el libro como disponible (estado=true)
   ✅ Nuevo método: marcarComoDevuelto() para gestionar devoluciones

2️⃣ PrestamoRepository.java (BACKEND)
   ✅ Nueva query: findByLibroIdAndFechaDevolucionIsNull()
   ✅ Busca préstamos activos (sin devolución) de un libro específico

3️⃣ PrestamoController.java (BACKEND)
   ✅ Manejo de errores con try-catch
   ✅ Devuelve mensaje de error claro si el libro ya está prestado
   ✅ Nuevo endpoint: PUT /api/prestamos/{id}/devolver
   ✅ Permite devolver préstamos y liberar el libro

4️⃣ usuario-dashboard.js (FRONTEND)
   ✅ Mejora en confirmarPrestamo(): ahora captura y muestra el mensaje de error
      del backend cuando intenta prestar un libro ya prestado

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔄 FLUJO AHORA:

1. Usuario intenta prestar un libro
   ↓
2. Backend valida: ¿Este libro ya tiene préstamo activo?
   ↓
   SI → Rechaza con mensaje: "El libro ya está prestado"
   NO → Continúa
   ↓
3. Crea el préstamo
   ↓
4. Marca el libro como ocupado (estado = false)
   ↓
5. Frontend recibe OK y recarga los datos
   ↓
6. El botón de préstamo del libro queda DESHABILITADO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 LÓGICA DE ESTADO:

Libro.estado:
  true  → Disponible para prestar (botón HABILITADO)
  false → Ocupado/Prestado (botón DESHABILITADO)

Se actualiza automáticamente:
  • Al crear préstamo: estado = false
  • Al devolver préstamo: estado = true

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✨ MEJORAS:

1. Integridad de datos
   • Un libro solo puede estar prestado a una persona a la vez
   • Imposible prestar un libro que ya está prestado

2. UX mejorada
   • Botón de préstamo deshabilitado automáticamente
   • Mensaje de error claro si intenta prestar un libro ocupado

3. Gestión de devoluciones
   • Nuevo endpoint para devolver préstamos
   • Libera automáticamente el libro cuando se devuelve

4. Validación en servidor
   • La lógica está en el backend, no solo en el frontend
   • Más seguro y robusto

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🧪 CÓMO FUNCIONA AHORA:

Escenario 1: Prestar un libro disponible
─────────────────────────────────────────
Usuario: Hace click en "Solicitar Préstamo" (botón HABILITADO)
Backend: Valida, crea préstamo, marca libro como ocupado
Frontend: Muestra éxito, recarga datos, botón se DESHABILITA
Resultado: ✅ Éxito

Escenario 2: Prestar un libro ya prestado
──────────────────────────────────────────
Usuario: Botón de préstamo está DESHABILITADO (no puede hacer click)
Resultado: ✅ Imposible prestar

Escenario 3: Intenta prestar por API (intentando bypassear frontend)
────────────────────────────────────────────────────────────────────
Backend: Valida y rechaza con error: "El libro ya está prestado"
Frontend: Captura el error y muestra alerta
Resultado: ✅ Rechazado correctamente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📋 NUEVO ENDPOINT PARA DEVOLVER PRÉSTAMOS:

PUT /api/prestamos/{id}/devolver

Ejemplo:
  curl -X PUT http://localhost:8080/api/prestamos/1/devolver

Respuesta:
  {"mensaje": "Préstamo marcado como devuelto"}

Qué hace:
  • Marca la fecha de devolución
  • Cambia el estado del libro a disponible (estado = true)
  • Libera el libro para ser prestado nuevamente

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ VERIFICACIÓN:

Para verificar que funciona:

1. Compilar backend:
   ./mvnw clean install

2. Ejecutar backend:
   ./mvnw spring-boot:run

3. En MySQL, verificar un libro:
   SELECT titulo, estado FROM libro WHERE id = 1;
   Estado = 1 (disponible)

4. Prestar el libro desde frontend
   Usuario intenta: "Solicitar Préstamo"

5. Verificar en MySQL nuevamente:
   SELECT titulo, estado FROM libro WHERE id = 1;
   Estado = 0 (ocupado) ✅

6. El botón de préstamo de ese libro queda DESHABILITADO ✅

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 RESULTADO FINAL:

✅ Libros prestados NO pueden volver a prestarse
✅ El estado se actualiza automáticamente
✅ Interfaz refleja el estado en tiempo real
✅ Validación en servidor (backend)
✅ Validación en cliente (frontend)
✅ Manejo de errores robusto
✅ Nueva funcionalidad de devoluciones

¡El sistema ahora tiene lógica de negocio correcta! 🎉