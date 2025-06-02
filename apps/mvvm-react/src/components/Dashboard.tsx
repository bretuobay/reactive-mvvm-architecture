import React, { useState, useEffect } from 'react';
import greenHouseViewModel from '../../../../packages/view-models/src/GreenHouseViewModel';
import sensorViewModel, { Sensor } from '../../../../packages/view-models/src/SensorViewModel';
import thresholdAlertViewModel, { ThresholdAlert } from '../../../../packages/view-models/src/ThresholdAlertViewModel'; 
import sensorReadingViewModel, { SensorReading } from '../../../../packages/view-models/src/SensorReadingViewModel';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css'; // Import the CSS file

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor?: string;
    backgroundColor?: string;
  }[];
}

interface SensorChartData {
  [sensorType: string]: ChartData;
}

const Dashboard: React.FC = () => {
  const [greenhouseCount, setGreenhouseCount] = useState(0);
  const [activeSensorCount, setActiveSensorCount] = useState(0);
  const [alertCount, setAlertCount] = useState(0);
  const [alertsData, setAlertsData] = useState<ThresholdAlert[]>([]);
  const [loadingAlerts, setLoadingAlerts] = useState(true);
  const [sensorChartData, setSensorChartData] = useState<SensorChartData>({});
  const [loadingCharts, setLoadingCharts] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoadingAlerts(true); 
      setLoadingCharts(true); 

      try {
        const greenhouses = await greenHouseViewModel.fetchData();
        setGreenhouseCount(greenhouses.length);

        const sensors = await sensorViewModel.fetchData();
        const activeSensors = sensors.filter(sensor => sensor.status === 'active');
        setActiveSensorCount(activeSensors.length);

        const fetchedAlerts = await thresholdAlertViewModel.fetchData();
        setAlertsData(fetchedAlerts);
        setAlertCount(fetchedAlerts.length);
        setLoadingAlerts(false);

        const sensorReadings = await sensorReadingViewModel.fetchData();
        processSensorDataForCharts(sensorReadings, sensors);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoadingAlerts(false);
        setLoadingCharts(false); 
      }
    };

    const processSensorDataForCharts = (readings: SensorReading[], sensors: Sensor[]) => {
      if (!readings || readings.length === 0 || !sensors || sensors.length === 0) {
        setSensorChartData({}); 
        setLoadingCharts(false);
        return;
      }

      const sensorMap = new Map(sensors.map(s => [s.id, s]));
      const groupedData: SensorChartData = {};

      readings.forEach(reading => {
        const sensor = sensorMap.get(reading.sensorId);
        if (sensor) {
          const type = sensor.type;
          if (!groupedData[type]) {
            groupedData[type] = {
              labels: [],
              datasets: [],
            };
          }
          let dataset = groupedData[type].datasets.find(ds => ds.label === `${sensor.name} (${sensor.type})`);
          if (!dataset) {
            dataset = {
              label: `${sensor.name} (${sensor.type})`,
              data: [],
              borderColor: getRandomColor(),
              backgroundColor: getRandomColor(0.5), 
            };
            groupedData[type].datasets.push(dataset);
          }
        }
      });

      readings.forEach(reading => {
        const sensor = sensorMap.get(reading.sensorId);
        if (sensor) {
          const type = sensor.type;
          const dataset = groupedData[type]?.datasets.find(ds => ds.label === `${sensor.name} (${sensor.type})`);
          if (dataset) {
            const timestamp = new Date(reading.timestamp).toLocaleTimeString();
            if (groupedData[type].labels.length < 50 && !groupedData[type].labels.includes(timestamp)) {
                 groupedData[type].labels.push(timestamp);
            }
            dataset.data.push(reading.value);
          }
        }
      });
      
      for (const type in groupedData) {
        if (groupedData[type].datasets.length === 0 || groupedData[type].datasets.every(ds => ds.data.length === 0)) {
          delete groupedData[type];
        }
      }

      setSensorChartData(groupedData);
      setLoadingCharts(false);
    };
    
    const getRandomColor = (alpha = 1) => {
        const r = Math.floor(Math.random() * 255);
        const g = Math.floor(Math.random() * 255);
        const b = Math.floor(Math.random() * 255);
        return `rgba(${r},${g},${b},${alpha})`;
    };

    fetchDashboardData();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>Greenhouse Dashboard</h1>
      
      <div id="dashboard-overview-section" className="dashboard-section">
        <h2>Overview</h2>
        <div className="overview-metrics">
          <p>Total Greenhouses: {greenhouseCount}</p>
          <p>Active Sensors: {activeSensorCount}</p>
          <p>Open Alerts: {alertCount}</p>
        </div>
      </div>

      <div id="dashboard-sensor-readings-section" className="dashboard-section">
        <h2>Sensor Readings</h2>
        {loadingCharts ? (
          <p>Loading charts...</p>
        ) : Object.keys(sensorChartData).length === 0 ? (
          <p>No sensor data available to display charts.</p>
        ) : (
          <div className="charts-grid">
            {Object.entries(sensorChartData).map(([sensorType, data]) => (
              <div key={sensorType} className="chart-container">
                <h3>{sensorType.charAt(0).toUpperCase() + sensorType.slice(1)} Readings</h3>
                {data.datasets.length > 0 ? (
                  <Line
                    data={data}
                    options={{
                      responsive: true,
                      plugins: { legend: { position: 'top' as const }, title: { display: true, text: `${sensorType.charAt(0).toUpperCase() + sensorType.slice(1)} Sensor Readings` }},
                      scales: { x: { title: { display: true, text: 'Time / Reading Instance' }}, y: { title: { display: true, text: 'Value' }}}
                    }}
                  />
                ) : (
                  <p>No data for {sensorType} sensors.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <div id="dashboard-alert-status-section" className="dashboard-section">
        <h2>Alert Status</h2>
        {loadingAlerts ? (
          <p>Loading alerts...</p>
        ) : alertsData.length === 0 ? (
          <p className="no-alerts-message">No active alerts.</p>
        ) : (
          <ul className="alerts-list">
            {alertsData.map(alert => (
              <li key={alert.id}>
                Alert ID: {alert.id} | Sensor Type: {alert.sensorType} | Greenhouse ID: {alert.greenhouseId} | Threshold: Min {alert.minValue} - Max {alert.maxValue} | Triggered at: {new Date(alert.timestamp).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
