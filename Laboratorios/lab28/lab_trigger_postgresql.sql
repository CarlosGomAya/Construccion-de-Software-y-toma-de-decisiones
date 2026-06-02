CREATE TABLE log_razonsocial (
   id INT GENERATED ALWAYS AS IDENTITY,
   rfc character varying(15) NOT NULL,
   razonsocial character varying(15) NOT NULL,
   fecha_cambio TIMESTAMP NOT NULL
);


CREATE OR REPLACE FUNCTION cambios_razonsocial()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
	IF NEW.razonsocial <> OLD.razonsocial THEN
		 INSERT INTO log_razonsocial(rfc,razonsocial,fecha_cambio)
		 VALUES(OLD.rfc,OLD.razonsocial,now());
	END IF;

	RETURN NEW;
END;
$$;


CREATE TRIGGER razonsocial_update
  BEFORE UPDATE
  ON "Proveedores"
  FOR EACH ROW
  EXECUTE PROCEDURE cambios_razonsocial();
  
CREATE OR REPLACE FUNCTION delete_razonsocial()
  RETURNS TRIGGER
  LANGUAGE PLPGSQL
  AS
$$
BEGIN
		 INSERT INTO log_razonsocial(rfc,razonsocial,fecha_cambio)
		 VALUES(OLD.rfc,OLD.razonsocial,now());

	RETURN OLD;
END;
$$;


CREATE TRIGGER razonsocial_delete
  BEFORE DELETE
  ON "Proveedores"
  FOR EACH ROW
  EXECUTE PROCEDURE delete_razonsocial();
