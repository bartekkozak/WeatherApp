import React, { Component } from "react";
import Form from "./Form";
import SunShower from "./weather-icons/SunShower";
import Cloudy from "./weather-icons/Cloudy";
import Flurries from "./weather-icons/Flurries";
import Rainy from "./weather-icons/Rainy";
import Sunny from "./weather-icons/Sunny";
import ThunderStorm from "./weather-icons/ThunderStorm";

class Weather extends Component {
  constructor() {
    super();

    this.state = {
      city: "",
      temperature: "",
      humidity: "",
      pressure: "",
      weather: {
        id: "",
        main: "",
        description: "",
        icon: undefined
      },
      errors: "",
      success: false,
      init: true
    };
    this.getWeather = this.getWeather.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.convertTemperature = this.convertTemperature.bind(this);
  }

  convertTemperature(temp) {
    return temp - 273.15;
  }

  async getWeather(e) {
    e.preventDefault();
    const API_KEY = "27080fc92eb4dc297551bf93f67ab610";
    const city = e.target.city.value;
    const country = e.target.country.value;
    const api_call = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`
    );
    const data = await api_call.json();

    if (city.trim() === "" && country.trim() === "") {
      this.setState({
        errors: "you must fill the country and city field",
        city: "",
        temperature: "",
        weather: {},
        success: false,
        init: false
      });
    } else if (city.trim() === "") {
      this.setState({
        errors: "you must fill the city field",
        city: "",
        temperature: "",
        humidity: "",
        pressure: "",
        weather: {},
        success: false,
        init: false
      });
    } else if (country.trim() === "") {
      this.setState({
        errors: "you must fill the country field",
        city: "",
        temperature: "",
        humidity: "",
        pressure: "",
        weather: {},
        success: false,
        init: false
      });
    } else if (data.cod === "404") {
      this.setState({
        errors: "city not found",
        city: "",
        temperature: "",
        humidity: "",
        pressure: "",
        weather: {},
        success: false,
        init: false
      });
    } else {
      console.log(data);
      let convertedTemp = this.convertTemperature(data.main.temp).toFixed();
      this.setState({
        city: data.name,
        temperature: convertedTemp,
        weather: { ...data.weather[0] },
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        errors: "",
        success: true,
        init: false
      });
    }
  }

  onKeyPress(e) {
    if (e.key === "Enter") {
      this.getWeather();
    }
  }

  render() {
    const {
      city,
      temperature,
      pressure,
      humidity,
      weather: { description, main },
      errors,
      success,
      init
    } = this.state;

    return (
      <div className="weather-container">
        <Form getWeather={this.getWeather} />
        {init && (
          <div className="weather-card-container">
            <div className="weather-card">
              <div className="init-container">
                <i className="fas fa-map-marked-alt" />
                <p className="init">Check the weather in your city</p>
              </div>
            </div>
          </div>
        )}
        {success && (
          <div className="weather-card-container">
            <div className="weather-card">
              <div className="weather-header">
                {city && <p>CITY: {city}</p>}
              </div>
              <div className="weather-icon-container">
                {main === "Clear" && <Sunny />}
                {main === "Clouds" && <Cloudy />}
                {main === "Drizzle" && <SunShower />}
                {(main === "Rain" || main === "light rain") && <Rainy />}
                {main === "Thunderstorm" && <ThunderStorm />}
                {main === "Snow" && <Flurries />}
              </div>
              <div className="weather-text-container">
                {description && (
                  <p className="weather-text">DESCRIPTION: {description}</p>
                )}
                {temperature && (
                  <p className="weather-text">
                    TEMPERATURE: {temperature} &#8451;
                  </p>
                )}
                {humidity && (
                  <p className="weather-text">HUMIDITY: {humidity}%</p>
                )}
                {pressure && (
                  <p className="weather-text">
                    PRESSURE: {pressure}
                    <span className="weather-text-normal"> hPa</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
        {errors && (
          <div className="weather-card-container">
            <div className="weather-card">
              <div className="error-container">
                <i className="far fa-sad-tear" />
                <p className="errors">{errors}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Weather;
