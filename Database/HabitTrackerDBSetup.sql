
--Starting directory calls
\c postgres
DROP DATABASE IF EXISTS habittracker;
CREATE DATABASE habittracker;
\c habittracker

-- Create database tables

-- User data
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(50) NOT NULL,
    email VARCHAR(250) UNIQUE NOT NULL,
    phone VARCHAR(20) UNIQUE
);

-- Category data -- currently unutilized by the site
CREATE TABLE Class (
    class_id SERIAL PRIMARY KEY,
    name VARCHAR(120) NOT NULL,
    start_time timestamp,
    end_time timestamp,
    end_date timestamp,
    recurring INTERVAL
);

-- Habit data
CREATE TABLE Habits (
    habit_id SERIAL PRIMARY KEY,
    title VARCHAR(280) NOT NULL,
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

-- Record (specific instance of a Habit) data
CREATE TABLE Records (
    record_id SERIAL PRIMARY KEY,
    date_complete timestamp,
    due_date timestamp NOT NULL,
    complete bool NOT NULL,
    complete_on_time bool,
    hours_spent INT NOT NULL,
    habit_id INT NOT NULL,
    FOREIGN KEY (habit_id) REFERENCES Habits(habit_id)
);


-- Run function files into the database
\i C:/GithubProjects/WebProjects/HabitTracker/Database/user_id_getter.sql
\i C:/GithubProjects/WebProjects/HabitTracker/Database/RecordGenerator.sql
\i C:/GithubProjects/WebProjects/HabitTracker/Database/generatorTest.sql


-- Example psql file call
-- \i C:/Users/gordoz2/Dropbox/'PC (2)'/Documents/HabitTracker/Database/HabitTrackerDBSetup.sql