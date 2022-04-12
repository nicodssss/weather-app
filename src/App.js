import React, { useState } from 'react';
import { FaSearch, FaCloud} from 'react-icons/fa'
// Instance sv variables to get a better access.
const server = {
  url: 'https://api.openweathermap.org/data/2.5/',
  api_key: process.env.REACT_APP_API_KEY
}



function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [err,setErr] = useState('')
  const getWeather = (evt) => {
    
      fetch(`${server.url}weather?q=${query}&units=metric&APPID=${server.api_key}`)
        .then(res => res.json())
        .then(result => {
          if(result.cod === "404"){
            setErr(result.message)
            setQuery('');
            setWeather({});
          } else if(result.cod === "400"){
            setErr(result.message)
            setQuery('');
            setWeather({});
          }else{
          setWeather(result);
          setQuery('');
          setErr('')
          console.log(result)
          }
        })
        
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
    <div className={(typeof weather.weather !== "undefined") ? weather.weather[0].main.toLowerCase() : "app"}>
      <main>
        <h2>Weather App <FaCloud/></h2>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search a city..."
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
          <button onClick={getWeather}><FaSearch/></button>
          
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
          </div>
        </div>
        ) : ('')}
        {
          err ? (<div className="location-box">
          <div className="location-not-found">{err}</div>
          </div>)
          : ('')
        }
      </main>
    </div>
  );
}

export default App;
