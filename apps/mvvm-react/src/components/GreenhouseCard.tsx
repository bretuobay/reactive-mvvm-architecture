import type { GreenhouseListData } from "@repo/view-models/GreenHouseViewModel";
import React from "react";
import { Link } from "react-router-dom";

interface GreenhouseCardProps {
  greenHouses: GreenhouseListData | null;
}

const GreenhouseCard: React.FC<GreenhouseCardProps> = ({ greenHouses }) => {
  if (!greenHouses) return null;
  return (
    <div className="card greenhouse-card">
      <Link to="/greenhouses" className="card-header-link">
        <h3>Greenhouses</h3>
      </Link>
      <p className="card-total-text">Total: {greenHouses.length}</p>
      {/* Additional details or a list of greenhouses can be added later */}
    </div>
  );
};

export default GreenhouseCard;
