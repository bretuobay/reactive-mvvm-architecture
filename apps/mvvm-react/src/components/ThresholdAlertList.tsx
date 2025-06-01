import { useEffect } from "react";
import { thresholdAlertViewModel } from "@repo/view-models/ThresholdAlertViewModel";
import { useObservable } from "../hooks/useObservable";

export function ThresholdAlertList() {
  const thresholds = useObservable(thresholdAlertViewModel.data$, []);
  console.log("ThresholdAlertList data updated:", thresholds);

  useEffect(() => {
    thresholdAlertViewModel.fetchCommand.execute();
  }, []);

  return (
    <div>
      <h1>Threshold Alerts</h1>
      {thresholds && thresholds.length > 0 ? (
        <ul>
          {thresholds.map((alert) => (
            <li key={alert.id}>
              Alert ID: {alert.id}, Sensor ID: {alert.sensorId}, Message:{" "}
              {alert.message}, Timestamp: {new Date(alert.timestamp).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No threshold alerts found or still loading...</p>
      )}
    </div>
  );
}
