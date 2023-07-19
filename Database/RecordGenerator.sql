-- ASSUMES CALL WILL NEVER HAVE TO RETROACTIVELY POPULATE CALENDAR

DROP FUNCTION IF EXISTS recordgenerator;
CREATE FUNCTION recordgenerator() RETURNS INT AS $$
DECLARE
    curr timestamp;
    id INT;
    event_date timestamp;
    habit_end_date date;
    interval INTERVAL;
    exist int;
    added int;
    due_time time;
    years_to_add int;
BEGIN
    curr := now();
    added := 0;

    -- each habit
    FOR id IN SELECT habit_id FROM habits WHERE end_date IS NULL OR curr <= end_date LOOP -- SELECTS ALL Habits that have yet to end by the time this runs
        SELECT start_date INTO event_date FROM Habits WHERE habit_id = id;
        SELECT recurring INTO interval FROM Habits WHERE habit_id = id;
        SELECT end_time INTO due_time FROM Habits WHERE habit_id = id;
        event_date := event_date + due_time;
        IF(EXTRACT(DAYS FROM curr - event_date) > 365) THEN
            years_to_add := EXTRACT(DAYS FROM curr - event_date) / 365;
            event_date := event_date + CONCAT(CAST(years_to_add AS TEXT), CAST(' years' AS TEXT))::interval;
            Raise notice 'Added % years to get %', years_to_add, event_date;
        END IF;

        WHILE (EXTRACT(MONTH FROM event_date) != EXTRACT(MONTH FROM curr)) AND interval IS NOT NULL LOOP
            event_date := event_date + interval;
        END LOOP;

        -- placing each habit
        SELECT end_date INTO habit_end_date FROM Habits WHERE habit_id = id;
        WHILE ((habit_end_date IS NULL) OR (event_date <= habit_end_date)) AND (EXTRACT(MONTH FROM event_date) = EXTRACT(MONTH FROM curr) AND EXTRACT(YEAR FROM event_date) = EXTRACT(YEAR FROM curr)) LOOP
            SELECT COUNT(record_id) INTO exist FROM Records WHERE habit_id = id AND due_date = event_date;
            --Raise notice 'habit % date: %         current event date: %', id, habit_end_date, event_date;
            IF exist = 0 THEN 
                INSERT INTO Records VALUES(DEFAULT, NULL, event_date, FALSE, NULL, 0, id);
                added := added + 1;
                IF interval IS NOT NULL THEN
                    event_date := event_date + interval;
                    --Raise notice 'adding';
                END IF;
            ELSE
                --Raise notice 'breaking';
                exit;
            END IF;
        END LOOP;
    END LOOP;
    RETURN added;
END
$$ LANGUAGE plpgsql;