/**
 * <b>Record</b> represents a Record object mirroring an entry from the Record Table
 * <p>
 */
class Record {
  // Abstraction Function:
  // Record, r, represents the record of a table:
  //  r is the node with the ID id, date datedone, date duedate, boolean complete, boolean complete timed, int hours spent, int habit ID
  //
  //
  // Representation Invariant for every Record Table rt:
  // 	Records should have a unique id and timestamp for the due date
  //
  //
  //

  /**
   * Method - Constructor for a Record object
   * @param id id - the id of the record
   * @param timestamp datedone - the date that the record was completed
   * @param timestamp duedate - the assigned due date of the record
   * @param boolean complete - the state of overall completion of the record
   * @param boolean completetimed - the state of timely completion of the record
   * @param int hoursspent - the amount of hours spent on the record past its due time
   * @param int habitid - the corresponding habit ID of the record
   **/
  constructor(
    id,
    datedone,
    duedate,
    complete = false,
    completetimed = false,
    hoursspent = 0,
    habitid
  ) {
    this.id = id;
    this.datedone = datedone;
    this.duedate = duedate;
    this.complete = complete;
    this.completetimed = completetimed;
    this.hoursspent = hoursspent;
    this.habitid = habitid;
  }
  /**
   * Method - Getter for the Record ID
   * @return int - the ID of the Record
   **/
  getid() {
    return this.id;
  }

  /**
   * Method - Calculator for the X position (Time) of the Record given the endpoints
   * @param timestamp start - the starting endpoint for the time
   * @param timestamp end - the ending endpoint for the time
   * @return double - the fraction position of the Record in between the time
   **/
  getX(start, end) {
    const totalTime = end - start;
    const duepos = this.duedate - start;
    const pos = duepos / totalTime;
    return pos;
  }

  /**
   * Method - Calculator for the Y position (Consistency) of the Record
   * @return double - the fraction value of the Consistency Score for the given Record
   **/
  getY() {
    const currentDate = new Date();
    const dueDate = new Date(this.duedate);
    if (this.completetimed) {
      return 1;
    } else if (currentDate > dueDate && !this.complete) {
      return 0;
    } else if (currentDate > dueDate && this.complete && !this.completetimed) {
      if (isNaN(Math.exp(-0.1 * this.hoursspent))) console.log(this.hoursspent);
      return Math.exp(-0.1 * this.hoursspent);
    } else {
      return 0.5;
    }
  }
}
/**
 * <b>Analyzer</b> represents an Analyzer object housing Records and calculating data from them
 * <p>
 * Examples of Analyzer include [], [RecA, RecB]
 */
class Analyzer {
  // Abstraction Function:
  // Analyzer, a, represents the container equal to the collection of records:
  // (0 <= i < size(records)): records
  //
  // Representation Invariant for every Record r:
  // foreach r, 0 <= r < records.size:
  // 		records.contains(id) && records.contains(duedate) && records.contains(complete) && records.contains(completetimed) && records.contains(hoursspent)
  //

  /**
   * Method - Constructor for a Analyzer object
   **/
  constructor() {
    this.records = [];
  }

  /**
   * Method - Push function to add records to the record list of the Analyzer
   * @param Record record - the Record being added to the list
   * @return double - the fraction position of the Record in between the time
   * @modifies records[]
   * @effects records[] - Adds the given Record into the list
   **/
  addRecord(record) {
    this.records.push(record);
  }

  /**
   * Method - Function for finding and returning the Record with the earliest due date
   * @return timestamp - the time of the earliest due date of all the Records in the list
   **/
  getEarliest() {
    if (this.records.length === 0) {
      return null; // Return null if the recordsList is empty
    }

    let earliestRecord = this.records[0].duedate;
    for (let i = 1; i < this.records.length; i++) {
      if (this.records[i].duedate < earliestRecord) {
        earliestRecord = this.records[i].duedate;
      }
    }
    return earliestRecord;
  }

  /**
   * Method - Function for finding and returning the Record with the latest (most recent) due date
   * @return timestamp - the time of the latest due date of all the Records in the list
   **/
  getLatest() {
    if (this.records.length === 0) {
      return null; // Return null if the recordsList is empty
    }
    let latestRecord = this.records[0].duedate;
    for (let i = 1; i < this.records.length; i++) {
      if (this.records[i].duedate > latestRecord) {
        latestRecord = this.records[i].duedate;
      }
    }
    return latestRecord;
  }

  /**
   * Method - Function that makes a map of all the Records with the raw data of their data points
   * @return list[(x,y)] - the map of all datapoints for every Record in the record list
   **/
  getRawData() {
    const start = this.getEarliest();
    const current = new Date();
    const end = Math.min(current, this.getLatest());
    //const end = new Date();
    //console.log(records[0].getX(start, end))
    const pairs = this.records.map((record) => {
      return { x: record.getX(start, end), y: record.getY() };
    });
    return pairs;
  }

  /**
   * Method - Producer of averaged dataset that creates uniformly positioned points and averages data of Records by dynamic range
   * @return list[(Time,Consistency)] - the map of the averaged dataset for the graph
   **/
  getAveragedData() {
    const resultPairs = [];
    for (let position = 0; position <= 1; position += 0.1) {
      const range = 0.05 * (1 + Math.exp(-5 * (position - 0.7)));

      const lowerBound = Math.max(0, position - range / 2);
      const upperBound = Math.min(1, position + range / 2);

      const filteredPairs = this.getRawData().filter((pair) => {
        const pairPosition = pair.x;
        return pairPosition >= lowerBound && pairPosition <= upperBound;
      });

      const totalHours = filteredPairs.reduce((sum, pair) => sum + pair.y, 0);
      const averageHours =
        filteredPairs.length > 0 ? totalHours / filteredPairs.length : 0;

      resultPairs.push({
        Time: position.toFixed(2),
        Consistency: averageHours.toFixed(2),
      });
    }
    return resultPairs;
  }

  /**
   * Method - Simple function for getting the dataset of the given Analyzer object through the procedure
   * @return list[(Time,Consistency)] - the map of the averaged dataset for the graph obtained from the functions
   **/
  getData() {
    const pairs = this.getAveragedData();
    return pairs;
  }
}

module.exports = { Analyzer, Record };
