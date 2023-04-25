var searchBtn = document.getElementById('search-button')
var apiKey = 'd37301983be8abf2d2f02d5906d87205'

const getLatLon = (event) => {
    event.preventDefault()
    var city = document.querySelector('#city-name').value;
    var requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
        console.log(data);
        lat = data[0].lat;
        lon = data[0].lon;
        getWeather(lat, lon);
    });
};

const getWeather = (lat, lon) => {
    console.log(lat,lon);
    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
    });
};

searchBtn.addEventListener('click', getLatLon);