import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import cloudyImage from "../public/cloudy.jpg";
import rainyImage from "../public/rainy.jpg";
import clearImage from "../public/clear.jpg";
import thunderstormImage from "../public/thunderstorm.jpg";
import hazeImage from "../public/haze.jpg";
import mistImage from "../public/mist.jpg";
import dustImage from "../public/dust.jpg";
import smokeImage from "../public/smoky.jpg";
import { CiSearch } from "react-icons/ci";
import "./App.css"

const App = () => {
  const [city, setCity] = useState('New York');
  const [backgroundImage, setBackgroundImage] = useState();
  const [temp, setTemp] = useState();
  const [cloudVal, setCloudVal] = useState();
  const [humidity, setHumidity] = useState();
  const [windSpeed, setWindSpeed] = useState();
  const [loading, setLoading] = useState(false);

  const inputRef = useRef();
  useEffect(() => {
    const fetchWeatherData = async (city) => {
      const api_key = '2af09e99d5ff1f1fad46cbe535236ef1';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`

      try {
        setLoading(true);
        const weather_data = await fetch(url);
        const response = await weather_data.json();
        const weatherDescription = response.weather[0].main.toLowerCase();
        const temperature = Math.round(response.main.temp - 273);
        const cloudValue = response.clouds.all;
        const humid = response.main.humidity;
        const wind = response.wind.speed;
        console.log(response);

        setTimeout(() => {
          setLoading(false);
          setTemp(temperature);
          setCloudVal(cloudValue);
          setHumidity(humid);
          setWindSpeed(wind);
          // Set background image based on weather description
          if (weatherDescription === "clouds") {
            setBackgroundImage(cloudyImage);
          } else if (weatherDescription === "rain") {
            setBackgroundImage(rainyImage);
          } else if (weatherDescription === "thunderstorm") {
            setBackgroundImage(thunderstormImage);
          } else if (weatherDescription === "smoke") {
            setBackgroundImage(smokeImage);
          } else if (weatherDescription === "clear") {
            setBackgroundImage(clearImage);
          } else if (weatherDescription === "dust") {
            setBackgroundImage(dustImage);
          } else if (weatherDescription === 'haze') {
            setBackgroundImage(hazeImage);
          } else if (weatherDescription === 'mist') {
            setBackgroundImage(mistImage);
          }
        }, 500);
      } catch (error) {
        console.error('Error fetching weather data:', error);
        alert("City not found");
        setCity("New York");
        setLoading(false);
      }
      
    };

    fetchWeatherData(city);
  }, [city]);


  const handleSearch = (e) => {
    if (inputRef.current.value == "") {
      alert("Please enter city name")
      return;
    }
    setCity(inputRef.current.value);
  }

  const handleDefault = (cityName) => {
    setCity(cityName);
  }

  return (
    <Container backgroundImage={backgroundImage}>
      {loading && <LoadingOverlay />}
      <div className="main">
        <div className="heading">
          <h1>The Weather</h1>
        </div>
        <div className="weather-info">
          <div className="temp">
            <h1>{temp} °C</h1>
          </div>
          <div className="city">
            <h1>{city.toUpperCase()}</h1>
          </div>
        </div>
      </div>
      <SearchPanel className="search-panel">
        <div className="input">
          <input type="text" placeholder="Search city name" className="input-box" ref={inputRef} />
          <CiSearch className="search"  onClick={handleSearch}/>
        </div>
        <div className="list-container">
          <ul>
            <li onClick={() => {handleDefault("Hyderabad")}}>Hyderabad</li>
            <li onClick={() => {handleDefault("Bangalore")}}>Bangalore</li>
            <li onClick={() => {handleDefault("Kolkata")}}>Kolkata</li>
            <li onClick={() => {handleDefault("Delhi")}}>Delhi</li>
          </ul>
        </div>
        <div className="weather-details">
          <h1>Weather details</h1>
          <div className="cloudy">
            <p>Cloudy</p>
            <p>{cloudVal}%</p>
          </div>
          <div className="humidity">
            <p>Humidity</p>
            <p>{humidity}%</p>
          </div>
          <div className="wind">
            <p>Wind Speed</p>
            <p>{windSpeed}km/h</p>
          </div>
        </div>
      </SearchPanel>
      </Container>
      
  );
};

export default App;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 100vh;
  background: url(${props => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
  transition: background 0.3s ease;

  @media (max-width: 840px) {
    flex-direction: column;
    .search-panel{
      min-width: 100%;
    }
    .heading{
      text-align: center;
    }
    .weather-info{
      text-align: end;
    }
    .weather-info .temp h1{
      font-size: 40px;
    }
    .weather-info .city h1{
      font-size: 25px;
    }

  }


  .main{
    padding: 20px 0 70px 70px;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: none;
  }
  

  .input{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .weather-info{
    display: flex;
    gap: 10px;
    align-items: flex-end;
  }

  .temp h1{
    font-size: 90px;
  }
  .search-panel{
    padding: 0;
  }
  input{
    width: 80%; /* Adjust width as needed */
    height: 80px; /* Add padding inside the input */
    background: transparent;
    border: none;
    margin: 0 0 0 40px;
    padding-top: 35px;
    border-bottom: 1px solid white;
    color: white;
    outline: none;
    font-size: 20px;
  }
  input::placeholder{
    color: white;
  }
  .search{
    background-color: #ff8000;
    height: 76px;
    width: 79px;
    padding: 20px;
    cursor: pointer;
  }
  .search:hover{
    background-color: #eb6f02;
  }
  .list-container{
    margin: 30px;
    border-bottom: 1px solid white;
    padding-bottom: 20px;
  }
  .list-container ul li{
    color: #e7e1e1;
    padding: 40px 0px 30px 20px;
    font-size: 22px;
    list-style: none;
    cursor: pointer;
  }
  .list-container ul li:hover{
    color: white;
  }

  .weather-details{
    margin: 30px;
    border-bottom: 1px solid white;
    padding-bottom: 40px;
    padding-top: 40px;

  }
  .weather-details h1{
    font-size: 24px;
    padding-bottom: 30px;
    padding-left: 20px
  }
  .cloudy{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 30px 20px;
    font-size: 24px;
  }
  .humidity{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 30px 20px;
    font-size: 24px;
  }
  .wind{
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 10px 30px 20px;
    font-size: 24px;
  }

`;


const SearchPanel = styled.div`
  width: 40%;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.15); 
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1); 
  padding: 20px; 
  overflow-y: auto; /* Enable vertical scrolling */
  max-height: 100vh; /* Limit height to viewport height */

  /* Custom scrollbar styling */
  scrollbar-color: white transparent;
  scrollbar-base-color: white;

  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background-color: white;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    border: 3px solid transparent;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: white;
    cursor: pointer;
  }

  
`;
const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: black;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
`;