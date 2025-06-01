import { useEffect } from "react";
import { thresholdAlertViewModel } from "@repo/view-models/ThresholdAlertViewModel";
import { useObservable } from "../hooks/useObservable";

export function ThresholdAlertList() {
  const thresholds = useObservable(thresholdAlertViewModel.thresholdAlerts$, []);
  console.log("ThresholdAlertList data updated:", thresholds);

  useEffect(() => {
    const fetchData = async () => {
      await thresholdAlertViewModel.fetchCommand.execute();
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Threshold Alerts</h1>
      {thresholds && thresholds.length > 0 ? (
        <ul>
          {thresholds.map((alert) => (
            <li key={alert.id}>
              Alert ID: {alert.id}, Sensor ID: {alert.sensorType}, Message: Max:{" "}
              {alert.maxValue}, Min: {alert.minValue}
            </li>
          ))}
        </ul>
      ) : (
        <p>No threshold alerts found or still loading...</p>
      )}
    </div>
  );
}
