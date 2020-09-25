const Ute = {
  formatDate: function (date, format, utc) {
    var MMMM = [
      "\x00",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    var MMM = [
      "\x01",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];
    var dddd = [
      "\x02",
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    var ddd = ["\x03", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    function ii(i, len) {
      var s = i + "";
      len = len || 2;
      while (s.length < len) s = "0" + s;
      return s;
    }

    var y = utc ? date.getUTCFullYear() : date.getFullYear();
    format = format.replace(/(^|[^\\])yyyy+/g, "$1" + y);
    format = format.replace(/(^|[^\\])yy/g, "$1" + y.toString().substr(2, 2));
    format = format.replace(/(^|[^\\])y/g, "$1" + y);

    var M = (utc ? date.getUTCMonth() : date.getMonth()) + 1;
    format = format.replace(/(^|[^\\])MMMM+/g, "$1" + MMMM[0]);
    format = format.replace(/(^|[^\\])MMM/g, "$1" + MMM[0]);
    format = format.replace(/(^|[^\\])MM/g, "$1" + ii(M));
    format = format.replace(/(^|[^\\])M/g, "$1" + M);

    var d = utc ? date.getUTCDate() : date.getDate();
    format = format.replace(/(^|[^\\])dddd+/g, "$1" + dddd[0]);
    format = format.replace(/(^|[^\\])ddd/g, "$1" + ddd[0]);
    format = format.replace(/(^|[^\\])dd/g, "$1" + ii(d));
    format = format.replace(/(^|[^\\])d/g, "$1" + d);

    var H = utc ? date.getUTCHours() : date.getHours();
    format = format.replace(/(^|[^\\])HH+/g, "$1" + ii(H));
    format = format.replace(/(^|[^\\])H/g, "$1" + H);

    var h = H > 12 ? H - 12 : H == 0 ? 12 : H;
    format = format.replace(/(^|[^\\])hh+/g, "$1" + ii(h));
    format = format.replace(/(^|[^\\])h/g, "$1" + h);

    var m = utc ? date.getUTCMinutes() : date.getMinutes();
    format = format.replace(/(^|[^\\])mm+/g, "$1" + ii(m));
    format = format.replace(/(^|[^\\])m/g, "$1" + m);

    var s = utc ? date.getUTCSeconds() : date.getSeconds();
    format = format.replace(/(^|[^\\])ss+/g, "$1" + ii(s));
    format = format.replace(/(^|[^\\])s/g, "$1" + s);

    var f = utc ? date.getUTCMilliseconds() : date.getMilliseconds();
    format = format.replace(/(^|[^\\])fff+/g, "$1" + ii(f, 3));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])ff/g, "$1" + ii(f));
    f = Math.round(f / 10);
    format = format.replace(/(^|[^\\])f/g, "$1" + f);

    var T = H < 12 ? "AM" : "PM";
    format = format.replace(/(^|[^\\])TT+/g, "$1" + T);
    format = format.replace(/(^|[^\\])T/g, "$1" + T.charAt(0));

    var t = T.toLowerCase();
    format = format.replace(/(^|[^\\])tt+/g, "$1" + t);
    format = format.replace(/(^|[^\\])t/g, "$1" + t.charAt(0));

    var tz = -date.getTimezoneOffset();
    var K = utc || !tz ? "Z" : tz > 0 ? "+" : "-";
    if (!utc) {
      tz = Math.abs(tz);
      var tzHrs = Math.floor(tz / 60);
      var tzMin = tz % 60;
      K += ii(tzHrs) + ":" + ii(tzMin);
    }
    format = format.replace(/(^|[^\\])K/g, "$1" + K);

    var day = (utc ? date.getUTCDay() : date.getDay()) + 1;
    format = format.replace(new RegExp(dddd[0], "g"), dddd[day]);
    format = format.replace(new RegExp(ddd[0], "g"), ddd[day]);

    format = format.replace(new RegExp(MMMM[0], "g"), MMMM[M]);
    format = format.replace(new RegExp(MMM[0], "g"), MMM[M]);

    format = format.replace(/\\(.)/g, "$1");

    return format;
  },

  getDayOfWeek: function (date) {
    var dayOfWeek = new Date(date).getDay();
    return isNaN(dayOfWeek)
      ? null
      : [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ][dayOfWeek];
  },

  to12Hours: function(hour) { 
    return (hour + 24) % 12 || 12; 
  },

  zeroPadding: function (num, digit) {
    var zero = "";
    for (var i = 0; i < digit; i++) {
      zero += "0";
    }
    return (zero + num).slice(-digit);
  },

  getURLparam: function (param) {
    const url = window.location;
    const urlObject = new URL(url);
    const id = urlObject.searchParams.get(param);
    return id;
  },

  updateURLparam: function (param, value) {
    console.log(Ute.urlParams.has(param));
  },
  kelvinToFahrenheit: function (tempK) {
    // Convert from Kelvin to Fahrenheit
    //T(°F) = T(K) × 9/5 - 459.67
    let tempF = parseInt(tempK * 1.8 - 459.67, 10);
    return tempF;
  },

  celsiusToFahrenheit: function (tempC) {
    let tempF = parseInt(tempC * 1.8 + 32);
    return tempF;
  },

  metersToMiles: function (meters) {
    let miles = meters * 0.00062137;
    return miles;
  },

  metersToInches: function (meters) {
    let inches = meters / 0.0254;
    return inches;
  },

  milesToKilometers: function (miles) {
    let km = miles * 1.609344;
    return km;
  },

  kmPerHourToMiles: function (kmph) {
    let mph = kmph * 0.62137;
    return mph;
  },

  milesPerHourtoKM: function (mph) {
    let kmph = mph * 1.609344;
    return kmph;
  },

  pascalToPSI: function (pa) {
    let psi = pa / 6894.75729;
    return psi;
  },

  pascalToBar: function (pa) {
    // let bar = Pa / 100000;
    let bar = pa / 1e5;
    return bar;
  },

  pascalToInchesH20: function (pa) {
    let inches = pa * 0.0040147421331128;
    inches = Math.max(Math.round(inches * 10) / 10, 2.8).toFixed(2);
    return inches;
  },

  degToCardinal: function (deg) {
    const dirs = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW"
    ];
    let ix = Math.round(deg / (360 / dirs.length));
    return dirs[ix % dirs.length];
  },

  titleCase: (str) => {
    str = str.toLowerCase();
    str = str.split(" ");

    for (var i = 0, x = str.length; i < x; i++) {
        str[i] = str[i][0].toUpperCase() + str[i].substr(1);
    }

    return str.join(" ");

  }
};

export { Ute };
