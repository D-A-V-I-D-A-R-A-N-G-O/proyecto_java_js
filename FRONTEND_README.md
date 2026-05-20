# Frontend - Sistema de Biblioteca

## Estructura del Proyecto

```
frontend/
├── ingreso/
│   ├── ingreso.html       (Login page - FIXED)
│   ├── ingreso.js         (Login logic - FIXED)
│   └── app.js             (Session check)
│
├── administrador/         (Admin section - COMPLETED)
│   ├── html/
│   │   ├── index.html     (Dashboard - FIXED)
│   │   ├── libros.html    (Book management - FIXED)
│   │   ├── usuarios.html  (User management - FIXED)
│   │   └── prestamos.html (Loan management - COMPLETED)
│   │
│   ├── js/
│   │   ├── index.js       (Admin dashboard - FIXED)
│   │   ├── verificacion.js (Auth check - FIXED)
│   │   ├── admin_libros.js (Books API)
│   │   ├── admin_usuarios.js (Users API)
│   │   └── admin_prestamos.js (Loans API - NEW)
│   │
│   └── css/
│       ├── index.css
│       ├── admin_libros.css
│       └── ingreso.css (NEW - Login styles)
│
└── usuario/               (User section - TEMPLATES PROVIDED)
    ├── html/
    │   ├── index.html      (Dashboard)
    │   ├── libros.html     (Available books)
    │   └── mis-prestamos.html (My loans)
    │
    └── js/
        ├── user-verificacion.js (Auth check)
        ├── user-libros.js       (Books listing)
        └── user-prestamos.js    (Loans listing)
```

## Setup Instructions

### 1. Create User Section Directories

```bash
# Create the user directory structure
mkdir -p frontend/usuario/html
mkdir -p frontend/usuario/js
```

### 2. Copy User Section Files

Template files for the user section are located in `frontend/administrador/` with `user-` prefix:

**HTML Files (copy to usuario/html/):**
- `administrador/html/user-index.html` → `usuario/html/index.html`
- `administrador/html/user-libros.html` → `usuario/html/libros.html`
- `administrador/html/user-mis-prestamos.html` → `usuario/html/mis-prestamos.html`

**JavaScript Files (copy to usuario/js/):**
- `administrador/js/user-verificacion.js` → `usuario/js/user-verificacion.js`
- `administrador/js/user-libros.js` → `usuario/js/user-libros.js`
- `administrador/js/user-prestamos.js` → `usuario/js/user-prestamos.js`

### 3. Create Login CSS Directory

```bash
mkdir -p frontend/ingreso/css
```

Copy `frontend/administrador/css/ingreso.css` to `frontend/ingreso/css/ingreso.css`

## Changes Made

### Login Page (Fixed)
✅ Added error message display element
✅ Added form validation
✅ Improved styling with gradient background
✅ Added Bootstrap integration
✅ Added proper error handling

### Admin Pages (Fixed & Completed)
✅ Fixed element ID references (bienvenido → nombre)
✅ Added logout functionality to all pages
✅ Added logout button to navbar
✅ Completed Loans (Préstamos) management page
✅ Added admin_prestamos.js with full CRUD operations
✅ Added user name display to navbar

### User Section (Created)
✅ User dashboard (index.html)
✅ Available books browsing (libros.html)
✅ My loans viewing (mis-prestamos.html)
✅ User verification and authentication
✅ Loan request functionality

## Features

### Login
- User authentication via REST API (POST /auth/login)
- Role-based routing (ADMIN → admin dashboard, USER → user dashboard)
- Input validation
- Error messaging

### Admin Dashboard
- **Books Management**: Create, read, update, delete books
- **User Management**: Manage system users and roles
- **Loan Management**: View and process loan returns
- **Logout**: Secure logout with localStorage cleanup

### User Dashboard
- **Browse Books**: View available books for borrowing
- **Request Loans**: Request new loans for available books
- **View Loans**: See all active loans with details
- **Logout**: Secure session termination

## API Endpoints Used

- `POST /auth/login` - User authentication
- `GET/POST/PUT/DELETE /libros` - Book management
- `GET/POST/PUT/DELETE /usuarios` - User management
- `GET/POST/PUT /prestamos` - Loan management

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Notes

- All files use Bootstrap 5.3.8 for responsive design
- localStorage is used for session management
- All API calls are made to http://localhost:8080
- Role-based access control implemented in verification scripts
- Automatic redirect to login for unauthorized access
