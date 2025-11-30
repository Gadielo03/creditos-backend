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

-- Insertar alumnos de ejemplo (50+ alumnos)
INSERT INTO Alumno (alu_nctrl, alu_nombres, alu_apellidos) VALUES
    -- Generación 2019
    ('19130001', 'Juan', 'Pérez García'),
    ('19130002', 'Ana María', 'López Rodríguez'),
    ('19130003', 'Roberto', 'Sánchez Martín'),
    ('19130004', 'Elena', 'Fernández Ruiz'),
    ('19130005', 'Francisco', 'Gómez Torres'),
    -- Generación 2020
    ('20130045', 'Carlos Alberto', 'Martínez Sánchez'),
    ('20130078', 'Laura Patricia', 'Hernández Torres'),
    ('20130011', 'José Luis', 'Ramírez González'),
    ('20130022', 'María Fernanda', 'Castro Jiménez'),
    ('20130033', 'Pedro', 'Ortiz Vega'),
    ('20130044', 'Carmen', 'Blanco Moreno'),
    ('20130055', 'Ricardo', 'Méndez Silva'),
    ('20130066', 'Beatriz', 'Romero Núñez'),
    ('20130077', 'Javier', 'Álvarez Reyes'),
    ('20130088', 'Lucía', 'Gil Herrera'),
    -- Generación 2021
    ('21130033', 'Diego Fernando', 'Ramírez Flores'),
    ('21130044', 'Sofía Elena', 'Moreno Vega'),
    ('21130010', 'Héctor', 'Pacheco Ríos'),
    ('21130020', 'Natalia', 'Cabrera Lara'),
    ('21130030', 'Emilio', 'Fuentes Medina'),
    ('21130040', 'Adriana', 'Campos Santos'),
    ('21130050', 'Martín', 'León Aguilar'),
    ('21130060', 'Paula', 'Durán Cortés'),
    ('21130070', 'Sergio', 'Peña Acosta'),
    ('21130080', 'Daniela', 'Vázquez Solís'),
    -- Generación 2022
    ('22130011', 'Miguel Ángel', 'Ruiz Castro'),
    ('22130022', 'Gabriela', 'Torres Mendoza'),
    ('22130033', 'Daniel', 'Vargas Ortega'),
    ('22130044', 'Valentina', 'Cruz Ramos'),
    ('22130055', 'Fernando', 'Ibarra Ponce'),
    ('22130066', 'Carolina', 'Montes Galván'),
    ('22130077', 'Alberto', 'Sandoval Zúñiga'),
    ('22130088', 'Jimena', 'Espinoza Bravo'),
    ('22130099', 'Arturo', 'Mendoza Salinas'),
    ('22130100', 'Mónica', 'Guzmán Carrillo'),
    ('22130111', 'Raúl', 'Paredes Ochoa'),
    ('22130122', 'Mariana', 'Velasco Mora'),
    ('22130133', 'Gustavo', 'Figueroa Ávila'),
    ('22130144', 'Fernanda', 'Rivas Contreras'),
    ('22130155', 'Óscar', 'Molina Elizondo'),
    -- Generación 2023
    ('23130015', 'Alejandro', 'Gutiérrez Salazar'),
    ('23130026', 'Isabella', 'Navarro Campos'),
    ('23130037', 'Andrés', 'Delgado Peña'),
    ('23130048', 'Camila', 'Rojas Díaz'),
    ('23130059', 'Luis Eduardo', 'Morales Santos'),
    ('23130060', 'Ximena', 'Beltrán Ochoa'),
    ('23130071', 'Jorge', 'Chávez Montes'),
    ('23130082', 'Regina', 'Herrera Luna'),
    ('23130093', 'Pablo', 'Ríos Salas'),
    ('23130104', 'Andrea', 'Padilla Tovar'),
    ('23130115', 'Eduardo', 'Valdez Rosales'),
    ('23130126', 'Silvia', 'Mejía Cervantes'),
    ('23130137', 'Mauricio', 'Soto Gallegos'),
    ('23130148', 'Paola', 'Rangel Ibarra'),
    ('23130159', 'Víctor', 'Zamora Estrada'),
    ('23130160', 'Verónica', 'Bravo Camacho'),
    ('23130171', 'Rodrigo', 'Lozano Paredes'),
    ('23130182', 'Elisa', 'Carranza Velasco'),
    ('23130193', 'Armando', 'Guerrero Rosas');

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

