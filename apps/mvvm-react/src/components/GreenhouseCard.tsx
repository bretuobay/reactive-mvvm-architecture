import type { GreenhouseListData } from "@repo/view-models/GreenHouseViewModel";
import React from "react";

// interface GreenHouse {
//   id: string;
//   name: string;
//   // Add other relevant properties here if known, otherwise keep it simple
// }

interface GreenhouseCardProps {
  greenHouses: GreenhouseListData | null;
}

const GreenhouseCard: React.FC<GreenhouseCardProps> = ({ greenHouses }) => {
  if (!greenHouses) return null;
  return (
    <div className="card greenhouse-card">
      <h3>Greenhouses</h3>
      <p className="card-total-text">Total: {greenHouses.length}</p>
      {/* Additional details or a list of greenhouses can be added later */}
    </div>
  );
};

export default GreenhouseCard;
