DROP FUNCTION IF EXISTS user_id_from_name;
CREATE FUNCTION user_id_from_name(name VARCHAR(50)) RETURNS INT AS $$
DECLARE
    id int;
BEGIN
    SELECT user_id INTO id FROM Users WHERE name = username; 
    RETURN id;
END
$$ LANGUAGE plpgsql;