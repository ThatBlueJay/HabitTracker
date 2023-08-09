DELETE FROM RECORDS *;
DELETE FROM HABITS *;
DELETE FROM CLASS *;
DELETE FROM USERS *;

INSERT INTO USERS VALUES(DEFAULT, 'zw27', 'SmithJohn1', 'smithjohn@gmail.com', '1234567890');
INSERT INTO USERS VALUES(DEFAULT, 'jay0', 'Password1', 'Mymail@gmail.com', '1234567899');

-- BEGINNING OF MONTH WEEKLY - 5
INSERT INTO Habits VALUES(DEFAULT, 'Laundry', 'Hi Mom', '04:00 PM', '06:00 PM', NULL, '1 week', 'July 4, 2020', 'August 15, 2023', user_id_from_name('zw27'), NULL);

-- END OF MONTH WEEKLY - 1
INSERT INTO Habits VALUES(DEFAULT, 'Go to the Bank', 'Hi Mom', '04:00 AM', '10:00 AM', NULL, '1 week', 'July 26, 2020', 'August 15, 2023', user_id_from_name('zw27'), NULL);

-- DAILY - 16
INSERT INTO Habits VALUES(DEFAULT, 'Go to the Gym', 'Hi Mom', '02:00 PM', '03:00 PM', NULL, '1 day', 'June 15, 2020', 'August 15, 2023', user_id_from_name('zw27'), NULL);

-- ONCE A MONTH - 1
INSERT INTO Habits VALUES(DEFAULT, 'Get Haircut', 'Hi Mom', '10:00 PM', '11:00 PM', NULL, '1 month', 'June 27, 2020', 'August 15, 2023', user_id_from_name('zw27'), NULL);

SELECT historygenerator();

-- ONCE A YEAR - 1
INSERT INTO Habits VALUES(DEFAULT, 'See Physician', 'Hi Mom', '02:00 PM', '03:00 PM', NULL, '1 year', 'June 19, 2020', 'August 15, 2023', user_id_from_name('zw27'), NULL);

-- NULL CHECKER - 3
INSERT INTO Habits VALUES(DEFAULT, 'Staff Meeting', 'Hi Mom', '12:00 PM', '01:00 PM', NULL, '1 week', 'June 13, 2020', NULL, user_id_from_name('zw27'), NULL);

-- Total 27

SELECT historygenerator();
SELECT recordgenerator();