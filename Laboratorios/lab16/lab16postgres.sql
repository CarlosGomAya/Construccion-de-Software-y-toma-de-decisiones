-- Lab 15: Conociendo el ambiente de PostgreSQL
-- Creacion de tablas, llaves e insercion de datos

-- ============================================
-- CREACION DE TABLAS
-- ============================================

CREATE TABLE public."Materiales" (
    clave integer NOT NULL,
    descripcion character varying(40) NOT NULL,
    precio numeric NOT NULL,
    impuesto numeric NOT NULL
);

CREATE TABLE public."Proveedores" (
    rfc character varying(15) NOT NULL,
    razonsocial character varying(40) NOT NULL
);

CREATE TABLE public."Proyectos" (
    numero integer NOT NULL,
    denominacion character varying(40) NOT NULL
);

CREATE TABLE public."Entregan" (
    clave integer NOT NULL,
    rfc character varying(15) NOT NULL,
    numero integer NOT NULL,
    fecha date NOT NULL,
    cantidad integer NOT NULL
);

-- ============================================
-- LLAVES PRIMARIAS
-- ============================================

ALTER TABLE ONLY public."Materiales"
    ADD CONSTRAINT "Materiales_pkey" PRIMARY KEY (clave);

ALTER TABLE ONLY public."Proveedores"
    ADD CONSTRAINT "Proveedores_pkey" PRIMARY KEY (rfc);

ALTER TABLE ONLY public."Proyectos"
    ADD CONSTRAINT "Proyectos_pkey" PRIMARY KEY (numero);

ALTER TABLE ONLY public."Entregan"
    ADD CONSTRAINT "Entregan_pkey" PRIMARY KEY (clave, rfc, numero, fecha);

-- ============================================
-- INSERTS - Materiales
-- ============================================

