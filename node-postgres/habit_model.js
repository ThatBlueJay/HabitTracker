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

const deleteHabit = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM habits WHERE habit_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Habit deleted with ID: ${id}`)
    })
  })
}

const getHabit = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM habits WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })
  }) 
}

const getCurrentHabits = (body) => {
  return new Promise(function(resolve, reject) {
    const {id, begin, end} = body
    pool.query('SELECT * FROM records WHERE due_date >= $2 AND due_date < $3 AND habit_id = $1', [id, begin, end], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.row);
    })

  })
}

const confirmHabit = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT due_date FROM records WHERE record_id = $1') , [id], (error, results) => {
      if (error) {
        reject(error)
      }
      pool.query('UPDATE records set complete = true where record_id = $1; UPDATE records set date_complete = $2; where record_id = $1; UPDATE records set hours_spent = $3' [id, Date.now, Math.abs(Math.round((Date.now.getTime() - results.getTime()) / 100) / (60*60))], (err, rests) => {
        if (err) {
          reject(err)
        }
  
      }) 
      if(results < Date.now) {
        pool.query(' UPDATE records set complete_on_time = true where record_id = $1; ', (err, rests) => {
          if (err) {
            reject(err)
          }
          
        })
      }
      else {
        pool.query('UPDATE records set complete_on_time = false where record_id = $1', (err, rests) => {
          if (err) {
            reject(err)
          }
        })
      }
    }

    resolve(`Record marked as complete: ${id}`)
  }) 
}

const generateRecords = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT recordGenerator()', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve('Generated new set of records for the future');
    })

  })
}

  
  module.exports = {
    createHabit,
    deleteHabit,
    getHabit,
    getCurrentHabits,
    confirmHabit,
    generateRecords,
  }