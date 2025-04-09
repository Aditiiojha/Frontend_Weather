# Weather Dashboard

A responsive weather dashboard web application built with React.js that displays current weather information for any city using the OpenWeatherMap API.

## Features

- Search for weather by city name
- Display current weather conditions (temperature, humidity, wind speed, etc.)
- Shows weather icons from the API
- Recent search history (last 5 cities)
- Responsive design for mobile and desktop
- Loading and error states

## Technologies Used

- React.js
- CSS (no external libraries)
- OpenWeatherMap API

## Setup Instructions

1. Clone this repository
2. Install dependencies: `npm install`
3. Get an API key from [OpenWeatherMap](https://openweathermap.org/api)
4. Replace `YOUR_API_KEY` in App.js with your actual API key
5. Run the app: `npm start`

## API Information

- API used: OpenWeatherMap Current Weather Data API
- Rate limits: 60 calls/minute for free tier
- API documentation: https://openweathermap.org/current

## Deployment

This app can be deployed to:
- Vercel
- Netlify
- GitHub Pages

Make sure to set up environment variables for your API key in production.
