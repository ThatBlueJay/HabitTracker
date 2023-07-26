const {Analyzer, Record} = require('./analyzer');

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'habittracker',
  password: 'db',
  port: 5432,
});

const getHabitAverage = (id) => {
    return new Promise(function(resolve, reject) {
      pool.query('SELECT * FROM records WHERE habit_id = $1', [id], (error, results) => {
        if (error) {
          reject(error)
        }
        const analyzer = new Analyzer();
        for(let i = 0; i < results.rowCount; i++) {
            const rec = new Record(results.rows[i].record_id, results.rows[i].datet_complete, results.rows[i].due_date, results.rows[i].complete, results.rows[i].complete_on_time, results.rows[i].hours_spent, results.rows[i].habit_id);
            analyzer.addRecord(rec);
        }
        console.log(analyzer.getAverage())
        resolve(results.rows);
      })
    }) 
  }


  module.exports = {
    getHabitAverage,
  }