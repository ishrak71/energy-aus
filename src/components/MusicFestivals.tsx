import React, { useState } from "react";
import "../App.css";
import { MusicFestival } from "../types";
import "primeicons/primeicons.css";

const organizeData = (festivals: MusicFestival[]) => {
  const recordLabelMap: Record<string, Record<string, string[]>> = {};

  festivals.forEach((festival) => {
    festival.bands.forEach((band) => {
      const { name: bandName, recordLabel } = band;

      // Skip if the band has no record label
      if (!recordLabel) return;

      if (!recordLabelMap[recordLabel]) {
        recordLabelMap[recordLabel] = {};
      }

      if (!recordLabelMap[recordLabel][bandName]) {
        recordLabelMap[recordLabel][bandName] = [];
      }

      // Add the festival to the band's list of festivals
      recordLabelMap[recordLabel][bandName].push(
        festival.name || "Visited no festivals"
      );
    });
  });

  return recordLabelMap;
};

const sortData = (data: Record<string, Record<string, string[]>>) => {
  const sortedRecordLabels = Object.keys(data).sort();
  const sortedData: Record<string, Record<string, string[]>> = {};

  sortedRecordLabels.forEach((label) => {
    const bands = data[label];
    const sortedBands = Object.keys(bands).sort();
    sortedData[label] = {};

    sortedBands.forEach((band) => {
      sortedData[label][band] = bands[band];
    });
  });

  return sortedData;
};

const MusicFestivals: React.FC<{ festivals: MusicFestival[] }> = ({
  festivals,
}) => {
  const [isSorted, setIsSorted] = useState<boolean>(true);

  // Organize and sort the data
  const organizedData = organizeData(festivals);
  const sortedData = sortData(organizedData);

  const handleSortToggle = () => {
    setIsSorted((prevSorted) => !prevSorted);
  };

  const dataToDisplay = isSorted ? sortedData : organizedData;

  return (
    <div className="list">
      <button className="sort-button" onClick={handleSortToggle}>
        {isSorted ? "Unsort" : "Sort Alphabetically"}
      </button>

      {Object.keys(dataToDisplay).map((label) => (
        <div className="label-body" key={label}>
          <div className="title">
            <i className="pi pi-play-circle" style={{ fontSize: "2rem" }}></i>
            <h2>Record Label: {label}</h2>
          </div>

          {Object.keys(dataToDisplay[label]).map((band) => (
            <div key={band}>
              <h3>Bands under their management:</h3>
              <div className="band">
                <i
                  className="pi pi-spin pi-star-fill"
                  style={{ fontSize: "1rem" }}
                ></i>
                <p> {band}</p>
                <i
                  className="pi pi-spin pi-star-fill"
                  style={{ fontSize: "1rem" }}
                ></i>
              </div>

              <div className="festivals">
                <h4>Festivals where they performed</h4>
                <ul>
                  {dataToDisplay[label][band].map((festival) => (
                    <li key={festival}>{festival}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MusicFestivals;
