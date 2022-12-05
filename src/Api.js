import { useEffect, useState } from "react";

// UPDATE ME WITH API KEY
const API_KEY = "d804dc49e15e407196b152253221103";
//const QUERY = "Brisbane";
const API_URL = "http://api.weatherapi.com";

export const countries = [
  "Sydney",
  "Melbourne",
  "Brisbane",
  "Perth",
  "Adelaide",
  "Canberra",
  "Hobart",
  "Darwin",
  "Gold Coast",
  "Sunshine Coast",
  "Toowoomba",
  "Newcastle",
  "Central Coast",
  "Wollongong",
  "Geelong",
  "Cairns",
  "Townsville",
];

function getForecastByQuery(query) {
  //const url = `${API_URL}/v1/current.json?key=${API_KEY}&q=${query}&aqi=no`;
  const url = `${API_URL}/v1/forecast.json?key=${API_KEY}&q=${query}&days=1&aqi=no&alerts=no`;
  //api.weatherapi.com/v1/forecast.json?key=d804dc49e15e407196b152253221103&q=London&days=1&aqi=no&alerts=no

  //console.log(query);
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      return {
        time: res.current.last_updated,
        text: res.current.condition.text,
        icon: res.current.condition.icon,
        temp: res.current.temp_c,
        wind: res.current.wind_kph,
        forecast1: res.forecast.forecastday[0].hour[0].time,
        forecast1temp: res.forecast.forecastday[0].hour[0].temp_c,
        forecast1text: res.forecast.forecastday[0].hour[0].condition.text,
        forecast2: res.forecast.forecastday[0].hour[12].time,
        forecast2temp: res.forecast.forecastday[0].hour[12].temp_c,
        forecast2text: res.forecast.forecastday[0].hour[12].condition.text,
        forecast3: res.forecast.forecastday[0].hour[23].time,
        forecast3temp: res.forecast.forecastday[0].hour[23].temp_c,
        forecast3text: res.forecast.forecastday[0].hour[23].condition.text,
      };
    });
}

export function useWeather(QUERY) {
  const [loading, setLoading] = useState(true);
  const [headlines, setHeadlines] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getForecastByQuery(QUERY)
      .then((headlines) => {
        setHeadlines(headlines);
        //console.log(headlines);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [QUERY]);

  return {
    loading,
    headlines,
    error,
  };

  /*
  Above is shorthand for the following
  return {
    loading: loading,
    headlines: headlines,
    error: error
  };
  */
}
