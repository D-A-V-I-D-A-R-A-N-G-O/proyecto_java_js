# 🔧 GUÍA DE INSTALACIÓN Y SOLUCIÓN DE ERRORES

## ❌ PROBLEMA: Error 500 en Login

Si el login falla con error 500, sigue estos pasos:

---

## ✅ SOLUCIÓN PASO A PASO

### 1️⃣ CREAR BASE DE DATOS

**Opción A: Usar MySQL Workbench o phpMyAdmin**
```sql
-- Ejecutar el script biblioteca.sql completo
```

**Opción B: Desde línea de comandos**
```bash
mysql -u root -p < biblioteca.sql
```

**Opción C: MySQL CLI Directo**
```bash
mysql -u root
```

Luego copiar y pegar todo el contenido de `biblioteca.sql`

---

### 2️⃣ VERIFICAR BASE DE DATOS CREADA

```bash
mysql -u root -e "SHOW DATABASES;"
```

Deberías ver `biblioteca` en la lista.

---

### 3️⃣ VERIFICAR TABLAS Y DATOS

```bash
mysql -u root biblioteca -e "SELECT * FROM usuario;"
```

Deberías ver los 3 usuarios de prueba:
- admin / admin123
- juan / pass123
- maria / pass456

---

### 4️⃣ COMPILAR BACKEND

```bash
cd proyecto_java_js/biblioteca
./mvnw clean install -DskipTests
```

Si falla, revisa que tienes Java 17+:
```bash
java -version
```

---

### 5️⃣ EJECUTAR BACKEND

```bash
./mvnw spring-boot:run
```

Espera a ver el mensaje:
```
Tomcat started on port(s): 8080
```

---

### 6️⃣ PROBAR API HEALTH CHECK

En otra terminal:
```bash
curl http://localhost:8080/api/auth/health
```

Deberías obtener:
```json
{
  "status": "OK",
  "servicio": "API Biblioteca - Funcionando correctamente"
}
```

---

### 7️⃣ PROBAR LOGIN

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nombre":"admin","contrasena":"admin123"}'
```

Deberías obtener el usuario completo en JSON.

---

### 8️⃣ SERVIR FRONTEND

```bash
cd frontend
python -m http.server 8000
```

---

### 9️⃣ ACCEDER

```
http://localhost:8000/ingreso/index.html
```

Login: `admin` / `admin123`

---

## 🔍 TROUBLESHOOTING

### Error: "Connection refused"
```
✅ SOLUCIÓN: 
  • Verificar que MySQL está corriendo
  • Verificar puerto 3306 está abierto
  • Verificar usuario 'root' sin contraseña (o actualizar application.properties)
```

### Error: "Unknown database 'biblioteca'"
```
✅ SOLUCIÓN:
  • Ejecutar: mysql -u root < biblioteca.sql
  • Verificar con: mysql -u root -e "SHOW DATABASES;"
```

### Error: "No rows affected" en select usuario
```
✅ SOLUCIÓN:
  • Ejecutar: mysql -u root biblioteca -e "SELECT * FROM usuario;"
  • Si está vacía, correr el INSERT del script
```

### Error: "Credenciales incorrectas" (pero están bien)
```
✅ SOLUCIÓN:
  • Base de datos vacía
  • Revisar logs en consola de Spring Boot
  • Ejecutar: mysql -u root biblioteca -e "SELECT nombre FROM usuario;"
```

### Error: "java.lang.ClassNotFoundException: com.mysql.cj.jdbc.Driver"
```
✅ SOLUCIÓN:
  • Ejecutar: ./mvnw clean install
  • Limpiar caché: rm -rf ~/.m2/repository/com/mysql
```

---

## 📋 CHECKLIST

- [ ] MySQL corriendo
- [ ] Base de datos `biblioteca` creada
- [ ] Tablas creadas (usuario, libro, prestamo, resena)
- [ ] Usuarios de prueba insertados
- [ ] Backend compilado sin errores
- [ ] Backend corriendo en puerto 8080
- [ ] API /health responde OK
- [ ] Login funciona
- [ ] Frontend servido en puerto 8000
- [ ] Login accesible en navegador

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### 1. "Port 8080 already in use"
```bash
# Cambiar puerto en application.properties
server.port=8081
```

### 2. "Can't connect to MySQL server"
```bash
# Asegurar MySQL está corriendo
# En Windows: Services → MySQL80 (o tu versión)
# En Mac: brew services start mysql
# En Linux: sudo systemctl start mysql
```

### 3. "Access denied for user 'root'@'localhost'"
```bash
# Actualizar application.properties con contraseña correcta
spring.datasource.password=tu_contraseña
```

### 4. "The column name `...` is not valid"
```bash
# Significa que las tablas no existen
# Ejecutar el script SQL: biblioteca.sql
```

---

## 📝 CONTENIDO DE biblioteca.sql

El archivo `biblioteca.sql` incluye:
✅ Crear base de datos
✅ Crear tabla usuario (con 3 usuarios de prueba)
✅ Crear tabla libro (con 6 libros)
✅ Crear tabla prestamo
✅ Crear tabla resena
✅ Configurar relaciones y constraints

---

## 🎯 FLUJO CORRECTO

```
1. MySQL corriendo
   ↓
2. Ejecutar biblioteca.sql
   ↓
3. Compilar backend
   ↓
4. Ejecutar backend (puerto 8080)
   ↓
5. Servir frontend (puerto 8000)
   ↓
6. Abrir http://localhost:8000/ingreso/index.html
   ↓
7. Login con: admin / admin123
   ↓
8. ¡Funcionando! 🎉
```

---

## 💡 TIPS ÚTILES

**Ver logs en tiempo real:**
```bash
# Ejecutar backend con más logs
./mvnw spring-boot:run -D"logging.level.root=DEBUG"
```

**Verificar qué está corriendo:**
```bash
# Verificar puerto 8080
lsof -i :8080

# Verificar puerto 8000
lsof -i :8000
```

**Limpiar y reconstruir:**
```bash
./mvnw clean install
rm -rf target/
./mvnw spring-boot:run
```

**Recrear base de datos:**
```bash
mysql -u root -e "DROP DATABASE biblioteca; CREATE DATABASE biblioteca;"
mysql -u root biblioteca < /ruta/a/biblioteca.sql
```

---

## ✨ CUANDO TODO FUNCIONA

Deberías ver:
1. ✅ Backend en http://localhost:8080 (verde en consola)
2. ✅ API responde en http://localhost:8080/api/auth/health
3. ✅ Frontend carga en http://localhost:8000
4. ✅ Login funciona y redirige al dashboard
5. ✅ Sin errores 500 en consola

**¡Si todo está verde, ¡tu proyecto está funcionando perfectamente! 🎉**