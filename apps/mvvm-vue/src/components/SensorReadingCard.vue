<template>
  <div class="card">
    <router-link :to="`/sensors/${props.viewModel.greenhouseId}`" class="card-header-link">
      <h5>Sensor Readings ({{ props.viewModel.sensorId }})</h5>
    </router-link>
    <div v-if="readings && readings.length > 0">
      <Line :data="chartData" :options="chartOptions" />
    </div>
    <div v-else-if="isLoadingReadings">
      <p>Loading readings...</p>
    </div>
    <div v-else>
      <p>No readings available or loading...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed, ref, watch } from 'vue';
import { SensorReadingViewModel, SensorReading } from '@repo/view-models';
import { useObservable } from '../hooks/useObservable';
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
  viewModel: SensorReadingViewModel;
}>();

const readings = useObservable(props.viewModel.readings$);
// Assuming SensorReadingViewModel has an isLoading$ observable
const isLoadingReadings = useObservable(props.viewModel.isLoading$);


const chartData = computed(() => {
  if (!readings.value || readings.value.length === 0) {
    return { labels: [], datasets: [] };
  }
  return {
    labels: readings.value.map((r: SensorReading) => new Date(r.timestamp).toLocaleTimeString()),
    datasets: [
      {
        label: `Readings for Sensor ${props.viewModel.sensorId}`,
        backgroundColor: '#f87979',
        borderColor: '#f87979',
        data: readings.value.map((r: SensorReading) => r.value),
        fill: false,
        tension: 0.1, // Add a bit of smoothing to the line
      },
    ],
  };
});

const chartOptions = ref({
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: false, // Auto-scale based on data often better for sensor readings
    },
    x: {
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10, // Limit number of x-axis labels for readability
      },
    },
  },
  plugins: {
    legend: {
      display: true,
    },
    tooltip: {
      enabled: true,
    }
  }
});

// If the view model instance itself changes, we need to re-subscribe
// This is generally handled if SensorReadingList creates a new VM instance
watch(() => props.viewModel, (newViewModel) => {
  // useObservable handles unsubscription from the old observable and subscription to the new one
  // if the observable reference itself changes.
  // If `readings$` and `isLoading$` are stable properties on the VM that internally switch,
  // then direct useObservable is fine. If the VM instance is replaced,
  // the component's props update should trigger reactivity correctly.
}, { immediate: true });

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
  color: #007bff; /* Bluish color */
  text-decoration: none;
  margin-bottom: 8px;
}
.card-header-link:hover h5 {
  text-decoration: underline;
}
</style>
