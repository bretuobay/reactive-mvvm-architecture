import { useEffect } from "react";
import { sensorViewModel } from "@repo/view-models/SensorViewModel";
import { useObservable } from "../hooks/useObservable";

export function SensorList() {
  const sensors = useObservable(sensorViewModel.data$, []);
  console.log("Sensors data updated:", sensors);

  useEffect(() => {
    sensorViewModel.fetchCommand.execute();
  }, []);

  return (
    <div>
      <h1>Sensors</h1>
      {sensors && sensors.length > 0 ? (
        <ul>
          {sensors.map((sensor) => (
            <li key={sensor.id}>
              {sensor.name} (ID: {sensor.id})
            </li>
          ))}
        </ul>
      ) : (
        <p>No sensors found or still loading...</p>
      )}
    </div>
  );
}
