import type { SensorListData } from "@repo/view-models/SensorViewModel";
import React from "react";

interface SensorCardProps {
  sensors: SensorListData | null;
}

const SensorCard: React.FC<SensorCardProps> = ({ sensors }) => {
  if (!sensors) return null;
  return (
    <div className="card sensor-card">
      <h3>Sensors</h3>
      <p className="card-total-text">Total: {sensors.length}</p>
      {/* Additional details, like types of sensors or their statuses, can be added later */}
    </div>
  );
};

export default SensorCard;
