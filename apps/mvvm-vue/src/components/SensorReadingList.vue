<template>
  <div class="list-container">
    <h5>Readings {{ sensorId ? 'for Sensor ' + sensorId : 'List' }}</h5>
    <div v-if="isLoading">
      <p>Loading sensor readings...</p>
    </div>
    <!-- Display filteredReadings -->
    <div v-else-if="filteredReadings && filteredReadings.length > 0">
      <ul>
        <!-- React's SensorReadingList directly maps and renders list items -->
        <li v-for="reading in filteredReadings" :key="reading.id || reading.timestamp">
          Sensor ID: {{ reading.sensorId }} |
          Timestamp: {{ new Date(reading.timestamp).toLocaleString() }} |
          Value: {{ reading.value }}
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No readings available {{ sensorId ? 'for this sensor' : '' }}.</p>
    </div>
    <!-- The use of SensorReadingCard is removed to match React's SensorReadingList structure -->
  </div>
</template>

<script setup lang="ts">
import { defineProps, onMounted, computed, watch } from 'vue';
// Import matches the React component (singleton instance)
import { sensorReadingViewModel as importedSensorReadingVMInstance } from "@repo/view-models/SensorReadingViewModel";
import { useObservable } from '../hooks/useObservable';
// SensorReadingCard import is removed.

const props = defineProps<{
  sensorId?: string;       // Optional: if not provided, might show all readings or default
  greenhouseId?: string; // Optional: for context or if VM needs it
}>();

const isLoading = useObservable(importedSensorReadingVMInstance.isLoading$, true);
// Assuming data$ on importedSensorReadingVMInstance provides an array of all sensor reading objects
const allReadings = useObservable(importedSensorReadingVMInstance.data$, []);

// Filter readings if sensorId is provided
const filteredReadings = computed(() => {
  if (!allReadings.value) return [];
  if (props.sensorId) {
    // Assuming reading objects have a 'sensorId' field
    return allReadings.value.filter((reading: any) => reading.sensorId === props.sensorId);
  }
  return allReadings.value; // Return all readings if no sensorId prop
});

onMounted(() => {
  // Fetch data using the imported singleton's command.
  // This might fetch all readings, or it might need parameters if the VM supports it.
  // Example: importedSensorReadingVMInstance.fetchCommand.execute({ sensorId: props.sensorId });
  // For now, assuming a generic fetch like in the React component.
  importedSensorReadingVMInstance.fetchCommand.execute();
});

// Watch for sensorId changes to potentially re-fetch or re-filter.
watch(() => props.sensorId, (newId, oldId) => {
  if (newId !== oldId) {
    // If the view model's fetchCommand can be parameterized by sensorId:
    // importedSensorReadingVMInstance.fetchCommand.execute({ sensorId: newId });
    // Otherwise, the computed 'filteredReadings' will handle displaying the correct data.
    // If no parameterized fetch, ensure the initial fetch gets all necessary data.
  }
});

</script>

<style scoped>
.list-container {
  padding: 10px;
  margin-top: 8px;
  border-top: 1px solid #f0f0f0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 6px 10px;
  margin-bottom: 6px;
  border-radius: 3px;
  font-size: 0.9em;
}
</style>
