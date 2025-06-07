import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className="header">
      <Link to="/" className="header-item">
        Dashboard
      </Link>
      <nav className="flex-container">
        <Link to="/greenhouses" className="header-item">
          Greenhouses
        </Link>
        <Link to="/sensors" className="header-item">
          Sensors
        </Link>
        <Link to="/sensor-readings" className="header-item">
          Sensor Readings
        </Link>
        <Link to="/threshold-alerts" className="header-item">
          Threshold Alerts
        </Link>
      </nav>
    </header>
  );
};
