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

  const getHours = (id) => {
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
        const list = analyzer.getHours();
        resolve({list});
      })
    })
  } 

  const getData = (query) => {
    return new Promise(function(resolve, reject) { 
      const { ids } = query;

      const habitIds = ids.split(',').map((id) => parseInt(id.trim(), 10));
      /*const habitIds = ids ? ids.split(',').map(Number) : [-1]; */
      pool.query('SELECT * FROM records WHERE habit_id = ANY($1)', [habitIds], (error, results) => {
        if (error) {
          reject(error)
        }
        const analyzer = new Analyzer();
        if(results == null) {
          //resolve([]);
        }
        else {
          for(let i = 0; i < results.rowCount; i++) {
            const rec = new Record(results.rows[i].record_id, results.rows[i].datet_complete, results.rows[i].due_date, results.rows[i].complete, results.rows[i].complete_on_time, results.rows[i].hours_spent, results.rows[i].habit_id);
            analyzer.addRecord(rec);
          }
        }
        const list = analyzer.getData();
        resolve({list});
        
      })
    })
  }

  module.exports = {
    getHabitAverage,
    getHours,
    getData
  }