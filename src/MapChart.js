import React, { memo, useEffect, useState } from "react";
import {
  ZoomableGroup,
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule
} from "react-simple-maps";
import axios from "axios";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const MapChart = ({ setTooltipContent }) => {
  const [data, setData] = useState("");

  async function getData() {
    const temp = await axios.get("https://api.covid19api.com/summary");
    setData(temp);
  }

  function findCountryData(name) {
    switch (name) {
      case "United States of America":
        name = "US";
        break;

      case "Dominican Rep.":
        name = "Dominican Republic";
        break;

      case "Bosnia and Herz.":
        name = "Bosnia and Herzegovina";
        break;

      case "Dem. Rep. Congo":
        name = "Congo (Kinshasa)";
        break;

      case "Central African Rep.":
        name = "Central African Republic";
        break;

      default:
        break;
    }

    for (let i = 0; i < data.data.Countries.length; i++) {
      if (data.data.Countries[i].Country.includes(name)) {
        return (
          <div>
            <h2>{data.data.Countries[i].Country}</h2>
            <h5>Confirmed Cases: {data.data.Countries[i].TotalConfirmed}</h5>
            <h5>Total Deaths: {data.data.Countries[i].TotalDeaths}</h5>
            <h5>Total Recovered: {data.data.Countries[i].TotalRecovered}</h5>
          </div>
        );
      }
    }

    return <h2>NO DATA FOUND...</h2>;
  }

  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <ComposableMap
        data-tip=""
        projectionConfig={{ rotate: [-10, 0, 0], scale: 150 }}
        viewBox="0 50 800 600"
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    onMouseEnter={() => {
                      const { NAME } = geo.properties;
                      //setTooltipContent(`${NAME} — ${rounded(POP_EST)} _ EXTRA`);
                      setTooltipContent(findCountryData(NAME));
                    }}
                    onMouseLeave={() => {
                      setTooltipContent("");
                    }}
                    style={{
                      default: {
                        fill: "#D6D6DA",
                        outline: "none"
                      },
                      hover: {
                        fill: "#F53",
                        outline: "none"
                      },
                      pressed: {
                        fill: "#E42",
                        outline: "none"
                      }
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
};

export default memo(MapChart);
