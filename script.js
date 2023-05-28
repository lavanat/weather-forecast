var searchBtn = document.getElementById('search-button');

var todayEl = document.getElementById('today');
var day1El = document.getElementById('t-1');
var day2El = document.getElementById('t-2');
var day3El = document.getElementById('t-3');
var day4El = document.getElementById('t-4');
var day5El = document.getElementById('t-5');
var days = [todayEl, day1El, day2El, day3El, day4El, day5El];

var apiKey = 'd37301983be8abf2d2f02d5906d87205';

// Get lattitude and longitude for api
const getLatLon = (city) => {
    var requestURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            lat = data[0].lat;
            lon = data[0].lon;
            gettodayWeather(lat, lon);
            getWeather(lat, lon);
        });
};

// save to local storage when searching for a city
const saveToLocalStorage = (city) => {
    if (localStorage.getItem("cities") === null) {
        localStorage.setItem("cities", JSON.stringify([city]));
    } else {
        var pastSearches = JSON.parse(localStorage.getItem("cities"));
        if (!pastSearches.includes(city)) {
            pastSearches.push(city);
            localStorage.setItem("cities", JSON.stringify(pastSearches));
        };
    };
    loadSearchButtons();
};

// load the search buttons
function loadSearchButtons() {
    document.getElementById("search-history").innerHTML = ""
    if (localStorage.getItem("cities") !== null) {
        var searchHistory = document.getElementById("search-history");
        var titleEl = document.createElement("h4");
        titleEl.textContent = "Previous Searches:";
        titleEl.classList.add("col-lg-12");
        searchHistory.append(titleEl);
        var pastSavedSearches = JSON.parse(localStorage.getItem("cities"));
        for (i = 0; i < pastSavedSearches.length; i++) {
            createSearchButton(pastSavedSearches[i])
        };
    };
};

// create a search button
function createSearchButton(savedCity) {
    var searchHistory = document.getElementById("search-history");
    let newButton = document.createElement("button");
    newButton.value = savedCity;
    newButton.classList.add("savedButtons");
    newButton.textContent = savedCity;
    searchHistory.append(newButton);
};

// get today's weather
const gettodayWeather = (lat, lon) => {
    var requestURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            var cityEl = document.createElement('h3');
            cityEl.innerHTML = data.name;
            days[0].replaceChildren()
            days[0].appendChild(cityEl);

            // insert date into today
            var dateEl0 = document.createElement('h4')
            var date0 = dayjs.unix(data.dt).format('MM/DD/YYYY');
            dateEl0.innerHTML = date0;
            days[0].appendChild(dateEl0);

            // insert icon into today
            var icon = document.createElement('img');
            icon.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
            icon.alt = data.weather[0].description;
            days[0].appendChild(icon);

            // insert temp into today
            var tempEl = document.createElement('h4');
            tempEl.innerHTML = `Temp: ${data.main.temp} &#8457`;
            days[0].appendChild(tempEl);

            // insert humidity into today
            var humidEl = document.createElement('h4');
            humidEl.innerHTML = `Humidity: ${data.main.humidity} %`;
            days[0].appendChild(humidEl);

            // insert wind speed into today
            var windEl = document.createElement('h4');
            windEl.innerHTML = `Wind: ${data.wind.speed} MPH`;
            days[0].appendChild(windEl);

        }
        );
};

