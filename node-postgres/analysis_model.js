const { Analyzer, Record } = require("./analyzer");

const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "habittracker",
  password: "db",
  port: 5432,
});

/**
 * Method - Provides the set of data points to build the Analytics graph given the IDs of the habits we want to analyze
 * @param int[] ids - the list of all IDs we want to get the data from
 * @return list[(Time, Consistency)] - the list (map) of datapoints for the graph that represents the consistency of the habits given
 **/
const getData = (query) => {
  return new Promise(function (resolve, reject) {
    const { ids } = query;

    const habitIds = ids.split(",").map((id) => parseInt(id.trim(), 10));
    /*const habitIds = ids ? ids.split(',').map(Number) : [-1]; */
    pool.query(
      "SELECT * FROM records WHERE habit_id = ANY($1)",
      [habitIds],
      (error, results) => {
        if (error) {
          reject(error);
        }
        const analyzer = new Analyzer();
        if (results == null) {
        } else {
          //Create custom Record objects for all the record entries we're gathering from the database using its data
          for (let i = 0; i < results.rowCount; i++) {
            const rec = new Record(
              results.rows[i].record_id,
              results.rows[i].datet_complete,
              results.rows[i].due_date,
              results.rows[i].complete,
              results.rows[i].complete_on_time,
              results.rows[i].hours_spent,
              results.rows[i].habit_id
            );
            //Place those new Record objects in thw analyzer object.
            analyzer.addRecord(rec);
          }
        }
        //With the records now inside, call the function to retrieve the datapoints and return them.
        const list = analyzer.getData();
        resolve({ list });
      }
    );
  });
};

module.exports = {
  getData,
};
