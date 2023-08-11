const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "habittracker",
  password: "db",
  port: 5432,
});

/**
 * Method - Create a user given information and add them to the User table in the database
 * @param String username - the username of the user
 * @param String password - the password of the user
 * @param String email - the email of the user
 * @param String password - the phone of the user
 * @modifies User Table
 * @effects User Table - Add this new user into the database
 **/
const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { username, password, email, phone } = body;
    pool.query(
      "INSERT INTO users (user_id, username, password, email, phone) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING user_id",
      [username, password, email, phone],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (results == null) {
          resolve(`${-1}`);
        } else if (results.rowCount < 1) {
          resolve(`${-1}`);
        } else resolve(`${results.rows[0].user_id}`);
      }
    );
  });
};

/**
 * Method - Deletes the user of the given ID
 * @param int id - the id of the user
 * @modifies User Table
 * @effects User Table - Delete the user of this ID
 **/
const deleteUser = (id) => {
  return new Promise(function (resolve, reject) {
    if (id == null) resolve(`${-1}`);
    pool.query(
      "DELETE FROM users WHERE user_id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`${id}`);
      }
    );
  });
};

/**
 * Method - Returns the User entry with the given ID of said User
 * @param int id - the ID of the user
 * @return User - Full entry of the user with the given ID
 **/
const getUser = (id) => {
  return new Promise(function (resolve, reject) {
    if (id == null) resolve(`${-1}`);
    pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

/**
 * Method - Confirm if a user exists with the given credentials and if so return what that User's ID is
 * @param String email - the email of the user
 * @param String password - the password of the user
 * @return int - If the email and password correspond to a user, return the ID of said user.
 *    If there is no corresponding user, return -1
 **/
const authorize = (query) => {
  return new Promise(function (resolve, reject) {
    const { email, password } = query;
    if (email == null || password == null) resolve(`${-1}`);
    pool.query(
      "SELECT user_id FROM users WHERE email = $1 AND password = $2",
      [email, password],
      (error, results) => {
        //console.log("ROWS:", results.rowCount);
        if (error) {
          reject(error);
        } else if (results.rowCount < 1) {
          //console.log("API Called me");
          resolve(`${-1}`);
        } else resolve(`${results.rows[0].user_id}`);
      }
    );
  });
};

module.exports = {
  createUser,
  deleteUser,
  getUser,
  authorize,
};
