<template>
  <div class="list-container">
    <h3>Active Threshold Alerts</h3>
    <div v-if="isLoading">
      <p>Loading alerts...</p>
    </div>
    <div v-else-if="alertsData && alertsData.length > 0">
      <ul>
        <li v-for="alert in alertsData" :key="alert.id">
          Alert ID: {{ alert.id }} | Sensor Type:
          {{ alert.sensorType || "N/A" }} | Threshold: Max
          {{ alert.maxValue ?? "N/A" }}, Min
          {{ alert.minValue ?? "N/A" }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No active threshold alerts.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { thresholdAlertViewModel } from "@repo/view-models/ThresholdAlertViewModel";
import { useObservable } from "../hooks/useObservable";

const isLoading = useObservable(thresholdAlertViewModel.isLoading$, true);
const alertsData = useObservable(thresholdAlertViewModel.data$, []);

onMounted(() => {
  thresholdAlertViewModel.fetchCommand.execute();
});
</script>

<style scoped>
.list-container {
  padding: 16px;
  background-color: #fff5f5;
  border-radius: 8px;
  margin-top: 16px;
}
h3 {
  color: #c00;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #fdd;
  border: 1px solid #fbb;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
}
</style>
