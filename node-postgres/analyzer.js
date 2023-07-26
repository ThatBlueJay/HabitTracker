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
}

class Analyzer {
    constructor() {
        this.records = []
    }

    addRecord(record) {
        this.records.push(record)
    }

    getAverage() {
        let sum = 0
        for(let i = 0; i < this.records.length; i++) {
            if(this.records[i].complete) sum++;
        }
        return sum/this.records.length;
    }
}

module.exports = { Analyzer, Record};