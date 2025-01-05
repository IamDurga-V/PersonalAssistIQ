import React, { useRef, useState, useEffect } from 'react';
import './Weather.css';
import search_icon from '../assets/search.png';
import sunny_icon from '../assets/sun.png';
import halfsun_icon from '../assets/halfsun.png';
import clouds_icon from '../assets/clouds.png';
import rain_icon from '../assets/rain.png';
import rainbow_icon from '../assets/rainbow.png';
import snow_icon from '../assets/snowy.png';
import thunder_icon from '../assets/thunder.png';
import mist_icon from '../assets/mist.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);

  const allIcons = {
    "01d": sunny_icon,
    "01n": sunny_icon,
    "02d": halfsun_icon,
    "02n": halfsun_icon,
    "03d": clouds_icon,
    "03n": clouds_icon,
    "04d": rainbow_icon,
    "04n": rainbow_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "11d": thunder_icon,
    "11n": thunder_icon,
    "13d": snow_icon,
    "13n": snow_icon,
    "50d": mist_icon,
    "50n": mist_icon
  };

  const search = async (city) => {
    if (!city) {
      alert("Enter City Name");
      return;
    }
    try {
      const apiKey = "869ee5ca39f62ffdc0c3d265c14c5a42"; // Use valid API key
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
      console.log("Full URL:", url); // Log URL for debugging
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        console.error("Error fetching weather data:", data.message);
        alert(data.message);
        return;
      }

      const icon = data.weather && data.weather[0] ? allIcons[data.weather[0].icon] : sunny_icon;
      setWeatherData({
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
        weatherDescription: data.weather[0].description
      });
    } catch (error) {
      setWeatherData(null);
      console.error("Error in fetching weather data", error);
    }
  };

  useEffect(() => {
    search("New York"); // Default city search
  }, []);

  return (
    <div className='weather'>
      <h1 className='weather-title'>Weather Updates</h1>
      <div className="search-bar">
        <input ref={inputRef} type="text" placeholder='Search city...' />
        <img src={search_icon} alt="Search" onClick={() => search(inputRef.current.value)} />
      </div>
      {weatherData ? (
        <>
          <img src={weatherData.icon} alt="Weather icon" className='weather-icon' />
          <p className='temperature'>{weatherData.temperature}°C</p>
          <p className='location'>{weatherData.location}</p>
          <p className='description'>{weatherData.weatherDescription}</p>
          <div className="weather-data">
            <div className="col">
              <div>
                <p>{weatherData.windSpeed} km/h</p>
                <span>Wind Speed</span>
              </div>
            </div>
            <div className="col">
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

export default Weather;
