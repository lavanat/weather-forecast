var searchBtn = document.getElementById('search-button');

var todayEl = document.getElementById('today');
var day1El = document.getElementById('t-1');
var day2El = document.getElementById('t-2');
var day3El = document.getElementById('t-3');
var day4El = document.getElementById('t-4');
var day5El = document.getElementById('t-5');
var days = [todayEl, day1El, day2El, day3El, day4El, day5El];

var apiKey = 'd37301983be8abf2d2f02d5906d87205';

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
    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(requestURL)
    .then(function(response) {
        return response.json();
    })
    .then (function (data) {
        console.log(data);
        for (i=0; i < days.length; i++) {
            if (i===0) {
               var cityEl = document.createElement('h3');
               cityEl.innerHTML = data.city.name;
               days[i].appendChild(cityEl); 
            }
            var dateEl = document.createElement('h4')
            var date = dayjs.unix(data.list[i].dt).format('MM/DD/YYYY');
            dateEl.innerHTML = date;
            days[i].appendChild(dateEl);
        }
    });
};

searchBtn.addEventListener('click', getLatLon);