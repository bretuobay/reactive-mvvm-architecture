import type { ThresholdAlertListData } from "@repo/view-models/ThresholdAlertViewModel";
import React from "react";

interface ThresholdAlertCardProps {
  thresholdAlerts: ThresholdAlertListData;
}

const ThresholdAlertCard: React.FC<ThresholdAlertCardProps> = ({
  thresholdAlerts,
}) => {
  return (
    <div className="card threshold-alert-card">
      <h3>Alerts</h3>
      <p className="card-total-text">Total Alerts: {thresholdAlerts.length}</p>
      {/* Further details, like a list of recent or critical alerts, can be added later */}
    </div>
  );
};

export default ThresholdAlertCard;
