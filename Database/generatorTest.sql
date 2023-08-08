
DELETE FROM RECORDS *;
DELETE FROM HABITS *;
DELETE FROM CLASS *;
DELETE FROM USERS *;

INSERT INTO USERS VALUES(DEFAULT, 'zw27', 'Password1', 'email@email.com', '1234567890');
INSERT INTO USERS VALUES(DEFAULT, 'jay0', 'password', 'Mymail@gmail.com', '1234567899');

-- BEGINNING OF MONTH WEEKLY - 5
INSERT INTO Habits VALUES(DEFAULT, 'Beginning Weekly', 'Hi Mom', '04:00 PM', '06:00 PM', NULL, '1 week', 'July 4, 2023', 'August 15, 2023', user_id_from_name('zw27'), NULL);

-- END OF MONTH WEEKLY - 1
INSERT INTO Habits VALUES(DEFAULT, 'End Weekly - Should be 1', 'Hi Mom', '04:00 AM', '10:00 AM', NULL, '1 week', 'July 26, 2023', 'August 15, 2023', user_id_from_name('jay0'), NULL);

-- DAILY - 16
INSERT INTO Habits VALUES(DEFAULT, 'Middle Daily', 'Hi Mom', '02:00 PM', '03:00 PM', NULL, '1 day', 'June 15, 2023', 'August 15, 2023', user_id_from_name('zw27'), NULL);

-- ONCE A MONTH - 1
INSERT INTO Habits VALUES(DEFAULT, 'Once a Month', 'Hi Mom', '10:00 PM', '11:00 PM', NULL, '1 month', 'June 27, 2023', 'August 15, 2023', user_id_from_name('zw27'), NULL);

SELECT recordgenerator();

-- ONCE A YEAR - 1
INSERT INTO Habits VALUES(DEFAULT, 'Once a year', 'Hi Mom', '02:00 PM', '03:00 PM', NULL, '1 year', 'June 19, 2021', 'August 15, 2023', user_id_from_name('jay0'), NULL);

-- NULL CHECKER - 3
INSERT INTO Habits VALUES(DEFAULT, 'Weekly Null', 'Hi Mom', '12:00 PM', '01:00 PM', NULL, '1 week', 'June 13, 2023', NULL, user_id_from_name('jay0'), NULL);

-- Total 27

SELECT recordgenerator();