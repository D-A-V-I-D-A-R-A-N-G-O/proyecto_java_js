# 📚 Biblioteca - Sistema de Gestión de Préstamos

**Proyecto Full-Stack: Java Spring Boot + Bootstrap Frontend**

---

## 🎯 Descripción General

Sistema completo de gestión de biblioteca con dos perfiles de usuario:
- **Usuarios**: Pueden ver libros, solicitar préstamos y dejar reseñas
- **Administradores**: Gestión completa del sistema (usuarios, libros, préstamos, reseñas)

---

## 🏗️ Arquitectura

### Backend (Spring Boot)
```
biblioteca/
├── src/main/java/com/proyecto/biblioteca/
│   ├── models/        → Entidades JPA (Usuario, Libro, Prestamo, Resena)
│   ├── controllers/   → REST Controllers
│   ├── services/      → Lógica de negocio
│   ├── repositories/  → Data Access Layer
│   └── config/        → Configuración CORS
└── pom.xml
```

### Frontend (Bootstrap + Vanilla JS)
```
frontend/
├── ingreso/           → Página de login
│   ├── index.html
│   ├── js/auth.js
│   └── css/auth.css
├── usuario/           → Dashboard usuario
│   ├── dashboard.html
│   ├── js/usuario-dashboard.js
│   └── css/dashboard.css
└── admin/             → Panel administrativo
    ├── dashboard.html
    ├── js/admin-dashboard.js
    └── css/admin-dashboard.css
```

---

## 🚀 Instrucciones de Instalación y Ejecución

### Requisitos Previos
- **Java 17+** instalado
- **MySQL 8.0+** instalado y corriendo
- **Node.js** (opcional, solo si usas un servidor local)

### 1️⃣ Configurar Base de Datos

Crear base de datos:
```sql
CREATE DATABASE biblioteca;
USE biblioteca;
```

Crear tablas (Spring Boot las crea automáticamente con JPA):
```sql
-- Spring Boot creará estas tablas automáticamente
-- Solo asegúrate de que la BD existe
```

### 2️⃣ Configurar Backend

**a) Editar archivo de configuración:**
```bash
cd biblioteca
nano src/main/resources/application.properties
```

**b) Agregar o modificar:**
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/biblioteca
spring.datasource.username=root
spring.datasource.password=tu_contraseña
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=false
server.port=8080

# Logging
logging.level.root=INFO
```

### 3️⃣ Compilar y Ejecutar Backend

```bash
# Desde la carpeta biblioteca/
./mvnw clean install
./mvnw spring-boot:run
```

El backend estará disponible en: `http://localhost:8080`

### 4️⃣ Servir Frontend

**Opción A: Usando Live Server (recomendado)**
```bash
# Instalar extensión Live Server en VS Code
# Click derecho en frontend/ → Open with Live Server
```

**Opción B: Python simple server**
```bash
cd frontend
python -m http.server 8000
```

Acceder a: `http://localhost:8000/ingreso/index.html`

---

## 👤 Usuarios de Prueba

### Crear usuarios de prueba

**Opción 1: Vía SQL (rápido)**
```sql
-- Usuario Admin
INSERT INTO usuario (nombre, email, contrasena, celular, rol, fecha_creacion)
VALUES ('admin', 'admin@biblioteca.com', 'admin123', '3001234567', 'admin', NOW());

-- Usuario Regular
INSERT INTO usuario (nombre, email, contrasena, celular, rol, fecha_creacion)
VALUES ('juan', 'juan@biblioteca.com', 'pass123', '3007654321', 'usuario', NOW());
```

**Opción 2: Vía API**
```bash
# Admin
POST http://localhost:8080/api/usuarios
{
  "nombre": "admin",
  "email": "admin@biblioteca.com",
  "contrasena": "admin123",
  "celular": "3001234567",
  "rol": "admin"
}

# Usuario Regular
POST http://localhost:8080/api/usuarios
{
  "nombre": "juan",
  "email": "juan@biblioteca.com",
  "contrasena": "pass123",
  "celular": "3007654321",
  "rol": "usuario"
}
```

### Login
- **Usuario**: `admin` | Contraseña: `admin123` → Accede a Panel Admin
- **Usuario**: `juan` | Contraseña: `pass123` → Accede a Dashboard Usuario

---

## 📖 Funcionalidades

### Para Usuarios
- ✅ Ver catálogo de libros
- ✅ Buscar libros por título o autor
- ✅ Solicitar préstamos
- ✅ Ver mis préstamos (activos e histórico)
- ✅ Dejar reseñas en libros
- ✅ Ver mis reseñas
- ✅ Dashboard con estadísticas

### Para Administradores
- ✅ Gestión completa de usuarios (CRUD)
- ✅ Gestión completa de libros (CRUD)
- ✅ Visualización de todos los préstamos
- ✅ Visualización de todas las reseñas
- ✅ Dashboard con estadísticas globales
- ✅ Eliminar reseñas

