import { thresholdAlertViewModel } from "@repo/view-models/ThresholdAlertViewModel";
import { useObservable } from "../hooks/useObservable";

export function ThresholdAlertList() {
  const thresholds = useObservable(thresholdAlertViewModel.data$, []);
  console.log("thresholds data updated:", thresholds);

  return (
    <div>
      <h1>thresholds</h1>
    </div>
  );
}
