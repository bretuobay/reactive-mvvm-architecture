import { useEffect } from "react";
import { greenHouseViewModel } from "@repo/view-models/GreenHouseViewModel";
import { useObservable } from "../hooks/useObservable";
import BackArrow from "../assets/back-arrow.svg";
import { Link } from "react-router-dom";

export function GreenhouseList() {
  const greenHouses = useObservable(greenHouseViewModel.data$, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await greenHouseViewModel.fetchCommand.execute();
      } catch (error) {
        console.error("Error fetching greenhouses:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Link to="/" className="back-button">
        <img src={BackArrow} alt="Back to dashboard" className="back-arrow" />
      </Link>
      <div className="card">
        <h1 className="card-title">Greenhouses</h1>
        {greenHouses && greenHouses.length > 0 ? (
          <ul className="card-content list">
            {greenHouses.map((gh) => (
              <li key={gh.id} className="list-item">
                {gh.name} (ID: {gh.id})
              </li>
            ))}
          </ul>
        ) : (
          <p>No greenhouses found or still loading...</p>
        )}
      </div>
    </>
  );
}
