-- Code to generate Records for fake past Habits. Used exclusively for testing

-- Random number generator function
CREATE OR REPLACE FUNCTION random_between(low INT ,high INT) RETURNS INT AS $$
BEGIN
    --Raise notice 'Ran random';
    RETURN floor(random()* (high-low + 1) + low);
    
END;
$$ language plpgsql;

-- Copy of RecordGenerator hardcoded to generate Records from March 4, 2020 to the present
-- Used exclusively for testing 
DROP FUNCTION IF EXISTS historygenerator;
CREATE FUNCTION historygenerator() RETURNS INT AS $$
DECLARE
    curr timestamp;
    id INT;
    event_date timestamp;
    habit_end_date date;
    interval INTERVAL;
    exist int;
    added int;
    due_time time;
    begin_time time;
    years_to_add int;
    time_spent int;
    complete bool;
    on_time bool;
    dt_com timestamp;
BEGIN
    curr := 'March 14, 2020';
    added := 0;

    -- each habit
    FOR id IN SELECT habit_id FROM habits WHERE end_date IS NULL OR curr <= end_date LOOP -- SELECTS ALL Habits that have yet to end by the time this runs
        SELECT start_date INTO event_date FROM Habits WHERE habit_id = id;
        SELECT recurring INTO interval FROM Habits WHERE habit_id = id;
        SELECT end_time INTO due_time FROM Habits WHERE habit_id = id;
        SELECT start_time INTO begin_time FROM Habits WHERE habit_id = id;
        event_date := event_date + due_time;
        IF(EXTRACT(DAYS FROM curr - event_date) > 365) THEN
            years_to_add := EXTRACT(DAYS FROM curr - event_date) / 365;
            event_date := event_date + CONCAT(CAST(years_to_add AS TEXT), CAST(' years' AS TEXT))::interval;
            --Raise notice 'Added % years to get %', years_to_add, event_date;
        END IF;
        --EXTRACT(MONTH FROM event_date) != EXTRACT(MONTH FROM curr)
        WHILE (event_date < curr) AND interval IS NOT NULL AND (EXTRACT(YEAR FROM event_date) = EXTRACT(YEAR FROM curr)) LOOP
            event_date := event_date + interval;
            --Raise notice 'event date is %', event_date;
        END LOOP;

        -- placing each habit
        SELECT end_date INTO habit_end_date FROM Habits WHERE habit_id = id;
        WHILE ((habit_end_date IS NULL) OR (event_date <= habit_end_date)) AND (event_date <= now()) LOOP
            SELECT COUNT(record_id) INTO exist FROM Records WHERE habit_id = id AND due_date = event_date;
            --Raise notice 'habit % date: %         current event date: %', id, habit_end_date, event_date;
            IF exist = 0 THEN
                SELECT random_between(0, 1) INTO complete;
                SELECT random_between(0, 1) INTO on_time;
                SELECT random_between(1, CAST(EXTRACT(HOURS FROM due_time) AS INT) - CAST(EXTRACT(HOURS FROM begin_time) AS INT) + 2) INTO time_spent;
                IF CAST(EXTRACT(HOURS FROM begin_time) AS INT) + time_spent > 24 THEN
                    time_spent = 24 - CAST(EXTRACT(HOURS FROM begin_time) AS INT);
                END IF;
                IF on_time THEN
                    SELECT make_timestamp(CAST(EXTRACT(YEAR FROM event_date) AS INT), CAST(EXTRACT(MONTH FROM event_date) AS INT), CAST(EXTRACT(DAY FROM event_date) AS INT), CAST(EXTRACT(HOURS FROM begin_time) AS INT) + time_spent, CAST(EXTRACT(MINUTE FROM event_date) AS INT), ROUND(CAST(EXTRACT(SECOND FROM event_date) AS INT))) INTO dt_com;
                ELSE
                    SELECT DATE_TRUNC('hour', event_date + (random() * (event_date +'5 days' - event_date)) + '1 days') INTO dt_com;
                END IF;
                
                IF NOT complete THEN
                    SELECT 0 INTO time_spent;
                    SELECT NULL INTO dt_com;
                    SELECT NULL INTO on_time;
                END IF;
                INSERT INTO Records VALUES(DEFAULT, dt_com, event_date, complete, on_time, time_spent, id);
                added := added + 1;
                IF interval IS NOT NULL THEN
                    event_date := event_date + interval;
                    --Raise notice 'adding';
                END IF;
            ELSE
                --Raise notice 'breaking';
                --exit;
                IF interval IS NOT NULL THEN
                    event_date := event_date + interval;
                    --Raise notice 'adding';
                END IF;
            END IF;
        END LOOP;
    END LOOP;
    RETURN added;
END
$$ LANGUAGE plpgsql;