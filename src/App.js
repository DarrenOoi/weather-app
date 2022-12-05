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
  const [search, setSearch] = useState(["Australia"]);
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

  if (error) {
    return <p>Something went wrong: {error.message}</p>;
  }

  return (
    <div className="App">
      <header>
        <h1 className="Wtitle">{search} Weather Today</h1>
      </header>
      <br></br>
      <Type />
      <section className="main">
        {search ? (
          <div id="weather">
            <p className="subtitle">
              {/* undefined when search = [ ] */}
              Weather: {headlines.text}
              <br></br>
              {/* {headlines.icon} */}
              Last Updated: {headlines.time}
              <br></br>
              Temperature: {headlines.temp}°C
              <br></br>
              Wind Speed: {headlines.wind}km/h
              <br></br>
              <br></br>
              {headlines.forecast1}
              <br></br>
              Temperature: {headlines.forecast1temp}
              <br></br>
              Weather: {headlines.forecast1text}
              <br></br>
              <br></br>
              {headlines.forecast2}
              <br></br>
              Temperature: {headlines.forecast2temp}
              <br></br>
              Weather: {headlines.forecast2text}
              <br></br>
              <br></br>
              {headlines.forecast3}
              <br></br>
              Temperature: {headlines.forecast3temp}
              <br></br>
              Weather: {headlines.forecast3text}
            </p>
          </div>
        ) : (
          <div></div>
        )}
        {/* {search ? (
   <div>
      <p>
        Weather: {headlines.text}
        <br></br>
        Last Updated: {headlines.time}
        <br></br>
        Temperature: {headlines.temp}°C
        <br></br>
        Wind Speed: {headlines.wind}km/h
      </p>
      </div>
 ): */}
      </section>
    </div>
  );
}

export default App;
