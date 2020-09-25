const icon = {
  test: "test"
};

icon.test = () => {
  console.log("icon.test");
};

icon.filter = (iconURL) => {
  let icon;

  const sunny = ["skc", "wind_skc", "hot"];

  const clouds = [
    "few",
    "sct",
    "bkn",
    "ovc",
    "wind_few",
    "wind_sct",
    "wind_bkn",
    "wind_ovc"
  ];

  const rain = ["rain", "rain_showers", "rain_showers_hi"];

  const thunderstorm = [
    "tsra",
    "tsra_sct",
    "tsra_hi",
    "tornado",
    "hurricane",
    "tropical_storm"
  ];

  // ISSUE: doesnt match extreme weather
  // const extreme = ["tornado", "hurricane", "tropical_storm", "blizzard"];

  const snow = [
    "snow",
    "rain_snow",
    "rain_sleet",
    "snow_sleet",
    "fzra",
    "rain_fzra",
    "snow_fzra",
    "sleet",
    "blizzard",
    "cold"
  ];

  const fog = ["fog", "haze", "smoke", "dust"];

  // ISSUE: if two icons are designated it just matches the second
  let iconRegexp = /(day\/|night\/)(.*)(\?)/g;
  let urlStrings = iconRegexp
    .exec(iconURL)
    .filter((string) => !string.includes("day"))
    .filter((string) => !string.includes("night"))
    .filter((string) => !string.includes("?"));

  let matchs = urlStrings.map(item => item.split('/'));
  let flatMatchs = [].concat(...matchs);

  flatMatchs.forEach((item) => {
    let match = item.replace(/\,[0-9]*/g, '');
    
    if (sunny.includes(match)) {
      // skc - Clear Sky
      icon = "skc";
    } else if (clouds.includes(match)) {
      if (match.toLowerCase().includes("few")) {
        // few - Few Clouds
        // "few", "wind_few"
        icon = "few";
      } else if (match.toLowerCase().includes("sct")) {
        // sct - Scattered Clouds
        // "sct", "wind_sct"
        icon = "sct";
      } else {
        // bkn - Broken Clouds
        // "bkn", "ovc", "wind_bkn", "wind_ovc"
        icon = "bkn";
      }
    } else if (rain.includes(match)) {
      // rain_showers - Rain Showers
      // rain - Rain
      match === "rain_showers" ? (icon = "rain_showers") : (icon = "rain");
    } else if (thunderstorm.includes(match)) {
      // tsra - thunderstorm
      icon = "tsra";
    } else if (snow.includes(match)) {
      // snow - Snow
      icon = "snow";
    } else if (fog.includes(match)) {
      // fog - Fog, Haze, Smoke, Dust
      icon = "fog";
    } else {
      icon = undefined;
    }
  });
  return icon;
};

export { icon };
