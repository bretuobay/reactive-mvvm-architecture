import { greenHouseViewModel } from "@repo/view-models/GreenHouseViewModel";
import "./App.css";
import { useObservable } from "./hooks/useObservable";

function App() {
  const greenHouses = useObservable(greenHouseViewModel.data$, []);
  console.log("greenHouses", greenHouses);
  return (
    <>
      <h1>Vite + React Lets Go</h1>
    </>
  );
}

export default App;
