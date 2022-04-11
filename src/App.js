import React, { useState } from 'react';
// Instance sv variables to get a better access.
const server = {
  url: 'https://api.openweathermap.org/data/2.5/',
  api_key: process.env.REACT_APP_API_KEY
}


function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const getWeather = (evt) => {
    if (evt.key === "Enter") { // If the user hits the enter key on their keyboard
      fetch(`${server.url}weather?q=${query}&units=metric&APPID=${server.api_key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery('');
          console.log(result);
        })
        
    }
  }
  // dateBuilder returns an String => 'Monday 11 April 2022'
  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()]; // getDay returns 0 - 6 number of day.
    let date = d.getDate(); // getDate returns day number
    let month = months[d.getMonth()]; // getMonth returns 0 - 11 number of month.
    let year = d.getFullYear(); // getFullYear returns year number

    return `${day} ${date} ${month} ${year}`
  }
  

  return (
    <div className='app'>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={getWeather}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>
          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}°c
            </div>
            <div className="weather">
              <img id="wicon" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt="Weather icon" />
            </div>
          </div>
        </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
