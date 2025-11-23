INSERT INTO Roles (rol_nombre) VALUES
    ('ADMINISTRADOR'),
    ('DOCENTE'),
    ('ALUMNO');

-- Insertar usuarios por defecto
INSERT INTO Usuarios (usuario_nombre, usuario_contraseña) VALUES
    ('admin', '$2b$10$XCO9ukbm/Wv9uhUrVOkg6.l..1yeBVwhYtau4mMZ.vqod9eXyI5Vy'),
    ('alumno1', '$2b$10$AP03WrKXfiSW.VtOMc2CAuvObAfcgN0faYz6dHS2g0oBTRRFKtm2.'),
    ('alumno2', '$2b$10$AP03WrKXfiSW.VtOMc2CAuvObAfcgN0faYz6dHS2g0oBTRRFKtm2.'),
    ('alumno3', '$2b$10$AP03WrKXfiSW.VtOMc2CAuvObAfcgN0faYz6dHS2g0oBTRRFKtm2.'),
    ('alumno4', '$2b$10$AP03WrKXfiSW.VtOMc2CAuvObAfcgN0faYz6dHS2g0oBTRRFKtm2.'),
    ('docente1', '$2b$10$OLgk8epshA62Ab0Ir/ohs.Mu8MZLOTR6Gja9lGQidoabUj1Czjpkq'),
    ('docente2', '$2b$10$OLgk8epshA62Ab0Ir/ohs.Mu8MZLOTR6Gja9lGQidoabUj1Czjpkq'),
    ('docente3', '$2b$10$OLgk8epshA62Ab0Ir/ohs.Mu8MZLOTR6Gja9lGQidoabUj1Czjpkq');

-- Insertar alumnos de ejemplo
INSERT INTO Alumno (alu_nctrl, alu_nombres, alu_apellidos) VALUES
    ('19130001', 'Juan', 'Pérez García'),
    ('19130002', 'Ana María', 'López Rodríguez'),
    ('20130045', 'Carlos Alberto', 'Martínez Sánchez'),
    ('20130078', 'Laura Patricia', 'Hernández Torres'),
    ('21130033', 'Diego Fernando', 'Ramírez Flores');

-- Insertar docentes de ejemplo
INSERT INTO Docente (doc_nombre, doc_apellidos) VALUES
    ('María', 'González López'),
    ('Roberto', 'Jiménez Morales'),
    ('Patricia', 'Castillo Reyes'),
    ('Fernando', 'Mendoza Silva');

-- Insertar periodos académicos
INSERT INTO Periodo (per_inicio, per_fin, per_nombre) VALUES
    ('2024-01-15', '2024-05-31', 'Enero-Mayo 2024'),
    ('2024-08-01', '2024-12-15', 'Agosto-Diciembre 2024'),
    ('2025-01-15', '2025-05-31', 'Enero-Mayo 2025'),
    ('2025-08-01', '2025-12-15', 'Agosto-Diciembre 2025'),
    ('2026-01-15', '2026-05-31', 'Enero-Mayo 2026');

-- Asignar roles a los usuarios por defecto
INSERT INTO Roles_usuarios (rol_id, usuario_id)
SELECT r.rol_id, u.usuario_id
FROM Roles r, Usuarios u
WHERE (r.rol_nombre = 'ADMINISTRADOR' AND u.usuario_nombre = 'admin')
   OR (r.rol_nombre = 'ALUMNO' AND u.usuario_nombre = 'alumno1')
   OR (r.rol_nombre = 'ALUMNO' AND u.usuario_nombre = 'alumno2')
   OR (r.rol_nombre = 'ALUMNO' AND u.usuario_nombre = 'alumno3')
   OR (r.rol_nombre = 'ALUMNO' AND u.usuario_nombre = 'alumno4')
   OR (r.rol_nombre = 'DOCENTE' AND u.usuario_nombre = 'docente1')
   OR (r.rol_nombre = 'DOCENTE' AND u.usuario_nombre = 'docente2')
   OR (r.rol_nombre = 'DOCENTE' AND u.usuario_nombre = 'docente3');

-- Insertar actividades de ejemplo
INSERT INTO Actividades (act_nombre, act_creditos, act_hor_ini, act_hor_fin, per_id, doc_responsable) VALUES
    ('Taller de Liderazgo', 2.0, '14:00:00', '16:00:00', 1, 1),
    ('Club de Programación Competitiva', 3.0, '16:00:00', '18:00:00', 1, 2),
    ('Voluntariado Social', 2.5, '10:00:00', '12:00:00', 1, 3),
    ('Taller de Emprendimiento', 2.0, '15:00:00', '17:00:00', 2, 1),
    ('Grupo de Investigación en IA', 4.0, '13:00:00', '17:00:00', 2, 4),
    ('Comité de Eventos Estudiantiles', 2.0, NULL, NULL, 2, 2),
    ('Taller de Robótica', 3.5, '14:00:00', '17:00:00', 3, 3),
    ('Club de Debate', 2.0, '17:00:00', '19:00:00', 3, 1),
    ('Proyecto de Sustentabilidad', 3.0, '09:00:00', '12:00:00', 3, 4);

-- Insertar créditos otorgados
INSERT INTO Creditos (alu_id, act_id, cred_fecha) VALUES
    (1, 1, '2024-05-15'),
    (1, 2, '2024-05-20'),
    (2, 1, '2024-05-15'),
    (2, 3, '2024-05-25'),
    (3, 2, '2024-12-10'),
    (3, 4, '2024-12-12'),
    (4, 3, '2024-05-18'),
    (4, 5, '2024-12-08'),
    (5, 4, '2024-12-10'),
    (5, 6, '2024-12-14');
