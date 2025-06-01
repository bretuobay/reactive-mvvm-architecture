import { useEffect } from "react";
import { greenHouseViewModel } from "@repo/view-models/GreenHouseViewModel";
import { useObservable } from "../hooks/useObservable";

export function GreenhouseList() {
  const greenHouses = useObservable(greenHouseViewModel.data$, []);
  console.log("GreenHouse data updated:", greenHouses);

  useEffect(() => {
    const fetchData = async () => {
      await greenHouseViewModel.fetchCommand.execute();
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Greenhouses</h1>
      {greenHouses && greenHouses.length > 0 ? (
        <ul>
          {greenHouses.map((gh) => (
            <li key={gh.id}>
              {gh.name} (ID: {gh.id})
            </li>
          ))}
        </ul>
      ) : (
        <p>No greenhouses found or still loading...</p>
      )}
    </div>
  );
}
