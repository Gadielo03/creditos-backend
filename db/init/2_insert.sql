INSERT INTO Roles (rol_nombre) VALUES
    ('ADMINISTRADOR'),
    ('DOCENTE'),
    ('ALUMNO');

-- Insertar usuarios por defecto
INSERT INTO Usuarios (usuario_nombre, usuario_contraseña) VALUES
    ('admin', '$2b$10$XCO9ukbm/Wv9uhUrVOkg6.l..1yeBVwhYtau4mMZ.vqod9eXyI5Vy'),
    ('alumno1', '$2b$10$AP03WrKXfiSW.VtOMc2CAuvObAfcgN0faYz6dHS2g0oBTRRFKtm2.'),
    ('docente1', '$2b$10$OLgk8epshA62Ab0Ir/ohs.Mu8MZLOTR6Gja9lGQidoabUj1Czjpkq');

-- Insertar alumno de ejemplo
INSERT INTO Alumno (alu_nctrl, alu_nombres, alu_apellidos) VALUES
    ('19130001', 'Juan', 'Pérez García');

-- Insertar docente de ejemplo
INSERT INTO Docente (doc_nombre, doc_apellidos) VALUES
    ('María', 'González López');


-- Asignar roles a los usuarios por defecto
INSERT INTO Roles_usuarios (rol_id, usuario_id)
SELECT r.rol_id, u.usuario_id
FROM Roles r, Usuarios u
WHERE (r.rol_nombre = 'ADMINISTRADOR' AND u.usuario_nombre = 'admin')
   OR (r.rol_nombre = 'ALUMNO' AND u.usuario_nombre = 'alumno1')
    OR (r.rol_nombre = 'DOCENTE' AND u.usuario_nombre = 'docente1');