INSERT INTO public."Materiales" VALUES (1000, 'Varilla 3/16', 100, 10);
INSERT INTO public."Materiales" VALUES (1010, 'Varilla 4/32', 115, 11.5);
INSERT INTO public."Materiales" VALUES (1020, 'Varilla 3/17', 130, 13);
INSERT INTO public."Materiales" VALUES (1030, 'Varilla 4/33', 145, 14.5);
INSERT INTO public."Materiales" VALUES (1040, 'Varilla 3/18', 160, 16);
INSERT INTO public."Materiales" VALUES (1050, 'Varilla 4/34', 175, 17.5);
INSERT INTO public."Materiales" VALUES (1060, 'Varilla 3/19', 190, 19);
INSERT INTO public."Materiales" VALUES (1070, 'Varilla 4/35', 205, 20.5);
INSERT INTO public."Materiales" VALUES (1080, 'Ladrillos rojos', 50, 5);
INSERT INTO public."Materiales" VALUES (1090, 'Ladrillos grises', 35, 3.5);
INSERT INTO public."Materiales" VALUES (1100, 'Block', 30, 3);
INSERT INTO public."Materiales" VALUES (1110, 'Megablock', 40, 4);
INSERT INTO public."Materiales" VALUES (1120, 'Sillar rosa', 100, 10);
INSERT INTO public."Materiales" VALUES (1130, 'Sillar gris', 110, 11);
INSERT INTO public."Materiales" VALUES (1140, 'Cantera blanca', 200, 20);
INSERT INTO public."Materiales" VALUES (1150, 'Cantera gris', 1210, 121);
INSERT INTO public."Materiales" VALUES (1160, 'Cantera rosa', 1420, 142);
INSERT INTO public."Materiales" VALUES (1170, 'Cantera amarilla', 230, 23);
INSERT INTO public."Materiales" VALUES (1180, 'Recubrimiento P1001', 200, 20);
INSERT INTO public."Materiales" VALUES (1190, 'Recubrimiento P1010', 220, 22);
INSERT INTO public."Materiales" VALUES (1200, 'Recubrimiento P1019', 240, 24);
INSERT INTO public."Materiales" VALUES (1210, 'Recubrimiento P1028', 250, 25);
INSERT INTO public."Materiales" VALUES (1220, 'Recubrimiento P1037', 280, 28);
INSERT INTO public."Materiales" VALUES (1230, 'Cemento ', 300, 30);
INSERT INTO public."Materiales" VALUES (1240, 'Arena', 200, 20);
INSERT INTO public."Materiales" VALUES (1250, 'Grava', 100, 10);
INSERT INTO public."Materiales" VALUES (1260, 'Gravilla', 90, 9);
INSERT INTO public."Materiales" VALUES (1270, 'Tezontle', 80, 8);
INSERT INTO public."Materiales" VALUES (1280, 'Tepetate', 34, 3.4);
INSERT INTO public."Materiales" VALUES (1290, 'Tubería 3.5', 200, 20);
INSERT INTO public."Materiales" VALUES (1300, 'Tubería 4.3', 210, 21);
INSERT INTO public."Materiales" VALUES (1310, 'Tubería 3.6', 220, 22);
INSERT INTO public."Materiales" VALUES (1320, 'Tubería 4.4', 230, 23);
INSERT INTO public."Materiales" VALUES (1330, 'Tubería 3.7', 240, 24);
INSERT INTO public."Materiales" VALUES (1340, 'Tubería 4.5', 250, 25);
INSERT INTO public."Materiales" VALUES (1350, 'Tubería 3.8', 260, 26);
INSERT INTO public."Materiales" VALUES (1360, 'Pintura C1010', 125, 12.5);
INSERT INTO public."Materiales" VALUES (1370, 'Pintura B1020', 125, 12.5);
INSERT INTO public."Materiales" VALUES (1380, 'Pintura C1011', 725, 72.5);
INSERT INTO public."Materiales" VALUES (1390, 'Pintura B1021', 125, 12.5);
INSERT INTO public."Materiales" VALUES (1400, 'Pintura C1011', 125, 12.5);
INSERT INTO public."Materiales" VALUES (1410, 'Pintura B1021', 125, 12.5);
INSERT INTO public."Materiales" VALUES (1420, 'Pintura C1012', 125, 12.5);
INSERT INTO public."Materiales" VALUES (1430, 'Pintura B1022', 125, 12.5);
INSERT INTO public."Materiales" VALUES (2000, 'Jabón', 125, 12.5);

-- ============================================
-- INSERTS - Proveedores
-- ============================================

INSERT INTO public."Proveedores" VALUES ('AAAA800101', 'La fragua');
INSERT INTO public."Proveedores" VALUES ('BBBB800101', 'Oviedo');
INSERT INTO public."Proveedores" VALUES ('CCCC800101', 'La Ferre');
INSERT INTO public."Proveedores" VALUES ('DDDD800101', 'Cecoferre');
INSERT INTO public."Proveedores" VALUES ('EEEE800101', 'Alvin');
INSERT INTO public."Proveedores" VALUES ('FFFF800101', 'Comex');
INSERT INTO public."Proveedores" VALUES ('GGGG800101', 'Tabiquera del centro');
INSERT INTO public."Proveedores" VALUES ('HHHH800101', 'Tubasa');

-- ============================================
-- INSERTS - Proyectos
-- ============================================

