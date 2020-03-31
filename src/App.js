import React, { useState } from "react";
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";

function App() {
  const [content, setContent] = useState("");

  return (
    <div className="App">
      <h1>COVID-19 Map</h1>
      <MapChart setTooltipContent={setContent} />
      <ReactTooltip>{content}</ReactTooltip>
    </div>
  );
}

export default App;
