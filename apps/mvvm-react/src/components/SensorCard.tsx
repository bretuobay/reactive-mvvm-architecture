import type { SensorListData } from "@repo/view-models/SensorViewModel";
import React from "react";
import { Link } from "react-router-dom";

interface SensorCardProps {
  sensors: SensorListData | null;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensors }) => {
  if (!sensors) return null;
  return (
    <div className="card sensor-card">
      <Link to="/sensors" className="card-header-link">
        <h3>Sensors</h3>
      </Link>
      <p className="card-total-text">Total: {sensors.length}</p>
      {/* Additional details, like types of sensors or their statuses, can be added later */}
    </div>
  );
};

export default SensorCard;
