const PORT = 443;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const cors = require('cors');
app.use(cors());

const url = 'https://favershamweather.org/pwsWD/index.php';

app.get('/', (req, res) => {
  res.json('This is my webscraper');
});

app.get('/data', (req, res) => {
  axios(url).then((response) => {
    const html = response.data;
    const $ = cheerio.load(html);
    const weather = [];
    const currentTempObject = {};
    const currentWindObject = {};
    const forecast = $('#positionlast > div').text();
    const currentTemp = $(
      '#position11 > div.PWS_module_content > div.PWS_middle > div > div > b:nth-child(1)'
    ).text();
    const highTemp = $(
      '#position11 > div.PWS_module_content > div.PWS_middle > div > div > b:nth-child(3)'
    ).text();
    const lowTemp = $(
      '#position11 > div.PWS_module_content > div.PWS_middle > div > div > b:nth-child(4)'
    ).text();
    const feelsLike = $(
      '#position11 > div.PWS_module_content > div.PWS_right > div:nth-child(1) > b'
    ).text();
    const currentHumidity = $(
      '#position11 > div.PWS_module_content > div.PWS_left > div:nth-child(3) > b'
    ).text();
    const currentDewpoint = $(
      '#position11 > div.PWS_module_content > div.PWS_right > div:nth-child(3) > b'
    ).text();
    const currentSky = $(
      '#position13 > table > tbody > tr:nth-child(1) > td:nth-child(2)'
    ).text();
    const currentWindSpeed = $(
      '#position21 > div.PWS_module_content > div.PWS_middle > div.narrow > table > tbody > tr:nth-child(1) > td:nth-child(1)'
    ).text();
    const currentWindGust = $(
      '#position21 > div.PWS_module_content > div.PWS_middle > div.narrow > table > tbody > tr:nth-child(1) > td:nth-child(2) > b'
    ).text();
    const currentWindDirection = $(
      '#position21 > div.PWS_module_content > div.PWS_left > div:nth-child(3) > b'
    ).text();
    const currentUV = $(
      '#position14 > div.PWS_module_content > div.PWS_middle > div.PWS_bar > div'
    ).text();
    const currentPressure = $(
      '#position22 > div.PWS_module_content > div.PWS_middle > div.narrow > span'
    ).text();

    const lastHourRainFall = $(
      '#position31 > div.PWS_module_content > div.PWS_right > div:nth-child(1) > b'
    ).text();

    const airQuality = $('#position33 > div.PWS_middle > b').text();

    const currentImage = $('#position44 > a > img').attr('src');

    currentTempObject.temp = currentTemp;
    currentTempObject.humidity = currentHumidity;
    currentTempObject.dewpoint = currentDewpoint;
    currentTempObject.highTemp = highTemp;
    currentTempObject.lowTemp = lowTemp;
    currentTempObject.feelsLike = feelsLike;

    currentWindObject.windSpeed = currentWindSpeed;
    currentWindObject.gust = currentWindGust;
    currentWindObject.direction = currentWindDirection;

    weather.push({
      temperature: currentTempObject,
      sky: currentSky,
      wind: currentWindObject,
      uv: currentUV,
      pressure: currentPressure,
      rainfall: lastHourRainFall,
      airQuality: airQuality,
      image: currentImage,
      forecast: forecast,
    });
    res.json(weather);
  });
});

app.listen(PORT, () => console.log(`Server Running on PORT ${PORT}`));
