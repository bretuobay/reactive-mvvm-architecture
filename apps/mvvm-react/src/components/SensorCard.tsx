import React from 'react';

interface Sensor {
  id: string;
  name: string;
  type: string; // Added type as it's often relevant for sensors
  // Add other relevant properties here if known
}

interface SensorCardProps {
  sensors: Sensor[];
}

const SensorCard: React.FC<SensorCardProps> = ({ sensors }) => {
  return (
    <div className="card sensor-card">
      <h3>Sensors</h3>
      <p className="card-total-text">Total: {sensors.length}</p>
      {/* Additional details, like types of sensors or their statuses, can be added later */}
    </div>
  );
};

export default SensorCard;
