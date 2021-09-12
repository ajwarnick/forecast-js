const Moon = {
  test: "test",

  echo: () => {
    console.log("echo");
  },

  // Original Snippet: https://gist.github.com/endel/dfe6bb2fbe679781948c
  phase: (year, month, day) => {
    var c = 0;
    var e = 0;
    var jd = 0;
    var b = 0;

    if (month < 3) {
      year--;
      month += 12;
    }

    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; // jd is total days elapsed
    jd /= 29.5305882; // divide by the moon cycle
    b = parseInt(jd, 10); // int(jd) -> b, take integer part of jd
    jd -= b; // subtract integer part to leave fractional part of original jd
    b = Math.round(jd * 8); // scale fraction from 0-8 and round

    if (b >= 8) b = 0; // 0 and 8 are the same so turn 8 into 0

    switch (b) {
      case 0:
        return "new-moon";
      // break;
      case 1:
        return "waxing-crescent-moon";
      // break;
      case 2:
        return "quarter-moon";
      // break;
      case 3:
        return "waxing-gibbous-moon";
      // break;
      case 4:
        return "full-moon";
      // break;
      case 5:
        return "waning-gibbous-moon";
      // break;
      case 6:
        return "last-quarter-moon";
      // break;
      case 7:
        return "waning-crescent-moon";
      // break;
      default:
      // do nothing
    }
  },

  map: (value, x1, y1, x2, y2) => ((value - x1) * (y2 - x2)) / (y1 - x1) + x2,

  simple: (year, month, day) => {
    var lp = 2551443;
    var now = new Date(year, month - 1, day, 20, 35, 0);
    var new_moon = new Date(1970, 0, 7, 20, 35, 0);
    var phase = ((now.getTime() - new_moon.getTime()) / 1000) % lp;
    var mapped = Moon.map(Math.floor(phase / (24 * 3600)) + 1, 0, 29.5, 0, 7);
    // return Math.floor(phase /(24*3600)) + 1;

    switch (Math.round(mapped)) {
      case 0:
        return {class: "new-moon", name: "New Moon"}
      case 1:
        return {class: "waxing-crescent-moon", name: "Waxing Crescent Moon"}
      case 2:
        return {class: "quarter-moon", name: "Quarter Moon"}
      case 3:
        return {class: "waxing-gibbous-moon", name: "Waxing Gibbous Moon"}
      case 4:
        return {class: "full-moon", name: "Full Moon"}
      case 5:
        return {class: "waning-gibbous-moon", name: "Waning Gibbous Moon"}
      case 6:
        return {class: "last-quarter-moon", name: "Last Quarter Moon"}
      case 7:
        return {class: "waning-crescent-moon", name: "Waning Crescent Moon"}
      default:
      // do nothing
    }
  }
};

// Moon.phase('2018', '01', '19');
export { Moon };
