import { useEffect } from "react";
import { sensorViewModel } from "@repo/view-models/SensorViewModel";
import { useObservable } from "../hooks/useObservable";

export function SensorList() {
  const sensors = useObservable(sensorViewModel.data$, []);

  useEffect(() => {
    const fetchData = async () => {
      await sensorViewModel.fetchCommand.execute();
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Sensors</h1>
      {sensors && sensors.length > 0 ? (
        <ul>
          {sensors.map((sensor) => (
            <li key={sensor.id}>
              {sensor.greenhouse.name} {sensor.type} (Status: {sensor.status})
            </li>
          ))}
        </ul>
      ) : (
        <p>No sensors found or still loading...</p>
      )}
    </div>
  );
}
