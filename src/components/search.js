import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL } from "../Api";
import { geoApiOptions } from "./apikey";

const Searchbar = ({ SearchChange }) => {
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
      geoApiOptions
    )
      .then((response) => response.json())
      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              label: `${city.name}`,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  const handleOnChange = (cityName) => {
    SearchChange(cityName);
  };
  return (
    <AsyncPaginate
      placeholder="Search by City name"
      debounceTimeout={600}
      value=" "
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default Searchbar;