---

## 🔌 API Endpoints

### Autenticación
```
POST   /api/auth/login        → Login de usuario
POST   /api/auth/logout       → Logout
```

### Usuarios
```
GET    /api/usuarios          → Listar todos
POST   /api/usuarios          → Crear usuario
GET    /api/usuarios/{id}     → Obtener por ID
PUT    /api/usuarios/{id}     → Actualizar usuario
DELETE /api/usuarios/{id}     → Eliminar usuario
GET    /api/usuarios/email/{email}  → Buscar por email
```

### Libros
```
GET    /api/libros            → Listar todos
POST   /api/libros            → Crear libro
GET    /api/libros/{id}       → Obtener por ID
PUT    /api/libros/{id}       → Actualizar libro
DELETE /api/libros/{id}       → Eliminar libro
GET    /api/libros/buscar?titulo=...  → Buscar por título
```

### Préstamos
```
GET    /api/prestamos         → Listar todos
POST   /api/prestamos         → Crear préstamo
GET    /api/prestamos/usuario/{id}  → Préstamos de usuario
GET    /api/prestamos/libro/{id}    → Préstamos de libro
GET    /api/prestamos/activos       → Préstamos sin devolución
```

### Reseñas
```
GET    /api/resenas           → Listar todas
POST   /api/resenas           → Crear reseña
GET    /api/resenas/{id}      → Obtener por ID
PUT    /api/resenas/{id}      → Actualizar reseña
DELETE /api/resenas/{id}      → Eliminar reseña
GET    /api/resenas/libro/{id}      → Reseñas de libro
GET    /api/resenas/usuario/{id}    → Reseñas de usuario
```

---

## 🛠️ Troubleshooting

### Error: "No puedo conectar al backend"
1. Verificar que el backend está corriendo en `http://localhost:8080`
2. Verificar CORS en `CorsConfig.java`
3. Verificar que la BD está accesible

### Error: "Usuario no encontrado"
1. Crear usuarios de prueba (ver sección arriba)
2. Verificar credenciales exactamente (mayúsculas/minúsculas)

### Error: "Puerto 8080 ya está en uso"
```bash
# Cambiar puerto en application.properties
server.port=8081
```

### Base de datos no se crea automáticamente
1. Crear manualmente: `CREATE DATABASE biblioteca;`
2. Spring Boot creará las tablas automáticamente

---

## 📱 Responsividad

Ambos interfaces están optimizados para:
- ✅ Desktop (1920px+)
- ✅ Laptop (1024px - 1920px)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (320px - 768px)

---

## 🔒 Seguridad

- ✅ CORS configurado correctamente
- ✅ Validaciones en cliente y servidor
- ✅ Contraseñas sin encriptar (solo desarrollo - agregar BCrypt en producción)
- ✅ JWT no implementado (agregar para producción)

---

## 📦 Dependencias Backend

```xml
<!-- pom.xml -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-web</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.mysql</groupId>
    <artifactId>mysql-connector-j</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <optional>true</optional>
</dependency>
```

---

## 🎨 Tecnologías Usadas

### Backend
- Java 17
- Spring Boot 3.5.14
- Spring Data JPA
- MySQL
- Lombok

### Frontend
- Bootstrap 5.3
- Bootstrap Icons
- Vanilla JavaScript (ES6+)
- HTML5
- CSS3

---

## 📝 Estructura de Carpetas Final

```
proyecto_java_js/
├── biblioteca/                 (Backend)
│   ├── src/
│   │   ├── main/java/...
│   │   └── test/
│   ├── pom.xml
│   ├── mvnw
│   └── target/
│
└── frontend/                   (Frontend)
    ├── ingreso/               (Login)
    │   ├── index.html
    │   ├── js/auth.js
    │   └── css/auth.css
    ├── usuario/               (Dashboard Usuario)
    │   ├── dashboard.html
    │   ├── js/usuario-dashboard.js
    │   └── css/dashboard.css
    └── admin/                 (Panel Admin)
        ├── dashboard.html
        ├── js/admin-dashboard.js
        └── css/admin-dashboard.css
```

---

## ✅ Checklist - Proyecto Completado

- ✅ Backend Spring Boot funcional
- ✅ Frontend usuario completo
- ✅ Frontend admin completo
- ✅ Bootstrap implementado
- ✅ Responsive en todos los dispositivos
- ✅ CRUD completo
- ✅ Autenticación funcional
- ✅ Búsqueda de libros
- ✅ Gestión de préstamos
- ✅ Sistema de reseñas
- ✅ Dashboard con estadísticas
- ✅ Validaciones en servidor
- ✅ Manejo de errores

---

## 📧 Soporte

Si encuentras problemas:
1. Verifica que el backend está corriendo
2. Verifica credenciales de BD
3. Verifica que los puertos (8080, 8000) están libres
4. Revisa la consola del navegador (F12) para errores

---

**¡Proyecto completado y listo para usar! 🎉**