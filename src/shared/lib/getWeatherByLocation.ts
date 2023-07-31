import { Forecast, Location } from "@shared/types";
import { convertDegToDirection } from "./convertDegToDirection";

const API_KEY = "822b96177d037393be2826b2a2ecdf4c";

export const getWeatherByLocation = async (location: Location) => {
  const [city, code] = location.title.split(",");
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city.replace(
      " ",
      "+"
    )},${code}&units=metric&appid=${API_KEY}`
  );

  const json = await response.json();
  if (json.cod === "404") {
    return json;
  }
  const { name, main, weather, wind, sys, visibility } = json;
  const { feels_like: feelsLike, humidity, pressure, temp: temperature } = main;

  const { description, icon } = weather[0];

  const forecast: Forecast = {
    feelsLike: Math.floor(feelsLike),
    location: `${name}, ${sys.country}`,
    description,
    wind: `${convertDegToDirection(wind.deg)}, ${wind.speed}`,
    visibility: (visibility / 1000).toFixed(2),
    humidity,
    pressure,
    temperature,
    icon,
    dewPoint: Math.floor(temperature - (100 - humidity) / 5),
  };
  return forecast;
};
