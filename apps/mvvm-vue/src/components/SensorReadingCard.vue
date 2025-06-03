<template>
  <div class="card sensor-reading-card">
    <!-- Align link with React component -->
    <router-link to="/sensor-readings" class="card-header-link">
      <h5>Sensor Readings</h5>
    </router-link>
    <div v-if="readings && readings.length > 0">
      <Line :data="chartData" :options="chartOptions" />
      <p class="card-total-text">Total Readings: {{ readings.length }}</p>
    </div>
    <div v-else-if="isLoadingReadings"> <!-- isLoadingReadings is a placeholder ref -->
      <p>Loading readings...</p>
    </div>
    <div v-else>
      <p>No readings available.</p> <!-- Simplified message -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, watch } from 'vue';
import type { SensorReadingListData } from "@repo/view-models/SensorReadingViewModel";
// SensorReading type might be useful if it's defined and exported by view-models
// For now, assuming structure like { timestamp: any, value: any } within SensorReadingListData
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps<{
  sensorReadingsProp: SensorReadingListData | null; // Allow null to match React's possible undefined data state
}>();

const readings = computed(() => props.sensorReadingsProp || []); // Default to empty array if null
const isLoadingReadings = ref(false); // Placeholder, React version doesn't show individual loading for this card's data

const chartData = computed(() => {
  if (!readings.value || readings.value.length === 0) {
    return { labels: [], datasets: [] };
  }
  // Assuming SensorReadingListData is Array<{ timestamp: string | number; value: number; ... }>
  type ReadingItem = typeof readings.value[0]; // Infer item type if possible, else use 'any'

  return {
    labels: readings.value.map((r: ReadingItem) => new Date(r.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: `Sensor Readings`,
        backgroundColor: '#f87979', // Or use colors from React version: 'rgb(75, 192, 192)'
        borderColor: '#f87979',   // Or use colors from React version
        data: readings.value.map((r: ReadingItem) => r.value),
        fill: false,
        tension: 0.1,
      },
    ],
  };
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: { // Match React chart options
      title: { display: true, text: "Time" },
      ticks: { autoSkip: true, maxTicksLimit: 10 },
    },
    y: { // Match React chart options
      title: { display: true, text: "Value" },
      beginAtZero: false,
    },
  },
  plugins: {
    legend: { display: true },
    tooltip: { enabled: true }
  }
});

watch(() => props.sensorReadingsProp, (newReadings) => {
  // vue-chartjs Line component should reactively update when :data changes.
  // Additional logic can be added here if needed when prop changes.
}, { immediate: true, deep: true });

</script>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 10px;
  margin: 8px 0;
  border-radius: 4px;
  background-color: #fafafa;
}
.card-header-link h5 {
  color: #007bff;
  text-decoration: none;
  margin-bottom: 8px;
}
.card-header-link:hover h5 {
  text-decoration: underline;
}
.card-total-text { /* Style for total readings text */
  font-size: 1em; /* Adjust as needed */
  color: #333;
  margin-top: 10px;
  text-align: center;
}
.sensor-reading-card canvas {
  max-width: 100%;
  height: 300px !important;
}
</style>
