<template>
  <div class="list-container">
    <h3>Active Threshold Alerts</h3>
    <div v-if="isLoading">
      <p>Loading alerts...</p>
    </div>
    <div v-else-if="alertsData && alertsData.length > 0">
      <ul>
        <!-- React's ThresholdAlertList directly maps and renders list items -->
        <!-- Assuming 'alertsData' contains objects with id, sensorType, maxValue, minValue -->
        <li v-for="alert in alertsData" :key="alert.id">
          Alert ID: {{ alert.id }} |
          Sensor Type: {{ alert.sensorType || alert.sensorName || 'N/A' }} | <!-- Accommodate different property names -->
          Threshold: Max {{ alert.maxValue ?? alert.thresholdValue ?? 'N/A' }}, Min {{ alert.minValue ?? 'N/A' }}
          <!-- Add more details if available and needed -->
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No active threshold alerts.</p>
    </div>
    <!-- The use of ThresholdAlertCard is removed to match React's ThresholdAlertList structure -->
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'; // Removed ref and watch as they might not be needed
// Import matches the React component (singleton instance)
import { thresholdAlertViewModel as importedThresholdAlertVMInstance } from "@repo/view-models/ThresholdAlertViewModel";
import { useObservable } from '../hooks/useObservable';
// ThresholdAlertCard import is removed.

const isLoading = useObservable(importedThresholdAlertVMInstance.isLoading$, true);
// Assuming data$ on importedThresholdAlertVMInstance provides an array of alert data objects
const alertsData = useObservable(importedThresholdAlertVMInstance.data$, []);

// The 'alertVMs' ref and its watcher from previous step are removed,
// as we are now directly iterating over 'alertsData' (raw data) in the template.

onMounted(() => {
  // Fetch data using the imported singleton's command
  importedThresholdAlertVMInstance.fetchCommand.execute();
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
  background-color: #fdd; /* Lighter red for items */
  border: 1px solid #fbb;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
}
</style>
