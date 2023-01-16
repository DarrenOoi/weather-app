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
        humidity: res.current.humidity,
        city: res.location.name,
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
        // document.body.style.backgroundImage =
        //   "url('https://source.unsplash.com/random/1600×900/?" +
        //   headlines.city +
        //   "," +
        //   headlines.text +
        //   "')";
        document.body.style.backgroundImage =
          "url('https://source.unsplash.com/random/1600×900/?" +
          headlines.city +
          "')";
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
