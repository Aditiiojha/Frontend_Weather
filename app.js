import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const API_KEY = 'YOUR_API_KEY'; // Replace with your actual API key

  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found');
      }
      const data = await response.json();
      setWeatherData(data);
      
      // Update search history
      setSearchHistory(prev => {
        const newHistory = [cityName, ...prev.filter(item => item !== cityName)];
        return newHistory.slice(0, 5);
      });
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeatherData(city);
    }
  };

  const handleHistoryClick = (cityName) => {
    setCity(cityName);
    fetchWeatherData(cityName);
  };

  return (
    <div className="app">
      <h1 className="app-title">Weather Dashboard</h1>
      
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="search-input"
        />
        <button type="submit" className="search-button" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searchHistory.length > 0 && (
        <div className="search-history">
          <h3>Recent Searches:</h3>
          <div className="history-buttons">
            {searchHistory.map((item, index) => (
              <button
                key={index}
                onClick={() => handleHistoryClick(item)}
                className="history-button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && (
        <div className="loading">
          <div className="loader"></div>
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <p>Please try another city.</p>
        </div>
      )}

      {weatherData && !loading && (
        <div className="weather-card">
          <div className="weather-header">
            <h2>{weatherData.name}, {weatherData.sys.country}</h2>
            <p className="weather-date">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div className="weather-main">
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
              />
              <p>{weatherData.weather[0].main}</p>
            </div>
            
            <div className="weather-temp">
              <h1>{Math.round(weatherData.main.temp)}°C</h1>
              <p>Feels like: {Math.round(weatherData.main.feels_like)}°C</p>
            </div>
          </div>
          
          <div className="weather-details">
            <div className="detail-item">
              <span>Humidity</span>
              <span>{weatherData.main.humidity}%</span>
            </div>
            <div className="detail-item">
              <span>Wind Speed</span>
              <span>{weatherData.wind.speed} km/h</span>
            </div>
            <div className="detail-item">
              <span>Pressure</span>
              <span>{weatherData.main.pressure} hPa</span>
            </div>
            <div className="detail-item">
              <span>Visibility</span>
              <span>{(weatherData.visibility / 1000).toFixed(1)} km</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
