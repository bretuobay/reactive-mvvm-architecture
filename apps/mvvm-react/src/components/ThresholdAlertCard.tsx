import React from 'react';

interface ThresholdAlert {
  id: string;
  message: string;
  sensorId?: string; // Optional: to link alert to a sensor
  timestamp?: string; // Optional: when the alert was triggered
  // Add other relevant properties here if known
}

interface ThresholdAlertCardProps {
  thresholdAlerts: ThresholdAlert[];
}

const ThresholdAlertCard: React.FC<ThresholdAlertCardProps> = ({ thresholdAlerts }) => {
  return (
    <div className="card threshold-alert-card">
      <h3>Alerts</h3>
      <p>Total Alerts: {thresholdAlerts.length}</p>
      {/* Further details, like a list of recent or critical alerts, can be added later */}
    </div>
  );
};

export default ThresholdAlertCard;