INSERT INTO public."Proyectos" VALUES (5000, 'Vamos Mexico');
INSERT INTO public."Proyectos" VALUES (5001, 'Aztecon');
INSERT INTO public."Proyectos" VALUES (5002, 'CIT Campeche');
INSERT INTO public."Proyectos" VALUES (5003, 'Mexico sin ti no estamos completos');
INSERT INTO public."Proyectos" VALUES (5004, 'Educando en Coahuila');
INSERT INTO public."Proyectos" VALUES (5005, 'Infonavit Durango');
INSERT INTO public."Proyectos" VALUES (5006, 'Reconstrucción del templo de Guadalupe');
INSERT INTO public."Proyectos" VALUES (5007, 'Construcción de plaza Magnolias');
INSERT INTO public."Proyectos" VALUES (5008, 'Televisa en acción');
INSERT INTO public."Proyectos" VALUES (5009, 'Disco Atlantic');
INSERT INTO public."Proyectos" VALUES (5010, 'Construcción de Hospital Infantil');
INSERT INTO public."Proyectos" VALUES (5011, 'Remodelación de aulas del IPP');
INSERT INTO public."Proyectos" VALUES (5012, 'Restauración de instalaciones del CEA');
INSERT INTO public."Proyectos" VALUES (5013, 'Reparación de la plaza Sonora');
INSERT INTO public."Proyectos" VALUES (5014, 'Remodelación de Soriana');
INSERT INTO public."Proyectos" VALUES (5015, 'CIT Yucatan');
INSERT INTO public."Proyectos" VALUES (5016, 'Ampliación de la carretera a la huasteca');
INSERT INTO public."Proyectos" VALUES (5017, 'Reparación de la carretera del sol');
INSERT INTO public."Proyectos" VALUES (5018, 'Tu cambio por la educación');
INSERT INTO public."Proyectos" VALUES (5019, 'Queretaro limpio');

-- ============================================
-- INSERTS - Entregan
-- ============================================

