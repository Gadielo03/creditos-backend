-- Creación de la tabla Roles
CREATE TABLE Roles (
    rol_id SERIAL PRIMARY KEY,
    rol_nombre VARCHAR(100) NOT NULL UNIQUE CHECK (rol_nombre IN ('ADMINISTRADOR', 'PROFESOR', 'ALUMNO'))
);

-- Insertar los roles predefinidos
INSERT INTO Roles (rol_nombre) VALUES
    ('ADMINISTRADOR'),
    ('PROFESOR'),
    ('ALUMNO');

-- Creación de la tabla Alumno
CREATE TABLE Alumno (
    alu_id SERIAL PRIMARY KEY,
    alu_nctrl VARCHAR(50) UNIQUE NOT NULL,
    alu_nombres VARCHAR(100) NOT NULL,
    alu_apellidos VARCHAR(100) NOT NULL
);

-- Creación de la tabla Docente
CREATE TABLE Docente (
    doc_id SERIAL PRIMARY KEY,
    doc_nombre VARCHAR(100) NOT NULL,
    doc_apellidos VARCHAR(100) NOT NULL
);

-- Creación de la tabla Usuarios
CREATE TABLE Usuarios (
    usuario_id SERIAL PRIMARY KEY,
    usuario_nombre VARCHAR(100) UNIQUE NOT NULL,
    usuario_contraseña VARCHAR(255) NOT NULL
);

-- Insertar usuario administrador por defecto
INSERT INTO Usuarios (usuario_nombre, usuario_contraseña) VALUES
    ('admin', '$2b$10$XCO9ukbm/Wv9uhUrVOkg6.l..1yeBVwhYtau4mMZ.vqod9eXyI5Vy');

-- Creación de la tabla Roles_usuarios
CREATE TABLE Roles_usuarios (
    rol_id INTEGER NOT NULL,
    usuario_id INTEGER NOT NULL,
    PRIMARY KEY (rol_id, usuario_id),
    FOREIGN KEY (rol_id) REFERENCES Roles(rol_id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES Usuarios(usuario_id) ON DELETE CASCADE
);

-- Asignar rol de administrador al usuario por defecto
INSERT INTO Roles_usuarios (rol_id, usuario_id)
SELECT r.rol_id, u.usuario_id
FROM Roles r, Usuarios u
WHERE r.rol_nombre = 'ADMINISTRADOR' AND u.usuario_nombre = 'admin';

-- Creación de la tabla Periodo
CREATE TABLE Periodo (
    per_id SERIAL PRIMARY KEY,
    per_inicio DATE NOT NULL,
    per_fin DATE NOT NULL,
    per_nombre VARCHAR(100) UNIQUE NOT NULL
);

-- Creación de la tabla Actividades
CREATE TABLE Actividades (
    act_id SERIAL PRIMARY KEY,
    act_nombre VARCHAR(100) NOT NULL,
    act_semestre VARCHAR(50),
    act_creditos DOUBLE PRECISION NOT NULL,
    act_hor_ini TIME,
    act_hor_fin TIME,
    per_id INTEGER NOT NULL,
    doc_responsable INTEGER NOT NULL,
    FOREIGN KEY (per_id) REFERENCES Periodo(per_id) ON DELETE RESTRICT,
    FOREIGN KEY (doc_responsable) REFERENCES Docente(doc_id) ON DELETE RESTRICT
);

-- Creación de la tabla Creditos
CREATE TABLE Creditos (
    alu_id INTEGER NOT NULL,
    act_id INTEGER NOT NULL,
    cred_fecha DATE NOT NULL,
    PRIMARY KEY (alu_id, act_id),
    FOREIGN KEY (alu_id) REFERENCES Alumno(alu_id) ON DELETE CASCADE,
    FOREIGN KEY (act_id) REFERENCES Actividades(act_id) ON DELETE RESTRICT
);

-- Creación de la tabla Instrucciones
CREATE TABLE Instrucciones (
    inst_id SERIAL PRIMARY KEY,
    doc_id INTEGER NOT NULL,
    act_id INTEGER NOT NULL,
    alu_id INTEGER NOT NULL,
    FOREIGN KEY (doc_id) REFERENCES Docente(doc_id) ON DELETE RESTRICT,
    FOREIGN KEY (act_id) REFERENCES Actividades(act_id) ON DELETE RESTRICT,
    FOREIGN KEY (alu_id) REFERENCES Alumno(alu_id) ON DELETE RESTRICT
);