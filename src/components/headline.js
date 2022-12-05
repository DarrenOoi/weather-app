import React from "react";
import LikeCounter from "./likeCounter";

export default function Headline({ key, time, text, temp, wind }) {
  return (
    <div className="Headline">
      <h2>{time}</h2>
      <h2>{text}</h2>
      <p>
        Temp: {temp} &deg;C, Wind: {wind} km/h
      </p>
      <LikeCounter />
    </div>
  );
}
