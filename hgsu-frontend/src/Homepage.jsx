import React from "react";
import "./App.css";

function Homepage({ setCurrentState }) {
  return (
    <div className="wrap">
      <div className="line">
        <div className="content">
          <span className="skewed">Simon's</span>
        </div>
      </div>
      <div className="line">
        <div className="content">
          <span className="skewed">HGSU</span>
        </div>
      </div>
      <div className="line">
        <div className="content">
          <span className="skewed">Tools</span>
        </div>
      </div>
      <div className="line">
        <div className="content">
          <button
            className="async-button"
            onClick={() => setCurrentState("async")}
          >
            Async Voting
          </button>
        </div>
      </div>
      <div className="line container">
        <div className="content">
          <span className="info">
            For questions or issues, reach out to simonwarchol@g.harvard.edu
          </span>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
