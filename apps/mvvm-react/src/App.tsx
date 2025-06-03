import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import { GreenhouseList } from "./components/GreenhouseList";
import { SensorList } from "./components/SensorList";
import { SensorReadingList } from "./components/SensorReadingList";
import { ThresholdAlertList } from "./components/ThresholdAlertList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/greenhouses" element={<GreenhouseList />} />
        <Route path="/sensors" element={<SensorList />} />
        <Route path="/sensor-readings" element={<SensorReadingList />} />
        <Route path="/threshold-alerts" element={<ThresholdAlertList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
