'use strict'
const childProcess = require('child_process')
const cron = require('node-schedule');
const scriptPath = './mongodb.sh'
const fs = require('fs');
const path = require('path');
const config = JSON.parse(fs.readFileSync(path.join(__dirname, 'config.json')));

console.log('config', config);

/**
 * Credit given to o-o
 * http://stackoverflow.com/questions/3066586/get-string-in-yyyymmdd-format-from-js-date-object
 * Converts a date to the yyyymmdd format
 */

Date.prototype.format = function() {
  var mm = this.getMonth() + 1; // getMonth() is zero-based
  var dd = this.getDate();

  return [this.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join(''); // padding
};

var date = new Date();
date.format();

let filename;

function init(db) {
    var rule = new cron.RecurrenceRule();
    rule.hour = config.hour || 3;
    rule.minute = config.minute || 0;
    var job = cron.scheduleJob(rule, function(){
        // run main every day at the time specified in the rule.
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        console.log("Update started at ["+ (new Date(Date.now())) + "] ");
        console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
        main(db);
    });
}

function main(db) {
    let date = new Date()
    date = date.format() + db;
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("Running Bash Process");
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    childProcess.spawn('bash', [scriptPath, config.db, date])
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
    console.log("Finished");
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++");
}

// main()
init()