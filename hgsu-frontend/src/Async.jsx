import React, { useState, useEffect } from "react";

function Async({ setCurrentState, baseUrl }) {
  const [p, setP] = useState("Not generated");
  const [q, setQ] = useState("Not generated");
  const [c, setC] = useState("Not generated");
  const [file, setFile] = useState(null);
  const [uploadEnabled, setUploadEnabled] = useState(false);

  useEffect(() => {
    const form = document.querySelector("#upload-form");
    form.action = `${baseUrl}/upload_csv`;
  }, [baseUrl]);

  const handleGenerate = async () => {
    fetch(`${baseUrl}/generate_primes`)
      .then((response) => response.json())
      .then((data) => {
        setP(data.p);
        setQ(data.q);
        setC(data.c);
        checkUploadEnabled(data.p, data.q, data.c, file);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    checkUploadEnabled(p, q, c, selectedFile);
  };

  const checkUploadEnabled = (p, q, c, file) => {
    if (
      p !== "Not generated" &&
      q !== "Not generated" &&
      c !== "Not generated" &&
      file
    ) {
      setUploadEnabled(true);
    } else {
      setUploadEnabled(false);
    }
  };

  const handleEdit = (event) => {
    const targetId = event.target.getAttribute("data-target");
    const newValue = prompt(`Enter new value for ${targetId}:`);
    if (newValue) {
      if (targetId === "p") setP(newValue);
      if (targetId === "q") setQ(newValue);
      if (targetId === "c") setC(newValue);
      checkUploadEnabled(newValue, q, c, file);
    }
  };

  return (
    <div className="container">
      <button
        type="button"
        className="back-button"
        onClick={() => setCurrentState("homepage")}
      >
        Back
      </button>
      <h1>HGSU Async Voting ID Generator</h1>
      <a
        href="https://docs.google.com/document/d/1MsKRpN89cr-24vG7u7hHP00U2eYrTsrKQ_048wBVzEs/edit"
        target="_blank"
        rel="noopener noreferrer"
      >
        Reference Document
      </a>
      <div className="results">
        <p>
          <strong>p:</strong> <span id="p">{p}</span>
          <button
            type="button"
            className="edit-button"
            data-target="p"
            onClick={handleEdit}
          >
            Edit
          </button>
        </p>
        <p>
          <strong>q:</strong> <span id="q">{q}</span>
          <button
            type="button"
            className="edit-button"
            data-target="q"
            onClick={handleEdit}
          >
            Edit
          </button>
        </p>
        <p>
          <strong>c:</strong> <span id="c">{c}</span>
          <button
            type="button"
            className="edit-button"
            data-target="c"
            onClick={handleEdit}
          >
            Edit
          </button>
        </p>
      </div>
      <form id="prime-form">
        <button
          type="button"
          id="generateButton"
          name="generate_primes_and_calculate"
          onClick={handleGenerate}
        >
          Generate Parameters
        </button>
      </form>
      <form id="upload-form" method="post" encType="multipart/form-data">
        <input
          type="file"
          id="csv_file"
          name="file"
          onChange={handleFileChange}
        />
        <input type="hidden" name="p" id="hidden-p" value={p} />
        <input type="hidden" name="q" id="hidden-q" value={q} />
        <input type="hidden" name="c" id="hidden-c" value={c} />
        <button type="submit" id="upload-button" disabled={!uploadEnabled}>
          Upload CSV and Generate IDs
        </button>
      </form>
    </div>
  );
}

export default Async;
