<template>
  <div class="dashboard-container">
    <h1>Dashboard</h1>

    <div v-if="isLoading" class="loading-message">
      <p>Loading dashboard data...</p>
    </div>

    <div v-if="!isLoading" class="dashboard-cards-grid">
      <GreenhouseCard :greenhouseListDataProp="greenHouses" />
      <SensorCard :sensorListDataProp="sensors" />
      <ThresholdAlertCard :thresholdAlertsProp="thresholdAlerts" />
      <SensorReadingCard :sensorReadingsProp="sensorReadings" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from "vue";
import { useObservable } from "../hooks/useObservable";

import { greenHouseViewModel } from "@repo/view-models/GreenHouseViewModel";
import { sensorViewModel } from "@repo/view-models/SensorViewModel";
import { sensorReadingViewModel } from "@repo/view-models/SensorReadingViewModel";
import { thresholdAlertViewModel } from "@repo/view-models/ThresholdAlertViewModel";

import GreenhouseCard from "./GreenhouseCard.vue";
import SensorCard from "./SensorCard.vue";
import SensorReadingCard from "./SensorReadingCard.vue";
import ThresholdAlertCard from "./ThresholdAlertCard.vue";

const greenHouses = useObservable(greenHouseViewModel.data$, []);
const isLoadingGreenHouses = useObservable(
  greenHouseViewModel.isLoading$,
  true
);

const sensors = useObservable(sensorViewModel.data$, []);
const isLoadingSensors = useObservable(sensorViewModel.isLoading$, true);

const sensorReadings = useObservable(sensorReadingViewModel.data$, []);
const isLoadingSensorReadings = useObservable(
  sensorReadingViewModel.isLoading$,
  true
);

const thresholdAlerts = useObservable(thresholdAlertViewModel.data$, []);
const isLoadingThresholdAlerts = useObservable(
  thresholdAlertViewModel.isLoading$,
  true
);

const isLoading = computed(
  () =>
    isLoadingGreenHouses.value ||
    isLoadingSensors.value ||
    isLoadingSensorReadings.value ||
    isLoadingThresholdAlerts.value
);

onMounted(async () => {
  try {
    await greenHouseViewModel.fetchCommand.execute();
    await sensorViewModel.fetchCommand.execute();
    await sensorReadingViewModel.fetchCommand.execute();
    await thresholdAlertViewModel.fetchCommand.execute();
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
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
  color: #333;
  margin-bottom: 24px;
}
</style>
