const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'habittracker',
  password: 'db',
  port: 5432,
});

const createHabit = (body) => {
  return new Promise(function(resolve, reject) {
    const {habit_id, title, description, start_time, end_time, category, recurring, end_date, user_id, class_id} = body
    pool.query('INSERT INTO habits (habit_id, title, description, start_time, end_time, category, recurring, end_date, user_id, class_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *', [habit_id, title, description, start_time, end_time, category, recurring, end_date, user_id, class_id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`A new habit has been added added: ${results.rows[0]}`)
    })
  })
}

const deleteHabit = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('DELETE FROM habits WHERE habit_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Habit deleted with ID: ${id}`)
    })
  })
}

const getHabit = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM habits WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getCurrentHabits = () => {
  return new Promise(function(resolve, reject) {
    const id = parseInt(request.params.id)
    pool.query('SELECT * FROM records WHERE due_date >= (LAST_DAY(NOW()) + INTERVAL 1 DAY - INTERVAL 1 MONTH) AND due_date < (LAST_DAY(NOW()) + INTERVAL 1 DAY) AND habit_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.row);
    })

  })
}

  
  module.exports = {
    createHabit,
    deleteHabit,
    getHabit,
    getCurrentHabits,
  }