import { useEffect } from "react";
import { sensorReadingViewModel } from "@repo/view-models/SensorReadingViewModel";
import { useObservable } from "../hooks/useObservable";

export function SensorReadingList() {
  const readingList = useObservable(sensorReadingViewModel.data$, []);

  useEffect(() => {
    const fetchData = async () => {
      await sensorReadingViewModel.fetchCommand.execute();
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Sensor Readings</h1>
      {readingList && readingList.length > 0 ? (
        <ul>
          {readingList.map((reading) => (
            <li key={reading.id + reading.timestamp}>
              Reading ID: {reading.sensorId}, Sensor ID: {reading.sensorId},
              Timestamp: {new Date(reading.timestamp).toLocaleString()}, Value:{" "}
              {reading.value}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sensor readings found or still loading...</p>
      )}
    </div>
  );
}
