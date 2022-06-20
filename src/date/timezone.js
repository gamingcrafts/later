/**
* Timezone
* (c) 2013 Bill, BunKat LLC.
*
* Configures helper functions to switch between useing local time and UTC. Later
* uses UTC time by default.
*
* Later is freely distributable under the MIT license.
* For all details and documentation:
*     http://github.com/bunkat/later
*/
const moment = require('moment-timezone');

later.date.timezone = function(useLocalTime, timezone) {

  // configure the date builder used to create new dates in the right timezone
  if (useLocalTime) { 
    if (timezone) {
      later.date.build = function(Y, M, D, h, m, s) {
        return moment.tz([Y, M, D, h, m, s], timezone).toDate();
      }
    } else {
      later.date.build = function(Y, M, D, h, m, s) { return new Date(Y, M, D, h, m, s); }
    }
  } else {
    later.date.build = function(Y, M, D, h, m, s) { return new Date(Date.UTC(Y, M, D, h, m, s)); };
  }

  // configure the accessor methods
  var get = useLocalTime ? 'get' : 'getUTC',
      d = Date.prototype;

  later.date.getYear = d[get + 'FullYear'];
  later.date.getMonth = d[get + 'Month'];
  later.date.getDate = d[get + 'Date'];
  later.date.getDay = d[get + 'Day'];
  later.date.getHour = d[get + 'Hours'];
  later.date.getMin = d[get + 'Minutes'];
  later.date.getSec = d[get + 'Seconds'];

  // set the isUTC flag
  later.date.isUTC = !useLocalTime;
};

// friendly names for available timezones
later.date.UTC = function() { later.date.timezone(false); };
later.date.localTime = function(timezone) { later.date.timezone(true, timezone); };

// use UTC by default
later.date.UTC();