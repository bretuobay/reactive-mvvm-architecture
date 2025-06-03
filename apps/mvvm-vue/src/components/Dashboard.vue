<template>
  <div class="dashboard-container">
    <h1>MVVM Vue Dashboard</h1>

    <div v-if="isLoading" class="loading-message">
      <p>Loading dashboard data...</p>
    </div>

    <div v-if="!isLoading" class="dashboard-cards-grid">
      <!-- Pass data to the refactored card components -->
      <GreenhouseCard :greenhouseListDataProp="greenHouses" />
      <SensorCard :sensorListDataProp="sensors" />
      <ThresholdAlertCard :thresholdAlertsProp="thresholdAlerts" />
      <SensorReadingCard :sensorReadingsProp="sensorReadings" />
    </div>
    <!-- Old list components are removed to match React's Dashboard structure -->
    <!--
    <section class="dashboard-section">
      <ThresholdAlertList />
    </section>
    <section class="dashboard-section">
      <GreenhouseList />
    </section>
    -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'; // Added computed
import { useObservable } from '../hooks/useObservable';

// Imported singleton view models (matches React)
import { greenHouseViewModel } from "@repo/view-models/GreenHouseViewModel";
import { sensorViewModel } from "@repo/view-models/SensorViewModel";
import { sensorReadingViewModel } from "@repo/view-models/SensorReadingViewModel";
import { thresholdAlertViewModel } from "@repo/view-models/ThresholdAlertViewModel";

// Import card components (these were refactored to accept list data)
import GreenhouseCard from './GreenhouseCard.vue';
import SensorCard from './SensorCard.vue';
import SensorReadingCard from './SensorReadingCard.vue';
import ThresholdAlertCard from './ThresholdAlertCard.vue';

// Observe data and loading states from the view models
const greenHouses = useObservable(greenHouseViewModel.data$, null); // Initial value null or empty array
const isLoadingGreenHouses = useObservable(greenHouseViewModel.isLoading$, true);

const sensors = useObservable(sensorViewModel.data$, null);
const isLoadingSensors = useObservable(sensorViewModel.isLoading$, true);

const sensorReadings = useObservable(sensorReadingViewModel.data$, null);
const isLoadingSensorReadings = useObservable(sensorReadingViewModel.isLoading$, true);

const thresholdAlerts = useObservable(thresholdAlertViewModel.data$, null);
const isLoadingThresholdAlerts = useObservable(thresholdAlertViewModel.isLoading$, true);

// Combined loading state
const isLoading = computed(() =>
  isLoadingGreenHouses.value ||
  isLoadingSensors.value ||
  isLoadingSensorReadings.value ||
  isLoadingThresholdAlerts.value
);

onMounted(async () => {
  try {
    // These view models are expected to have a fetchCommand
    await greenHouseViewModel.fetchCommand.execute();
    await sensorViewModel.fetchCommand.execute();
    await sensorReadingViewModel.fetchCommand.execute(); // This VM might need specific sensor ID
    await thresholdAlertViewModel.fetchCommand.execute();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    // Handle error state in UI if necessary
  }
});
</script>

<style scoped>
.dashboard-container {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.loading-message {
  text-align: center;
  padding: 20px;
  font-size: 1.2em;
}
.dashboard-cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}
h1 {
  text-align: center;
  color: #333; /* Maintained from previous */
  margin-bottom: 24px;
}
/* Removed .dashboard-section as lists are removed, grid is used directly */
</style>