INSERT INTO public."Entregan" VALUES (1000, 'AAAA800101', 5019, '1999-07-13', 254);
INSERT INTO public."Entregan" VALUES (1010, 'BBBB800101', 5001, '1998-07-28', 528);
INSERT INTO public."Entregan" VALUES (1010, 'BBBB800101', 5018, '1997-02-09', 523);
INSERT INTO public."Entregan" VALUES (1020, 'CCCC800101', 5002, '2003-12-16', 582);
INSERT INTO public."Entregan" VALUES (1020, 'CCCC800101', 5017, '2000-03-29', 8);
INSERT INTO public."Entregan" VALUES (1030, 'DDDD800101', 5003, '1998-01-12', 202);
INSERT INTO public."Entregan" VALUES (1030, 'DDDD800101', 5016, '2005-06-07', 295);
INSERT INTO public."Entregan" VALUES (1040, 'EEEE800101', 5004, '1999-12-18', 263);
INSERT INTO public."Entregan" VALUES (1040, 'EEEE800101', 5015, '1999-05-29', 540);
INSERT INTO public."Entregan" VALUES (1050, 'FFFF800101', 5005, '2004-02-07', 503);
INSERT INTO public."Entregan" VALUES (1050, 'FFFF800101', 5014, '2000-04-18', 623);
INSERT INTO public."Entregan" VALUES (1060, 'GGGG800101', 5006, '2004-09-29', 324);
INSERT INTO public."Entregan" VALUES (1060, 'GGGG800101', 5013, '2002-07-23', 692);
INSERT INTO public."Entregan" VALUES (1070, 'HHHH800101', 5007, '2006-11-21', 2);
INSERT INTO public."Entregan" VALUES (1070, 'HHHH800101', 5012, '2004-11-27', 503);
INSERT INTO public."Entregan" VALUES (1080, 'AAAA800101', 5008, '2005-04-03', 86);
INSERT INTO public."Entregan" VALUES (1080, 'AAAA800101', 5011, '2003-08-28', 699);
INSERT INTO public."Entregan" VALUES (1090, 'BBBB800101', 5009, '1997-03-13', 73);
INSERT INTO public."Entregan" VALUES (1090, 'BBBB800101', 5010, '1998-11-17', 421);
INSERT INTO public."Entregan" VALUES (1100, 'CCCC800101', 5009, '2000-12-07', 466);
INSERT INTO public."Entregan" VALUES (1100, 'CCCC800101', 5010, '2001-11-19', 699);
INSERT INTO public."Entregan" VALUES (1110, 'DDDD800101', 5008, '2005-06-03', 337);
INSERT INTO public."Entregan" VALUES (1110, 'DDDD800101', 5011, '2002-01-13', 368);
INSERT INTO public."Entregan" VALUES (1120, 'EEEE800101', 5007, '2003-11-21', 692);
INSERT INTO public."Entregan" VALUES (1120, 'EEEE800101', 5012, '1997-08-05', 215);
INSERT INTO public."Entregan" VALUES (1130, 'FFFF800101', 5006, '2000-04-13', 562);
INSERT INTO public."Entregan" VALUES (1130, 'FFFF800101', 5013, '2000-02-09', 63);
INSERT INTO public."Entregan" VALUES (1140, 'GGGG800101', 5005, '2000-06-30', 583);
INSERT INTO public."Entregan" VALUES (1140, 'GGGG800101', 5014, '1999-06-28', 219);
INSERT INTO public."Entregan" VALUES (1150, 'HHHH800101', 5004, '2002-11-14', 453);
INSERT INTO public."Entregan" VALUES (1150, 'HHHH800101', 5015, '2006-02-16', 458);
INSERT INTO public."Entregan" VALUES (1160, 'AAAA800101', 5016, '1997-08-09', 162);
INSERT INTO public."Entregan" VALUES (1160, 'AAAA800101', 5019, '2003-05-05', 244);
INSERT INTO public."Entregan" VALUES (1170, 'BBBB800101', 5017, '2002-01-31', 180);
INSERT INTO public."Entregan" VALUES (1170, 'BBBB800101', 5018, '2006-07-12', 53);
INSERT INTO public."Entregan" VALUES (1180, 'CCCC800101', 5017, '2002-04-17', 334);
INSERT INTO public."Entregan" VALUES (1180, 'CCCC800101', 5018, '2001-10-24', 407);
INSERT INTO public."Entregan" VALUES (1190, 'DDDD800101', 5016, '2005-11-07', 356);
INSERT INTO public."Entregan" VALUES (1190, 'DDDD800101', 5019, '2004-11-19', 94);
INSERT INTO public."Entregan" VALUES (1200, 'EEEE800101', 5000, '2003-03-15', 177);
INSERT INTO public."Entregan" VALUES (1200, 'EEEE800101', 5015, '1998-11-07', 585);
INSERT INTO public."Entregan" VALUES (1210, 'FFFF800101', 5001, '2000-05-21', 43);
INSERT INTO public."Entregan" VALUES (1210, 'FFFF800101', 5014, '2002-09-26', 70);
INSERT INTO public."Entregan" VALUES (1220, 'GGGG800101', 5002, '2005-07-03', 24);
INSERT INTO public."Entregan" VALUES (1220, 'GGGG800101', 5013, '1998-12-16', 658);
INSERT INTO public."Entregan" VALUES (1230, 'HHHH800101', 5003, '1998-09-12', 530);
INSERT INTO public."Entregan" VALUES (1230, 'HHHH800101', 5012, '2004-08-23', 312);
INSERT INTO public."Entregan" VALUES (1240, 'AAAA800101', 5004, '2000-01-01', 152);
INSERT INTO public."Entregan" VALUES (1240, 'AAAA800101', 5011, '1997-03-13', 366);
INSERT INTO public."Entregan" VALUES (1250, 'BBBB800101', 5005, '2003-10-12', 71);
INSERT INTO public."Entregan" VALUES (1250, 'BBBB800101', 5010, '1999-01-25', 691);
INSERT INTO public."Entregan" VALUES (1260, 'CCCC800101', 5006, '2001-04-09', 460);
INSERT INTO public."Entregan" VALUES (1260, 'CCCC800101', 5009, '2001-07-28', 631);
INSERT INTO public."Entregan" VALUES (1270, 'DDDD800101', 5007, '2005-06-06', 506);
INSERT INTO public."Entregan" VALUES (1270, 'DDDD800101', 5008, '2003-01-21', 546);
INSERT INTO public."Entregan" VALUES (1280, 'EEEE800101', 5007, '1998-04-01', 331);
INSERT INTO public."Entregan" VALUES (1280, 'EEEE800101', 5008, '2002-03-23', 107);
INSERT INTO public."Entregan" VALUES (1290, 'FFFF800101', 5006, '2002-01-09', 279);
INSERT INTO public."Entregan" VALUES (1290, 'FFFF800101', 5009, '2003-06-10', 132);
INSERT INTO public."Entregan" VALUES (1300, 'GGGG800101', 5005, '2004-02-28', 521);
INSERT INTO public."Entregan" VALUES (1300, 'GGGG800101', 5010, '2001-02-10', 119);
INSERT INTO public."Entregan" VALUES (1310, 'HHHH800101', 5011, '2000-09-14', 72);
INSERT INTO public."Entregan" VALUES (1310, 'HHHH800101', 5019, '1998-05-27', 199);
INSERT INTO public."Entregan" VALUES (1320, 'AAAA800101', 5012, '1999-04-27', 698);
INSERT INTO public."Entregan" VALUES (1320, 'AAAA800101', 5018, '2002-06-23', 413);
INSERT INTO public."Entregan" VALUES (1330, 'BBBB800101', 5013, '2001-03-13', 554);
INSERT INTO public."Entregan" VALUES (1330, 'BBBB800101', 5017, '2006-06-10', 93);
INSERT INTO public."Entregan" VALUES (1340, 'CCCC800101', 5014, '1999-08-25', 324);
INSERT INTO public."Entregan" VALUES (1340, 'CCCC800101', 5016, '1997-05-11', 674);
INSERT INTO public."Entregan" VALUES (1350, 'DDDD800101', 5015, '1997-01-06', 272);
INSERT INTO public."Entregan" VALUES (1360, 'EEEE800101', 5014, '2000-02-04', 265);
INSERT INTO public."Entregan" VALUES (1360, 'EEEE800101', 5016, '1998-09-02', 364);
INSERT INTO public."Entregan" VALUES (1370, 'FFFF800101', 5013, '1997-12-03', 575);
INSERT INTO public."Entregan" VALUES (1370, 'FFFF800101', 5017, '1999-06-26', 44);
INSERT INTO public."Entregan" VALUES (1380, 'GGGG800101', 5012, '2005-12-05', 645);
INSERT INTO public."Entregan" VALUES (1380, 'GGGG800101', 5018, '2006-04-15', 302);
INSERT INTO public."Entregan" VALUES (1390, 'HHHH800101', 5011, '2003-02-16', 697);
INSERT INTO public."Entregan" VALUES (1390, 'HHHH800101', 5019, '2000-11-10', 107);
INSERT INTO public."Entregan" VALUES (1400, 'AAAA800101', 5000, '1999-04-07', 382);
INSERT INTO public."Entregan" VALUES (1400, 'AAAA800101', 5010, '2005-04-21', 116);
INSERT INTO public."Entregan" VALUES (1410, 'BBBB800101', 5001, '2000-05-18', 601);
INSERT INTO public."Entregan" VALUES (1410, 'BBBB800101', 5009, '2003-07-13', 467);
INSERT INTO public."Entregan" VALUES (1420, 'CCCC800101', 5002, '2001-09-09', 603);
INSERT INTO public."Entregan" VALUES (1420, 'CCCC800101', 5008, '1999-05-05', 278);
INSERT INTO public."Entregan" VALUES (1430, 'DDDD800101', 5003, '2005-04-30', 576);
INSERT INTO public."Entregan" VALUES (1430, 'DDDD800101', 5007, '2000-03-02', 13);

-- ============================================
-- LLAVES FORANEAS (Entregan)
-- ============================================

ALTER TABLE ONLY public."Entregan"
    ADD CONSTRAINT clave FOREIGN KEY (clave) REFERENCES public."Materiales"(clave) NOT VALID;

ALTER TABLE ONLY public."Entregan"
    ADD CONSTRAINT rfc_fk FOREIGN KEY (rfc) REFERENCES public."Proveedores"(rfc) NOT VALID;

ALTER TABLE ONLY public."Entregan"
    ADD CONSTRAINT numero_fk FOREIGN KEY (numero) REFERENCES public."Proyectos"(numero) NOT VALID;
