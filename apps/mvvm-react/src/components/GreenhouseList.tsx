import { greenHouseViewModel } from "@repo/view-models/GreenHouseViewModel";
import { useObservable } from "../hooks/useObservable";

export function GreenhouseList() {
  const greenHouses = useObservable(greenHouseViewModel.data$, []);
  console.log("GreenHouse data updated:", greenHouses);

  return (
    <div>
      <h1>Greenhouses</h1>
    </div>
  );
}
