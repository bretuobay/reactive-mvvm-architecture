import { sensorViewModel } from "@repo/view-models/SensorViewModel";
import { useObservable } from "../hooks/useObservable";

export function SensorList() {
  const sensors = useObservable(sensorViewModel.data$, []);
  console.log("sensors data updated:", sensors);

  return (
    <div>
      <h1>sensors</h1>
    </div>
  );
}