// get the 5 day forecast
const getWeather = (lat, lon) => {
    var requestURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(requestURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            // I know I should have done the following in a for loop but just didn't implement that originally. If I were to redo this, I would make it a for loop.
            // insert date for first day
            var dateEl1 = document.createElement('h4')
            var date1 = dayjs.unix(data.list[3].dt).format('MM/DD/YYYY');
            dateEl1.innerHTML = date1;
            days[1].replaceChildren()
            days[1].appendChild(dateEl1);

            // insert icon into first day
            var icon1 = document.createElement('img');
            icon1.src = "http://openweathermap.org/img/w/" + data.list[3].weather[0].icon + ".png";
            icon1.alt = data.list[3].weather[0].description;
            days[1].appendChild(icon1);

            // insert temp into first day
            var tempEl1 = document.createElement('h4');
            tempEl1.innerHTML = `Temp: ${data.list[3].main.temp} &#8457`;
            days[1].appendChild(tempEl1);

            // insert humidity into first day
            var humidEl1 = document.createElement('h4');
            humidEl1.innerHTML = `Humidity: ${data.list[3].main.humidity} %`;
            days[1].appendChild(humidEl1);

            // insert wind speed into first day
            var windEl1 = document.createElement('h4');
            windEl1.innerHTML = `Wind: ${data.list[3].wind.speed} MPH`;
            days[1].appendChild(windEl1);

            // insert date into second day
            var dateEl2 = document.createElement('h4')
            var date2 = dayjs.unix(data.list[11].dt).format('MM/DD/YYYY');
            dateEl2.innerHTML = date2;
            days[2].replaceChildren()
            days[2].appendChild(dateEl2);

            // insert icon into second day
            var icon2 = document.createElement('img');
            icon2.src = "http://openweathermap.org/img/w/" + data.list[11].weather[0].icon + ".png";
            icon2.alt = data.list[11].weather[0].description;
            days[2].appendChild(icon2);

            // insert temp into second day
            var tempEl2 = document.createElement('h4');
            tempEl2.innerHTML = `Temp: ${data.list[11].main.temp} &#8457`;
            days[2].appendChild(tempEl2);

            // insert humidity into second day
            var humidEl2 = document.createElement('h4');
            humidEl2.innerHTML = `Humidity: ${data.list[11].main.humidity} %`;
            days[2].appendChild(humidEl2);

            // insert wind speed into second day
            var windEl2 = document.createElement('h4');
            windEl2.innerHTML = `Wind: ${data.list[11].wind.speed} MPH`;
            days[2].appendChild(windEl2);

            // insert date into third day
            var dateEl3 = document.createElement('h4')
            var date3 = dayjs.unix(data.list[19].dt).format('MM/DD/YYYY');
            dateEl3.innerHTML = date3;
            days[3].replaceChildren()
            days[3].appendChild(dateEl3);

            // insert icon into third day
            var icon3 = document.createElement('img');
            icon3.src = "http://openweathermap.org/img/w/" + data.list[19].weather[0].icon + ".png";
            icon3.alt = data.list[19].weather[0].description;
            days[3].appendChild(icon3);

            // insert temp into third day
            var tempEl3 = document.createElement('h4');
            tempEl3.innerHTML = `Temp: ${data.list[19].main.temp} &#8457`;
            days[3].appendChild(tempEl3);

            // insert humidity into third day
            var humidEl3 = document.createElement('h4');
            humidEl3.innerHTML = `Humidity: ${data.list[19].main.humidity} %`;
            days[3].appendChild(humidEl3);

            // insert wind speed into third day
            var windEl3 = document.createElement('h4');
            windEl3.innerHTML = `Wind: ${data.list[19].wind.speed} MPH`;
            days[3].appendChild(windEl3);

            // insert date into fourth day
            var dateEl4 = document.createElement('h4')
            var date4 = dayjs.unix(data.list[27].dt).format('MM/DD/YYYY');
            dateEl4.innerHTML = date4;
            days[4].replaceChildren()
            days[4].appendChild(dateEl4);

            // insert icon into fourth day
            var icon4 = document.createElement('img');
            icon4.src = "http://openweathermap.org/img/w/" + data.list[27].weather[0].icon + ".png";
            icon4.alt = data.list[27].weather[0].description;
            days[4].appendChild(icon4);

            // insert temp into fourth day
            var tempEl4 = document.createElement('h4');
            tempEl4.innerHTML = `Temp: ${data.list[27].main.temp} &#8457`;
            days[4].appendChild(tempEl4);

            // insert humidity into fourth day
            var humidEl4 = document.createElement('h4');
            humidEl4.innerHTML = `Humidity: ${data.list[27].main.humidity} %`;
            days[4].appendChild(humidEl4);

            // insert wind speed into fourth day
            var windEl4 = document.createElement('h4');
            windEl4.innerHTML = `Wind: ${data.list[27].wind.speed} MPH`;
            days[4].appendChild(windEl4);

            // insert date into fifth day
            var dateEl5 = document.createElement('h4')
            var date5 = dayjs.unix(data.list[35].dt).format('MM/DD/YYYY');
            dateEl5.innerHTML = date5;
            days[5].replaceChildren()
            days[5].appendChild(dateEl5);

            // insert icon into fifth day
            var icon5 = document.createElement('img');
            icon5.src = "http://openweathermap.org/img/w/" + data.list[35].weather[0].icon + ".png";
            icon5.alt = data.list[35].weather[0].description;
            days[5].appendChild(icon5);

            // insert temp into fifth day
            var tempEl5 = document.createElement('h4');
            tempEl5.innerHTML = `Temp: ${data.list[35].main.temp} &#8457`;
            days[5].appendChild(tempEl5);

            // insert humidity into fifth day
            var humidEl5 = document.createElement('h4');
            humidEl5.innerHTML = `Humidity: ${data.list[35].main.humidity} %`;
            days[5].appendChild(humidEl5);

            // insert wind speed into fifth day
            var windEl5 = document.createElement('h4');
            windEl5.innerHTML = `Wind: ${data.list[35].wind.speed} MPH`;
            days[5].appendChild(windEl5);
        }
        );
};

// handle the search when user types in a city
searchBtn.addEventListener('click', function (event) {
    event.preventDefault()
    var city = document.querySelector('#city-name').value;
    saveToLocalStorage(city);
    getLatLon(city);
});

// handle the search when a previously saved button is clicked
var searchContainer = $("#search-history");
searchContainer.on("click", ".savedButtons", function (event) {
    var buttonValue = $(this).attr("value");
    getLatLon(buttonValue);
});

const init = () => {
    loadSearchButtons();
};

init ();