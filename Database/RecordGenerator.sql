-- Generates records from habits from the beginning of the current month to one week after the end of the 
-- the current month

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

    -- go through each active habit
    FOR id IN SELECT habit_id FROM habits WHERE end_date IS NULL OR curr <= end_date LOOP -- SELECTS ALL Habits that have yet to end by the time this runs
        SELECT start_date INTO event_date FROM Habits WHERE habit_id = id;
        SELECT recurring INTO interval FROM Habits WHERE habit_id = id;
        SELECT end_time INTO due_time FROM Habits WHERE habit_id = id;
        event_date := event_date + due_time;

        -- Get to the current year
        IF(EXTRACT(DAYS FROM curr - event_date) > 365) THEN
            years_to_add := EXTRACT(DAYS FROM curr - event_date) / 365;
            event_date := event_date + CONCAT(CAST(years_to_add AS TEXT), CAST(' years' AS TEXT))::interval;
            --Raise notice 'Added % years to get %', years_to_add, event_date;
        END IF;

        -- Get to the current date
        WHILE (event_date < curr) AND interval IS NOT NULL AND (EXTRACT(YEAR FROM event_date) = EXTRACT(YEAR FROM curr))LOOP
            event_date := event_date + interval;
            --Raise notice 'event date is %', event_date;
        END LOOP;

        -- placing each new Record
        SELECT end_date INTO habit_end_date FROM Habits WHERE habit_id = id;
        IF habit_end_date IS NOT NULL THEN --END DATE NEEDS TO BE A DATE TIME
            habit_end_date := habit_end_date + '1 day'::interval;
        END IF;
        -- Go through the scheduled interval for the current Habit
        WHILE ((habit_end_date IS NULL) OR (event_date <= habit_end_date)) AND ((EXTRACT(MONTH FROM event_date) = EXTRACT(MONTH FROM curr) OR EXTRACT(WEEK FROM event_date) = EXTRACT(WEEK FROM date_trunc('month', curr) + interval '1 month - 1 day')) AND EXTRACT(YEAR FROM event_date) = EXTRACT(YEAR FROM curr)) LOOP
            SELECT COUNT(record_id) INTO exist FROM Records WHERE habit_id = id AND due_date = event_date;
            -- If the required Record doesn't exist, add it
            IF exist = 0 THEN 
                INSERT INTO Records VALUES(DEFAULT, NULL, event_date, FALSE, NULL, 0, id);
                added := added + 1;
                IF interval IS NOT NULL THEN
                    event_date := event_date + interval;
                    --Raise notice 'adding';
                END IF;
            -- Otherwise, up the datetime to be scheduled
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