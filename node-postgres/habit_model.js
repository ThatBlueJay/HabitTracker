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
    const {title, description, start_time, end_time, category, recurring, start_date, end_date, user_id} = body
    pool.query('INSERT INTO habits VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, null) RETURNING habit_id', [title, description, start_time, end_time, category, recurring, start_date, end_date, user_id], (error, results) => {
      if (error) {
        reject(error)
      }
      //resolve(`A new habit has been added with ID:!`)
      pool.query('SELECT recordGenerator()', (error, rez) => {
        if (error) {
          reject(error)
        }
        if(results == null) {
          resolve(`${-1}`)
        }
        else if(results.rowCount < 1) {
          resolve(`${-1}`)
        }
        else resolve(`${results.rows[0].habit_id}`)
      })
      
    })
  })
}

const deleteHabit = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT title FROM habits WHERE habit_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      const name = results.rows[0].title
      pool.query('DELETE FROM records WHERE habit_id = $1', [id], (error, rez) => {
        if (error) {
          reject(error)
        }
        pool.query('DELETE FROM habits WHERE habit_id = $1', [id], (error, results) => {
          if (error) {
            reject(error)
          }
          resolve(`${name}`)
        })
      })
    })
    
  })
}

const getHabit = (id) => {
  return new Promise(function(resolve, reject) {
    if(id == null) resolve(`${-1}`)
    pool.query('SELECT * FROM habits WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      if(results == null) resolve(`${-1}`)
      else if(results.rowCount < 1) {
        resolve(`${-1}`)
      }
      else resolve(results.rows);
    })
  }) 
}

const getCurrentHabits = (query) => {
  return new Promise(function(resolve, reject) {
    const {id, begin, end} = query
    pool.query('SELECT * FROM records WHERE due_date >= $1 AND due_date < $2 AND habit_id = $3', [begin, end, id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results.rows);
    })

  })
}

const confirmHabit = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT due_date FROM records WHERE record_id = $1' , [id], (error, results) => {
      if (error) {
        reject(error)
      }
      var today = new Date();
      if(results == null) {
        resolve(`${-1}`)
      }
      else if(results.rowCount < 1) {
        resolve(`${-1}`)
      }
      pool.query('UPDATE records set complete = true where record_id = $1', [id], (err, rests) => {
        if (err) {
          reject(err)
        }
      }) 
      console.log(Math.abs(Math.round(((today.getTime() - results.rows[0].due_date.getTime()) / 1000) / (60*60))))
      pool.query('UPDATE records set datet_complete = $2 where record_id = $1', [id, today], (err, rests) => {
        if (err) {
          reject(err)
        }
        
      })
      pool.query('UPDATE records set hours_spent = $2 where record_id = $1', [id, Math.abs(Math.round(((today.getTime() - results.rows[0].due_date.getTime()) / 1000) / (60*60)))], (err, rests) => {
        if (err) {
          reject(err)
        }
        
      })
      if(results.rows[0].due_date.getTime() > today.getTime()) {
        pool.query('UPDATE records set complete_on_time = true where record_id = $1; ', [id], (err, rests) => {
          if (err) {
            reject(err)
          }
          
        })
      }
      else {
        pool.query('UPDATE records set complete_on_time = false where record_id = $1', [id], (err, rests) => {
          if (err) {
            reject(err)
          }
        })
      }
      resolve(`${id}`)
    })
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