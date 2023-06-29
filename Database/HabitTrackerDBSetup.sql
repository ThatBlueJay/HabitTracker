--include interval;

\c postgres
DROP DATABASE IF EXISTS habittracker;
CREATE DATABASE habittracker;
\c habittracker

CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE
);

CREATE TABLE Class (
    class_id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    start_time timestamp,
    end_time timestamp,
    end_date timestamp,
    recurring INTERVAL
);

CREATE TABLE Habits (
    habit_id SERIAL PRIMARY KEY,
    title VARCHAR(280) UNIQUE NOT NULL,
    description VARCHAR(512),
    start_time time,
    end_time time,
    category VARCHAR(100),
    recurring INTERVAL,
    start_date date NOT NULL,
    end_date date,
    user_id INT NOT NULL,
    class_id INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (class_id) REFERENCES Class(class_id)
);

CREATE TABLE Records (
    record_id SERIAL PRIMARY KEY,
    datet_complete timestamp,
    due_date timestamp NOT NULL,
    complete bool NOT NULL,
    complete_on_time bool,
    hours_spent INT NOT NULL,
    habit_id INT NOT NULL,
    FOREIGN KEY (habit_id) REFERENCES Habits(habit_id)
);

-- \i C:/Users/gordoz2/Dropbox/'PC (2)'/Documents/HabitTracker/Database/HabitTrackerDBSetup.sql