-- Insertar actividades de ejemplo (50+ actividades)
INSERT INTO Actividades (act_nombre, act_creditos, act_hor_ini, act_hor_fin, per_id, doc_responsable) VALUES
    -- Tecnología e Innovación
    ('Taller de Liderazgo', 2.0, '14:00:00', '16:00:00', 1, 1),
    ('Club de Programación Competitiva', 3.0, '16:00:00', '18:00:00', 1, 2),
    ('Voluntariado Social', 2.5, '10:00:00', '12:00:00', 1, 3),
    ('Taller de Emprendimiento', 2.0, '15:00:00', '17:00:00', 2, 1),
    ('Grupo de Investigación en IA', 4.0, '13:00:00', '17:00:00', 2, 4),
    ('Taller de Robótica', 3.5, '14:00:00', '17:00:00', 3, 3),
    ('Club de Debate', 2.0, '17:00:00', '19:00:00', 3, 1),
    ('Proyecto de Sustentabilidad', 3.0, '09:00:00', '12:00:00', 3, 4),
    ('Taller de Desarrollo Web', 3.0, '15:00:00', '18:00:00', 1, 2),
    ('Club de Ciberseguridad', 3.5, '16:00:00', '19:00:00', 2, 2),
    ('Proyecto de Desarrollo Móvil', 4.0, '14:00:00', '18:00:00', 2, 4),
    ('Taller de Diseño Gráfico', 2.5, '10:00:00', '12:30:00', 1, 3),
    ('Club de Música', 2.0, '18:00:00', '20:00:00', 3, 1),
    ('Grupo de Teatro', 2.5, '17:00:00', '19:30:00', 3, 1),
    ('Taller de Fotografía', 2.0, '14:00:00', '16:00:00', 2, 3),
    ('Club de Ajedrez', 1.5, '15:00:00', '16:30:00', 1, 1),
    ('Proyecto de Machine Learning', 4.0, '13:00:00', '17:00:00', 3, 4),
    ('Taller de Oratoria', 2.0, '16:00:00', '18:00:00', 2, 1),
    ('Club Deportivo', 2.0, '07:00:00', '09:00:00', 1, 3),
    ('Grupo de Tutorías', 3.0, '14:00:00', '17:00:00', 2, 2),
    -- Deportes y Salud
    ('Equipo de Fútbol Soccer', 2.5, '06:00:00', '08:00:00', 1, 3),
    ('Equipo de Basquetbol', 2.5, '17:00:00', '19:00:00', 1, 3),
    ('Club de Voleibol', 2.0, '18:00:00', '20:00:00', 2, 3),
    ('Taller de Yoga', 1.5, '07:00:00', '08:30:00', 1, 1),
    ('Club de Natación', 2.5, '06:30:00', '08:00:00', 2, 3),
    -- Arte y Cultura
    ('Taller de Pintura', 2.0, '15:00:00', '17:00:00', 1, 1),
    ('Club de Danza Folklórica', 2.5, '18:00:00', '20:00:00', 2, 1),
    ('Grupo de Cine y Video', 3.0, '16:00:00', '19:00:00', 3, 4),
    ('Taller de Escritura Creativa', 2.0, '14:00:00', '16:00:00', 1, 1),
    ('Club de Literatura', 1.5, '17:00:00', '18:30:00', 2, 1),
    -- Ciencias e Investigación
    ('Proyecto de Biotecnología', 4.0, '13:00:00', '17:00:00', 3, 4),
    ('Club de Astronomía', 2.0, '19:00:00', '21:00:00', 2, 4),
    ('Laboratorio de Química', 3.5, '14:00:00', '17:30:00', 1, 4),
    ('Grupo de Matemáticas Aplicadas', 3.0, '15:00:00', '18:00:00', 2, 2),
    ('Proyecto de Física Experimental', 3.5, '13:00:00', '16:30:00', 3, 4),
    -- Desarrollo Personal
    ('Taller de Inteligencia Emocional', 2.0, '16:00:00', '18:00:00', 1, 1),
    ('Club de Meditación', 1.5, '07:00:00', '08:30:00', 2, 1),
    ('Taller de Comunicación Efectiva', 2.0, '15:00:00', '17:00:00', 1, 1),
    ('Grupo de Desarrollo Profesional', 2.5, '17:00:00', '19:30:00', 3, 1),
    ('Taller de Finanzas Personales', 2.0, '18:00:00', '20:00:00', 2, 2),
    -- Tecnología Avanzada
    ('Club de Blockchain', 3.5, '16:00:00', '19:30:00', 3, 2),
    ('Taller de IoT', 3.0, '14:00:00', '17:00:00', 2, 4),
    ('Proyecto de Big Data', 4.0, '13:00:00', '17:00:00', 3, 4),
    ('Club de DevOps', 3.5, '15:00:00', '18:30:00', 2, 2),
    ('Taller de Cloud Computing', 3.0, '14:00:00', '17:00:00', 1, 2),
    -- Social y Comunidad
    ('Proyecto de Servicio Comunitario', 3.0, '09:00:00', '12:00:00', 1, 3),
    ('Club de Acción Social', 2.5, '10:00:00', '12:30:00', 2, 3),
    ('Taller de Educación Ambiental', 2.0, '15:00:00', '17:00:00', 3, 3),
    ('Grupo de Apoyo Académico', 2.5, '16:00:00', '18:30:00', 1, 2),
    ('Proyecto de Inclusión Digital', 3.0, '14:00:00', '17:00:00', 2, 2),
    -- Idiomas
    ('Club de Inglés Conversacional', 2.0, '17:00:00', '19:00:00', 1, 1),
    ('Taller de Francés', 2.0, '18:00:00', '20:00:00', 2, 1),
    ('Club de Alemán', 2.0, '16:00:00', '18:00:00', 1, 1),
    ('Taller de Japonés', 2.5, '17:00:00', '19:30:00', 3, 1),
    ('Club de Traducción', 2.5, '15:00:00', '17:30:00', 2, 1);

