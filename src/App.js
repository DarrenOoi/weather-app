import React from "react";
import "./App.css";
//import Headline from "./components/headline";
import { useWeather } from "./Api";
import { Typeahead } from "react-bootstrap-typeahead";
import { useState } from "react";
import { countries } from "./Api";
import "./App.css";
import "react-bootstrap-typeahead/css/Typeahead.css";
//applies bootstrap css
import "bootstrap/dist/css/bootstrap.css";

function App() {
  const [search, setSearch] = useState(["Brisbane"]);
  //const def = ["London"];
  function Type() {
    return (
      <Typeahead
        id="searchbar"
        onChange={(input) => {
          //if (input !== 0) {
          setSearch(input);
          // } else console.log("empty");
        }}
        options={countries}
        placeholder="Search by City Name"
        //selected={search}
      />
    );
  }
  const { loading, headlines, error } = useWeather(search);

  if (loading) {
    //console.log(headlines);

    return <p>Loading...</p>;
  }

  // if (error) {
  //   return <p>Something went wrong: {error.message}</p>;
  // }

  return (
    // <div className="App">
    //<title> Weather Today</title>
    <div class="App">
      <head>
        <h1> Weather Today</h1>
        <br></br>
      </head>
      <body>
        <div class="weather">
          <Type />
          <br></br>
          <h2 class="city">Weather in {search}</h2>
          <h1 class="temp">{headlines.temp}°C</h1>
          <img src={headlines.icon} alt="" class="icon" />
          <div class="time">{headlines.time}</div>
          <div class="description">{headlines.text}</div>
          <div class="humidity">Humidity: {headlines.humidity}%</div>
          <div class="wind">Wind speed: {headlines.wind}km/h</div>
        </div>
      </body>
    </div>
  );
}

export default App;
