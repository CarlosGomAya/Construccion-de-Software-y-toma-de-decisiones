-- =============================================
-- LAB 21: Funciones Agregadas y Sub-consultas
-- Carlitos
-- =============================================

-- =============================================
-- SETUP: Crear tablas
-- =============================================

CREATE TABLE IF NOT EXISTS Materiales (
    Clave              VARCHAR(10) PRIMARY KEY,
    Descripcion        VARCHAR(100),
    Costo              NUMERIC(10,2),
    PorcentajeImpuesto NUMERIC(5,2)
);

CREATE TABLE IF NOT EXISTS Proveedores (
    RFC        VARCHAR(13) PRIMARY KEY,
    RazonSocial VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Proyectos (
    Numero      VARCHAR(10) PRIMARY KEY,
    Denominacion VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS Entregan (
    Clave    VARCHAR(10),
    RFC      VARCHAR(13),
    Numero   VARCHAR(10),
    Fecha    DATE,
    Cantidad NUMERIC(10,2),
    PRIMARY KEY (Clave, RFC, Numero, Fecha),
    FOREIGN KEY (Clave)  REFERENCES Materiales(Clave),
    FOREIGN KEY (RFC)    REFERENCES Proveedores(RFC),
    FOREIGN KEY (Numero) REFERENCES Proyectos(Numero)
);

-- =============================================
-- Datos de prueba
-- =============================================

INSERT INTO Materiales VALUES
    ('M01', 'Cemento', 150.00, 16),
    ('M02', 'Varilla', 200.00, 16),
    ('M03', 'Grava',    80.00, 16),
    ('M04', 'Arena',    60.00, 16)
ON CONFLICT DO NOTHING;

INSERT INTO Proveedores VALUES
    ('PROV001', 'Constructora Alpha SA'),
    ('PROV002', 'Materiales Beta SC'),
    ('PROV003', 'Suministros Gamma')
ON CONFLICT DO NOTHING;

INSERT INTO Proyectos VALUES
    ('P01', 'Torre Residencial'),
    ('P02', 'Puente Vehicular'),
    ('P03', 'Edificio Corporativo')
ON CONFLICT DO NOTHING;

INSERT INTO Entregan VALUES
    -- Entregas en 1997
    ('M01','PROV001','P01','1997-03-15', 500),
    ('M01','PROV001','P02','1997-06-20', 300),
    ('M02','PROV001','P01','1997-08-10', 450),
    ('M02','PROV002','P02','1997-11-05', 600),
    ('M03','PROV002','P01','1997-04-18', 200),
    ('M03','PROV003','P03','1997-09-30', 350),
    ('M04','PROV003','P02','1997-12-01', 700),
    -- Entregas fuera de 1997
    ('M01','PROV002','P03','1998-02-14', 400),
    ('M02','PROV003','P01','1998-05-22', 550),
    ('M03','PROV001','P02','1996-07-11', 250),
    ('M04','PROV002','P01','1998-10-30', 480),
    ('M04','PROV001','P03','1999-01-15', 620)
ON CONFLICT DO NOTHING;

-- =============================================
-- Actualizar PorcentajeImpuesto a 16
-- =============================================

UPDATE Materiales SET PorcentajeImpuesto = 16;

-- =============================================
-- CONSULTA 1
-- Suma de cantidades e importe total en 1997
-- Importe = Cantidad * Costo * (1 + PorcentajeImpuesto/100)
-- =============================================

SELECT
    SUM(e.Cantidad)                                                   AS "Total Cantidad",
    SUM(e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto / 100.0))   AS "Importe Total"
FROM Entregan e
JOIN Materiales m ON e.Clave = m.Clave
WHERE EXTRACT(YEAR FROM e.Fecha) = 1997;

-- =============================================
-- CONSULTA 2
-- Por proveedor: razón social, número de entregas, importe total
-- =============================================

SELECT
    p.RazonSocial                                                     AS "Proveedor",
    COUNT(*)                                                          AS "Num Entregas",
    SUM(e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto / 100.0))   AS "Importe Total"
FROM Entregan e
JOIN Proveedores p ON e.RFC   = p.RFC
JOIN Materiales  m ON e.Clave = m.Clave
GROUP BY p.RFC, p.RazonSocial
ORDER BY p.RazonSocial;

-- =============================================
-- CONSULTA 3
-- Por material: clave, descripción, cantidad total/mínima/máxima,
-- importe total — solo materiales con promedio de cantidad > 400
-- =============================================

SELECT
    m.Clave                                                           AS "Clave",
    m.Descripcion                                                     AS "Descripcion",
    SUM(e.Cantidad)                                                   AS "Cantidad Total",
    MIN(e.Cantidad)                                                   AS "Cantidad Minima",
    MAX(e.Cantidad)                                                   AS "Cantidad Maxima",
    SUM(e.Cantidad * m.Costo * (1 + m.PorcentajeImpuesto / 100.0))   AS "Importe Total"
FROM Entregan e
JOIN Materiales m ON e.Clave = m.Clave
GROUP BY m.Clave, m.Descripcion, m.Costo, m.PorcentajeImpuesto
HAVING AVG(e.Cantidad) > 400
ORDER BY m.Clave;

-- =============================================
-- CONSULTA 4
-- Por proveedor: razón social, clave y descripción del material,
-- cantidad promedio — excluyendo proveedores con promedio < 500
-- =============================================

SELECT
    p.RazonSocial       AS "Proveedor",
    m.Clave             AS "Clave Material",
    m.Descripcion       AS "Descripcion",
    AVG(e.Cantidad)     AS "Cantidad Promedio"
FROM Entregan e
JOIN Proveedores p ON e.RFC   = p.RFC
JOIN Materiales  m ON e.Clave = m.Clave
GROUP BY p.RFC, p.RazonSocial, m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) >= 500
ORDER BY p.RazonSocial, m.Clave;

-- =============================================
-- CONSULTA 5
-- Mismos datos que consulta 4 pero para dos grupos:
-- promedio < 370  y  promedio > 450
-- =============================================

SELECT
    p.RazonSocial   AS "Proveedor",
    m.Clave         AS "Clave Material",
    m.Descripcion   AS "Descripcion",
    AVG(e.Cantidad) AS "Cantidad Promedio",
    CASE
        WHEN AVG(e.Cantidad) < 370 THEN 'Promedio < 370'
        WHEN AVG(e.Cantidad) > 450 THEN 'Promedio > 450'
    END             AS "Grupo"
FROM Entregan e
JOIN Proveedores p ON e.RFC   = p.RFC
JOIN Materiales  m ON e.Clave = m.Clave
GROUP BY p.RFC, p.RazonSocial, m.Clave, m.Descripcion
HAVING AVG(e.Cantidad) < 370 OR AVG(e.Cantidad) > 450
ORDER BY "Grupo", p.RazonSocial, m.Clave;
