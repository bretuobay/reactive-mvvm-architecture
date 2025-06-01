import "./App.css";
import { GreenhouseList } from "./components/GreenhouseList";
import { SensorList } from "./components/SensorList";
import { SensorReadingList } from "./components/SensorReadingList";
import { ThresholdAlertList } from "./components/ThresholdAlertList";

function App() {
  return (
    <>
      <h1>Vite + React Lets Go</h1>
      <GreenhouseList />
      <SensorList />
      <SensorReadingList />
      <ThresholdAlertList />
    </>
  );
}

export default App;
