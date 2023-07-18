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
    const {user_id, username, password, email, phone} = body
    pool.query('INSERT INTO users (user_id, username, password, email, phone) VALUES ($1, $2, $3, $4, $5) RETURNING *', [user_id, username, password, email, phone], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new user has been added: ${results.rows[0].id}`)
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

  
  module.exports = {
    createUser,
    deleteUser,
    getUser,
  }