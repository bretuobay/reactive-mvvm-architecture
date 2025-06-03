import type { ThresholdAlertListData } from "@repo/view-models/ThresholdAlertViewModel";
import React from "react";
import { Link } from "react-router-dom";

interface ThresholdAlertCardProps {
  thresholdAlerts: ThresholdAlertListData;
}

const ThresholdAlertCard: React.FC<ThresholdAlertCardProps> = ({
  thresholdAlerts,
}) => {
  return (
    <div className="card threshold-alert-card">
      <Link to="/threshold-alerts" className="card-header-link">
        <h3>Alerts</h3>
      </Link>
      <p className="card-total-text">Total Alerts: {thresholdAlerts.length}</p>
      {/* Further details, like a list of recent or critical alerts, can be added later */}
    </div>
  );
};

export default ThresholdAlertCard;
