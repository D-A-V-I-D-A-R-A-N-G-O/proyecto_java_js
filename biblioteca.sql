-- ============================================
-- SCRIPT DE CREACIÓN DE BASE DE DATOS BIBLIOTECA
-- ============================================

-- Crear base de datos
CREATE DATABASE IF NOT EXISTS biblioteca CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE biblioteca;

-- Crear tabla usuario
CREATE TABLE IF NOT EXISTS usuario (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR(100) NOT NULL,
    celular VARCHAR(20) NOT NULL,
    rol VARCHAR(50) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear tabla libro
CREATE TABLE IF NOT EXISTS libro (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(100) NOT NULL,
    sinopsis TEXT,
    estado BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear tabla prestamo
CREATE TABLE IF NOT EXISTS prestamo (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_libro BIGINT NOT NULL,
    id_usuario BIGINT NOT NULL,
    fecha_prestamo TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_devolucion TIMESTAMP NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_libro) REFERENCES libro(id) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear tabla resena
CREATE TABLE IF NOT EXISTS resena (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    id_usuario BIGINT NOT NULL,
    id_libro BIGINT NOT NULL,
    puntuacion INT NOT NULL CHECK (puntuacion >= 1 AND puntuacion <= 5),
    comentario TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NULL,
    FOREIGN KEY (id_usuario) REFERENCES usuario(id) ON DELETE CASCADE,
    FOREIGN KEY (id_libro) REFERENCES libro(id) ON DELETE CASCADE,
    UNIQUE KEY unique_resena (id_usuario, id_libro)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ============================================
-- INSERTAR USUARIOS DE PRUEBA
-- ============================================

INSERT INTO usuario (nombre, email, contrasena, celular, rol) VALUES
('admin', 'admin@biblioteca.com', 'admin123', '3001234567', 'admin'),
('juan', 'juan@biblioteca.com', 'pass123', '3007654321', 'usuario'),
('maria', 'maria@biblioteca.com', 'pass456', '3009876543', 'usuario');

-- ============================================
-- INSERTAR LIBROS DE PRUEBA
-- ============================================

INSERT INTO libro (titulo, autor, sinopsis, estado) VALUES
('El Quijote', 'Miguel de Cervantes', 'La novela más famosa de la literatura española.', true),
('Cien años de soledad', 'Gabriel García Márquez', 'Obra maestra del realismo mágico latinoamericano.', true),
('1984', 'George Orwell', 'Novela distópica sobre un futuro totalitario.', true),
('El Principito', 'Antoine de Saint-Exupéry', 'Cuento poético sobre un pequeño príncipe.', true),
('Don Juan Tenorio', 'José Zorrilla', 'Drama romántico español clásico.', false),
('Orgullo y Prejuicio', 'Jane Austen', 'Novela romántica de la época georgiana.', true);

-- ============================================
-- Verificar datos
-- ============================================

SELECT 'USUARIOS CREADOS:' as info;
SELECT id, nombre, email, rol FROM usuario;

SELECT 'LIBROS CREADOS:' as info;
SELECT id, titulo, autor, estado FROM libro;

SELECT 'BASE DE DATOS LISTA PARA USAR' as info;