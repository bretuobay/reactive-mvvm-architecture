import { sensorReadingViewModel } from "@repo/view-models/SensorReadingViewModel";
import { useObservable } from "../hooks/useObservable";

export function SensorReadingList() {
  const readingList = useObservable(sensorReadingViewModel.data$, []);
  console.log("readingList data updated:", readingList);

  return (
    <div>
      <h1>readingList</h1>
    </div>
  );
}
