class Record {
    constructor(id, datedone, duedate, complete, completetimed, hoursspent, habitid) {
        this.id = id;
        this.datedone = datedone;
        this.duedate = duedate;
        this.complete = complete;
        this.completetimed = completetimed;
        this.hoursspent = hoursspent;
        this.habitid = habitid;
    }
    getid() {
        return this.id;
    }

    getX(start, end) {
        const totalTime = end - start;
        const duepos = this.duedate - start;
        const pos = duepos / totalTime;
        return pos;
    }

    getY() {
        const currentDate = new Date();
        const dueDate = new Date(this.duedate)
        if(this.completetimed) {
            return 1;
        }
        else if(currentDate > dueDate && !this.complete) {
            return 0;
        }
        else if (currentDate > dueDate && this.complete && !this.completetimed) {
            return Math.exp(-0.1 * this.hours);
        }
        else {
            return 0.5;
        }
    }
}

class Analyzer {
    constructor() {
        this.records = []
    }

    addRecord(record) {
        this.records.push(record)
    }

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

    getAverage() {
        let sum = 0
        for(let i = 0; i < this.records.length; i++) {
            if(this.records[i].complete) sum++;
        }
        return sum/this.records.length;
    }

    getHours() {
        const pairs = this.records.map((record) => {
            return {x: record.duedate, y: record.hoursspent};
        });
        return pairs;
    }

    getRawData() {
        const start = this.getEarliest()
        const end = this.getLatest()
        //console.log(records[0].getX(start, end))
        const pairs = this.records.map((record) => {
            return {x: record.getX(start, end), y: record.getY()};
        });
        return pairs;
    }

    getAveragedData() {
        const resultPairs = [];
        for(let position  = 0; position  <= 1; position  += 0.1) {

            const range = 0.05 * (1 - position ** 2) + 0.01;

            const lowerBound = Math.max(0, position - range);
            const upperBound = Math.min(1, position + range);

            const filteredPairs = this.getRawData().filter((pair) => {
                const pairPosition = pair.x;
                return pairPosition >= lowerBound && pairPosition <= upperBound;
            });

            const totalHours =filteredPairs.reduce((sum, pair) => sum + pair.y, 0);
            const averageHours = filteredPairs.length > 0 ? totalHours / filteredPairs.length : 0;

            resultPairs.push({
                Time: position.toFixed(2),
                Consistency: averageHours.toFixed(2),
            });
        }
        return resultPairs;
    }

    getData() {
        const pairs = this.getAveragedData();
        return pairs;
    }


}

module.exports = { Analyzer, Record};