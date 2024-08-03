import React, { useState, useEffect } from "react";
import "./App.css";
import Background from "./Background";
import Loading from "./Loading";
import Homepage from "./Homepage";
import Async from "./Async";

function App() {
  const [currentState, setCurrentState] = useState("homepage");
  const [isLoading, setIsLoading] = useState(false);
  const isDevMode = import.meta.env.DEV;
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    const lifeBaseUrl = window.location.href.endsWith("/")
      ? window.location.href.slice(0, -1)
      : window.location.href;

    setBaseUrl(isDevMode ? "http://127.0.0.1:5000" : lifeBaseUrl);
  }, []);

  return (
    <>
      {isLoading && <Loading />}
      {currentState === "homepage" && (
        <Homepage setCurrentState={setCurrentState} />
      )}
      {currentState === "async" && (
        <Async
          setCurrentState={setCurrentState}
          baseUrl={baseUrl}
          setIsLoading={setIsLoading}
        />
      )}
      {currentState === "loading" && <Loading />}
      <Background />
    </>
  );
}

export default App;
