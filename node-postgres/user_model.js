const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'habittracker',
  password: 'db',
  port: 5432,
})

const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    const {username, password, email, phone} = body
    pool.query('INSERT INTO users (user_id, username, password, email, phone) VALUES (DEFAULT, $1, $2, $3, $4) RETURNING user_id', [username, password, email, phone], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new user has been added: ${results.rows[0].user_id}`)
    })
  })
}

const deleteUser = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`User deleted with ID: ${id}`)
    })
  })
}

const getUser = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM users WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const authorize = (query) => {
  return new Promise(function(resolve, reject) {
    const {email, password} = query
    pool.query('SELECT user_id FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
      if (error) {
        reject(error)
      }
      else if(results.rowCount < 1) {
        resolve("None")
      }
      else resolve(`${results.rows[0].user_id}`)
    })
  })
}

  
  module.exports = {
    createUser,
    deleteUser,
    getUser,
    authorize,
  }