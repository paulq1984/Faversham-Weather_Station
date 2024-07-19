const currentTemp = document.querySelector('#currentTemp');
const currentSky = document.querySelector('#currentSky');
const tempInfo = document.querySelector('#tempInfo');
const airQinfo = document.querySelector('#airQ');
const uvIndex = document.querySelector('#currentUV');
const humidity = document.querySelector('#currentHum');
const wind = document.querySelector('#currentWind');
const dewpoint = document.querySelector('#currentDew');
const pressure = document.querySelector('#currentPressure');
const rainfall = document.querySelector('#currentRainfall');

const picture = document.querySelector('#image');

fetch('https://18.221.232.179:8000/data')
  .then((res) => res.json())
  .then((data) => {
    data.forEach((weather) => {
      const temp = `<h1>${weather.temperature.temp}C</h1>`;
      const sky = `<h1>${weather.sky}</h1>`;
      const info = `<h6 class="card-subtitle mb-2 text-muted"><i class="fa-solid fa-arrow-up"></i> ${weather.temperature.highTemp}C / <i class="fa-solid fa-arrow-down"></i> ${weather.temperature.lowTemp}C Feels like ${weather.temperature.feelsLike}C</h6>`;
      const uv = `<h5 class="card-title">${weather.uv || 0}</h5>`;
      const hum = `<h5 class="card-title">${weather.temperature.humidity}</h5>`;
      const windInfo = `<h5 class="card-title">${weather.wind.direction} ${weather.wind.windSpeed}mph</h5>`;
      const dewP = `<h5 class="card-title">${weather.temperature.dewpoint}C</h5>`;
      const pressMB = `<h5 class="card-title">${weather.pressure}mb</h5>`;
      const rFall = `<h5 class="card-title">${weather.rainfall}mm</h5>`;
      const aQ = `<h5 class="card-title">${weather.airQuality} AQI</h5>`;

      const image = `<img src=${weather.image} class="img-fluid rounded" alt="Responsive image">`;

      currentTemp.insertAdjacentHTML('beforeend', temp);
      currentSky.insertAdjacentHTML('beforeend', sky);
      tempInfo.insertAdjacentHTML('beforeend', info);
      airQinfo.insertAdjacentHTML('beforeend', aQ);
      uvIndex.insertAdjacentHTML('beforeend', uv);
      humidity.insertAdjacentHTML('beforeend', hum);
      wind.insertAdjacentHTML('beforeend', windInfo);
      dewpoint.insertAdjacentHTML('beforeend', dewP);
      pressure.insertAdjacentHTML('beforeend', pressMB);
      rainfall.insertAdjacentHTML('beforeend', rFall);

      picture.insertAdjacentHTML('beforeend', image);
    });
  })
  .catch((err) => console.log(err));
