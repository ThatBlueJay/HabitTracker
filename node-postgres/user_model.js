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
      if(results == null) {
        resolve(`${-1}`)
      }
      else if(results.rowCount < 1) {
        resolve(`${-1}`)
      }
      else resolve(`${results.rows[0].user_id}`)
    })
  })
}

const deleteUser = (id) => {
  return new Promise(function(resolve, reject) {
    if(id == null) resolve(`${-1}`)
    pool.query('DELETE FROM users WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`${id}`)
    })
  })
}

const getUser = (id) => {
  return new Promise(function(resolve, reject) {
    if(id == null) resolve(`${-1}`)
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
    if(email == null || password == null) resolve(`${-1}`)
    pool.query('SELECT user_id FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
      if (error) {
        reject(error)
      }
      else if(results.rowCount < 1) {
        resolve(`${-1}`)
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