-- Insertar créditos otorgados (100+ registros)
-- Nota: Varios alumnos tienen menos de 6 créditos totales
INSERT INTO Creditos (alu_id, act_id, cred_fecha) VALUES
    -- Generación 2019 (IDs 1-5)
    -- Alumno 1: 5 créditos (completó requisito)
    (1, 1, '2024-05-15'),
    (1, 2, '2024-05-20'),
    (1, 9, '2024-05-22'),
    (1, 21, '2024-05-25'),
    (1, 26, '2024-12-10'),
    -- Alumno 2: 2 créditos (NO completo - solo 4.5 créditos)
    (2, 1, '2024-05-15'),
    (2, 12, '2024-05-28'),
    -- Alumno 3: 3 créditos (NO completo - solo 5.5 créditos)
    (3, 4, '2024-05-18'),
    (3, 5, '2024-12-08'),
    (3, 15, '2024-12-14'),
    -- Alumno 4: 5 créditos (completó requisito)
    (4, 6, '2025-05-10'),
    (4, 7, '2025-05-15'),
    (4, 13, '2024-05-20'),
    (4, 28, '2024-12-09'),
    (4, 42, '2024-12-13'),
    -- Alumno 5: 2 créditos (NO completo - solo 5.5 créditos)
    (5, 8, '2024-12-11'),
    (5, 14, '2025-05-14'),
    -- Generación 2020 (IDs 6-15)
    -- Alumno 6: 1 crédito (NO completo - solo 3.0 créditos)
    (6, 2, '2024-12-10'),
    -- Alumno 7: 4 créditos (completó requisito)
    (7, 11, '2024-05-12'),
    (7, 16, '2024-12-13'),
    (7, 23, '2024-05-14'),
    (7, 37, '2024-12-11'),
    -- Alumno 8: 2 créditos (NO completo - solo 5.0 créditos)
    (8, 17, '2025-05-10'),
    (8, 24, '2024-05-13'),
    -- Alumno 9: 4 créditos (completó requisito)
    (9, 18, '2024-12-09'),
    (9, 25, '2024-05-12'),
    (9, 38, '2024-05-16'),
    (9, 52, '2024-12-10'),
    -- Alumno 10: 3 créditos (NO completo - solo 5.0 créditos)
    (10, 19, '2024-12-11'),
    (10, 30, '2024-12-13'),
    (10, 43, '2024-12-15'),
    -- Alumno 11: 4 créditos (completó requisito)
    (11, 20, '2025-05-12'),
    (11, 34, '2025-05-14'),
    (11, 44, '2024-12-10'),
    (11, 53, '2024-05-20'),
    -- Alumno 12: 2 créditos (NO completo - solo 4.5 créditos)
    (12, 1, '2024-12-08'),
    (12, 35, '2024-05-11'),
    -- Alumno 13: 3 créditos (NO completo - solo 5.5 créditos)
    (13, 3, '2025-05-10'),
    (13, 39, '2024-05-13'),
    (13, 49, '2024-12-09'),
    -- Alumno 14: 4 créditos (completó requisito)
    (14, 4, '2024-12-11'),
    (14, 40, '2024-12-13'),
    (14, 50, '2024-12-15'),
    (14, 21, '2024-05-19'),
    -- Alumno 15: 1 crédito (NO completo - solo 2.0 créditos)
    (15, 5, '2025-05-11'),
    -- Generación 2021 (IDs 16-25)
    (16, 9, '2024-05-15'),
    (16, 16, '2024-12-10'),
    (16, 26, '2024-05-20'),
    (16, 36, '2024-12-14'),
    (17, 10, '2024-05-16'),
    (17, 17, '2024-12-11'),
    (17, 27, '2024-05-22'),
    (17, 37, '2024-12-15'),
    -- Alumno 18: 3 créditos (NO completo - solo 5.5 créditos)
    (18, 11, '2024-05-17'),
    (18, 18, '2024-12-12'),
    (18, 28, '2024-05-23'),
    -- Alumno 19: 4 créditos (completó requisito)
    (19, 12, '2024-05-18'),
    (19, 19, '2024-12-13'),
    (19, 29, '2024-05-24'),
    (19, 39, '2025-05-11'),
    -- Alumno 20: 2 créditos (NO completo - solo 4.5 créditos)
    (20, 13, '2024-05-19'),
    (20, 20, '2024-12-14'),
    -- Alumno 21: 4 créditos (completó requisito)
    (21, 14, '2024-05-20'),
    (21, 21, '2024-12-15'),
    (21, 31, '2024-05-26'),
    (21, 41, '2025-05-13'),
    -- Alumno 22: 1 crédito (NO completo - solo 2.0 créditos)
    (22, 15, '2024-05-21'),
    -- Alumno 23: 3 créditos (NO completo - solo 5.5 créditos)
    (23, 23, '2024-05-22'),
    (23, 33, '2024-12-11'),
    (23, 43, '2024-05-28'),
    -- Alumno 24: 4 créditos (completó requisito)
    (24, 24, '2024-05-23'),
    (24, 34, '2024-12-12'),
    (24, 44, '2024-05-29'),
    (24, 52, '2025-05-16'),
    -- Alumno 25: 2 créditos (NO completo - solo 4.5 créditos)
    (25, 25, '2024-05-24'),
    (25, 35, '2024-12-13'),
    -- Generación 2022 (IDs 26-40)
    -- Alumno 26: 1 crédito (NO completo - solo 2.0 créditos)
    (26, 1, '2024-05-25'),
    -- Alumno 27: 3 créditos (NO completo - solo 5.0 créditos)
    (27, 2, '2024-05-26'),
    (27, 9, '2024-12-15'),
    (27, 47, '2024-05-30'),
    -- Alumno 28: 2 créditos (NO completo - solo 5.5 créditos)
    (28, 3, '2024-05-27'),
    (28, 10, '2024-12-10'),
    -- Alumno 29: 4 créditos (completó requisito)
    (29, 4, '2024-05-28'),
    (29, 11, '2024-12-11'),
    (29, 49, '2024-05-28'),
    (29, 16, '2024-12-14'),
    -- Alumno 30: 1 crédito (NO completo - solo 4.0 créditos)
    (30, 5, '2024-05-29'),
    -- Alumno 31: 3 créditos (NO completo - solo 5.5 créditos)
    (31, 6, '2024-05-30'),
    (31, 13, '2024-12-13'),
    (31, 54, '2024-05-26'),
    -- Alumno 32: 4 créditos (completó requisito)
    (32, 7, '2024-05-31'),
    (32, 14, '2024-12-14'),
    (32, 55, '2024-05-25'),
    (32, 21, '2024-05-28'),
    -- Alumno 33: 2 créditos (NO completo - solo 3.5 créditos)
    (33, 15, '2024-05-30'),
    (33, 16, '2024-12-15'),
    -- Alumno 34: 4 créditos (completó requisito)
    (34, 17, '2024-05-29'),
    (34, 18, '2024-12-10'),
    (34, 22, '2024-05-23'),
    (34, 24, '2024-12-11'),
    -- Alumno 35: 2 créditos (NO completo - solo 4.0 créditos)
    (35, 19, '2024-05-28'),
    (35, 20, '2024-12-11'),
    -- Alumno 36: 3 créditos (NO completo - solo 5.0 créditos)
    (36, 24, '2024-05-27'),
    (36, 25, '2024-12-12'),
    (36, 26, '2024-05-21'),
    -- Alumno 37: 4 créditos (completó requisito)
    (37, 27, '2024-05-26'),
    (37, 28, '2024-12-13'),
    (37, 29, '2024-05-20'),
    (37, 30, '2024-12-14'),
    -- Alumno 38: 1 crédito (NO completo - solo 2.5 créditos)
    (38, 31, '2024-12-14'),
    -- Alumno 39: 3 créditos (NO completo - solo 5.0 créditos)
    (39, 33, '2024-05-24'),
    (39, 34, '2024-12-15'),
    (39, 35, '2024-05-18'),
    -- Alumno 40: 4 créditos (completó requisito)
    (40, 36, '2024-05-23'),
    (40, 37, '2024-12-10'),
    (40, 38, '2024-05-17'),
    (40, 39, '2024-12-12'),
    -- Generación 2023 (IDs 41-59)
    (41, 39, '2024-05-22'),
    (41, 40, '2024-12-11'),
    (41, 41, '2024-05-16'),
    (42, 42, '2024-05-21'),
    (42, 43, '2024-12-12'),
    (42, 44, '2024-05-15'),
    (43, 45, '2024-05-20'),
    (43, 46, '2024-12-13'),
    (43, 47, '2024-05-14'),
    (44, 48, '2024-05-19'),
    (44, 49, '2024-12-14'),
    (44, 50, '2024-05-13'),
    (45, 51, '2024-05-18'),
    (45, 52, '2024-12-15'),
    (45, 53, '2024-05-12'),
    (46, 54, '2024-05-17'),
    (46, 55, '2024-12-10'),
    (46, 1, '2024-05-11'),
    (47, 2, '2024-05-16'),
    (47, 3, '2024-12-11'),
    (47, 4, '2024-05-10'),
    (48, 5, '2024-05-15'),
    (48, 6, '2024-12-12'),
    (48, 7, '2024-05-09'),
    (49, 8, '2024-05-14'),
    (49, 9, '2024-12-13'),
    (49, 10, '2024-05-08'),
    (50, 11, '2024-05-13'),
    (50, 12, '2024-12-14'),
    (50, 13, '2024-05-07'),
    (51, 14, '2024-05-12'),
    (51, 15, '2024-12-15'),
    (51, 16, '2024-05-06'),
    (52, 17, '2024-05-11'),
    (52, 18, '2024-12-10'),
    (52, 19, '2024-05-05'),
    (53, 20, '2024-05-10'),
    (53, 21, '2024-12-11'),
    (53, 22, '2024-05-04'),
    (54, 23, '2024-05-09'),
    (54, 24, '2024-12-12'),
    (54, 25, '2024-05-03'),
    (55, 26, '2024-05-08'),
    (55, 27, '2024-12-13'),
    (55, 28, '2024-05-02'),
    (56, 29, '2024-05-07'),
    (56, 30, '2024-12-14'),
    (56, 31, '2024-05-01'),
    (57, 32, '2024-05-06'),
    (57, 33, '2024-12-15'),
    (57, 34, '2024-04-30'),
    (58, 35, '2024-05-05'),
    (58, 36, '2024-12-10'),
    (58, 37, '2024-04-29'),
    (59, 38, '2024-05-04'),
    (59, 39, '2024-12-11'),
    (59, 40, '2024-04-28');
