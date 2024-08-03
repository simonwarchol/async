import React from "react";
import "./App.css";

function Loading() {
  return (
    <svg
      className="editorial hidden"
      viewBox="0 24 150 28"
      preserveAspectRatio="none"
    >
      <defs>
        <path
          id="gentle-wave"
          d="m -160,44.4 c 30,0 58,
  -18 87.7,-18 30.3,0 58.3,
  18 87.3,18 30,0 58,-18 88,
  -18 30,0 58,18 88,18 l 0,
  34.5 -351,0 z"
        />
      </defs>
      <g class="loading-waves">
        <use xlinkHref="#gentle-wave" x="50" y="0" fill="#00adee" />
        <use xlinkHref="#gentle-wave" x="50" y="3" fill="#009fd7" />
        <use xlinkHref="#gentle-wave" x="50" y="6" fill="#246a99" />
      </g>
    </svg>
  );
}

export default Loading;
