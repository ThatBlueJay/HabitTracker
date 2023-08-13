const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "habittracker",
  password: "db",
  port: 5432,
});

/**
 * Method - Create a habit given information and add them to the Habit table in the database
 * @param String title - the title of the habit
 * @param String description - the description of the habit
 * @param time start_time - the starting time of the habit
 * @param time end_time - the ending time of the habit
 * @param String category - the category of the habit
 * @param INTERVAL recurring - the recurrance rate of the habit
 * @param timestamp start_date - the starting date of the habit
 * @param timestamp end_date - the ending date of the habit
 * @param id user_id - the user id of the User who owns this habit
 * @modifies Habit Table
 * @effects Habit Table - Adds the created habit into the database
 **/
const createHabit = (body) => {
  return new Promise(function (resolve, reject) {
    const {
      title,
      description,
      start_time,
      end_time,
      category,
      recurring,
      start_date,
      end_date,
      user_id,
    } = body;
    pool.query(
      "INSERT INTO habits VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, null) RETURNING habit_id",
      [
        title,
        description,
        start_time,
        end_time,
        category,
        recurring,
        start_date,
        end_date,
        user_id,
      ],
      (error, results) => {
        if (error) {
          reject(error);
        }
        pool.query("SELECT recordGenerator()", (error, rez) => {
          if (error) {
            reject(error);
          }
          if (results == null) {
            resolve(`${-1}`);
          } else if (results.rowCount < 1) {
            resolve(`${-1}`);
          } else resolve(`${results.rows[0].habit_id}`);
        });
      }
    );
  });
};

/**
 * Method - Deletes the habit of the given ID
 * @param int id - the id of the habit
 * @modifies Habit Table
 * @effects Habit Table - Delete the habit of this ID
 * @return String - the name of the habit being removed
 **/
const deleteHabit = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT title FROM habits WHERE habit_id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        const name = results.rows[0].title;
        //First delete all the records associated with the habit
        pool.query(
          "DELETE FROM records WHERE habit_id = $1",
          [id],
          (error, rez) => {
            if (error) {
              reject(error);
            }
            //Then we can delete the habit itself
            pool.query(
              "DELETE FROM habits WHERE habit_id = $1",
              [id],
              (error, results) => {
                if (error) {
                  reject(error);
                }
                resolve(`${name}`);
              }
            );
          }
        );
      }
    );
  });
};

/**
 * Method - Obtain the list of all habits owned by a user
 * @param int id - the id of the user who we want to get the habits of
 * @return Habit[] - the list of all habits owned by the given user if exists, if not then -1
 **/
const getHabit = (id) => {
  return new Promise(function (resolve, reject) {
    if (id == null) resolve(`${-1}`);
    pool.query(
      "SELECT * FROM habits WHERE user_id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results == null) resolve(`${-1}`);
        else if (results.rowCount < 1) {
          resolve(`${-1}`);
        } else resolve(results.rows);
      }
    );
  });
};

/**
 * Method - Get all the Record instances of a given habit between the given timeframe
 * @param int id - the id of the habit
 * @param timestamp begin - the starting time for the time frame
 * @param timestamp end - the ending time for the time frame
 * @return Record[] - the list of all records derived from the given habit in the time frame
 **/
const getCurrentHabits = (query) => {
  return new Promise(function (resolve, reject) {
    const { id, begin, end } = query;

    pool.query(
      "SELECT * FROM records WHERE due_date >= $1 AND due_date < $2 AND habit_id = $3",
      [begin, end, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        for(var i = 0; i < results.rowCount; i++) {
          //Offsetting the timezone from UTC to EST to return proper current due dates in the results
          var offset = 4 * 60 * 60 * 1000;
          var current = results.rows[i].due_date.getTime();
          results.rows[i].due_date = new Date(current - offset);
          
        }
        resolve(results.rows);
      }
    );
  });
};

/**
 * Method - Confirms a given Record of a Habit, filling in the details based on the time at which this API function is called
 * @param int id - the id of the Record
 * @modifies Record Table
 * @effects Record Table - Modifies the attributes of the corresponding Record with completion, marking values as appropriate
 * @return int - the id of the Record
 **/
const confirmHabit = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT due_date FROM records WHERE record_id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        var today = new Date();
        if (results == null) {
          resolve(`${-1}`);
        } else if (results.rowCount < 1) {
          resolve(`${-1}`);
        }
        //Habit should be complete regardless since the API function is called.
        pool.query(
          "UPDATE records set complete = true where record_id = $1",
          [id],
          (err, rests) => {
            if (err) {
              reject(err);
            }
          }
        );
        //Set the date complete to the current date.
        pool.query(
          "UPDATE records set datet_complete = $2 where record_id = $1",
          [id, today],
          (err, rests) => {
            if (err) {
              reject(err);
            }
          }
        ); 
        //Set the hours spent to be the hours between the current time and the time of the due date timestamp
        pool.query(
          "UPDATE records set hours_spent = $2 where record_id = $1",
          [
            id,
            Math.abs(
              Math.round(
                (today.getTime() - results.rows[0].due_date.getTime()) /
                  1000 /
                  (60 * 60)
              )
            ),
          ],
          (err, rests) => {
            if (err) {
              reject(err);
            }
          }
        );
        //If the current date is earlier than the due date, then the record was complete on time. if not it wasnt.
        if (results.rows[0].due_date.getTime() > today.getTime()) {
          pool.query(
            "UPDATE records set complete_on_time = true where record_id = $1; ",
            [id],
            (err, rests) => {
              if (err) {
                reject(err);
              }
            }
          );
        } else {
          pool.query(
            "UPDATE records set complete_on_time = false where record_id = $1",
            [id],
            (err, rests) => {
              if (err) {
                reject(err);
              }
            }
          );
        }
        resolve(`${id}`);
      }
    );
  });
};

/**
 * Method - Call the Record Generator on the database to generate records
 * @modifies Record Table
 * @effects Record Table - Runs the recordGenerator() which then promptly creates Record instances of all habits as appropriate
 * @return String - Simple confirmation message
 **/
const generateRecords = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT recordGenerator()", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve("Generated new set of records for the future");
    });
  });
};

module.exports = {
  createHabit,
  deleteHabit,
  getHabit,
  getCurrentHabits,
  confirmHabit,
  generateRecords,
};
