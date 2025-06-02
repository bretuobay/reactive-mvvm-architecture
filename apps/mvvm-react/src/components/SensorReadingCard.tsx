import React, { useEffect, useRef } from 'react';
import { Chart, LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
Chart.register(LineController, LineElement, PointElement, LinearScale, CategoryScale, Title, Tooltip, Legend);

interface SensorReading {
  id: string;
  value: number;
  timestamp: string | Date;
  sensorId: string;
  // Potentially add unit or type if available directly on reading
}

interface SensorReadingCardProps {
  sensorReadings: SensorReading[];
}

const SensorReadingCard: React.FC<SensorReadingCardProps> = ({ sensorReadings }) => {
  const chartInstanceRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (sensorReadings.length === 0) {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
      return; // Don't render chart if there's no data
    }

    const canvasElement = document.getElementById('sensorReadingsChart') as HTMLCanvasElement | null;
    if (!canvasElement) {
      console.error("Canvas element not found");
      return;
    }
    const ctx = canvasElement.getContext('2d');
    if (!ctx) {
      console.error("Failed to get canvas context");
      return;
    }

    // Destroy previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const chartData = {
      labels: sensorReadings.map(reading => new Date(reading.timestamp).toLocaleTimeString()),
      datasets: [{
        label: 'Sensor Value',
        data: sensorReadings.map(reading => reading.value),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          title: {
            display: true,
            text: 'Time'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Value'
          }
        }
      }
    };

    // Create new chart instance
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: chartOptions
    });

    // Cleanup function to destroy chart on component unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }
    };

  }, [sensorReadings]); // Re-run effect if sensorReadings change

  return (
    <div className="card sensor-reading-card">
      <h3>Sensor Readings</h3>
      <div style={{ position: 'relative', height: '300px', width: '100%' }}> {/* Wrapper for sizing */}
        <canvas id="sensorReadingsChart"></canvas>
      </div>
      <p>Total Readings: {sensorReadings.length}</p>
    </div>
  );
};

export default SensorReadingCard;
