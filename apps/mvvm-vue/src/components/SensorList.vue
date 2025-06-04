<template>
  <div class="list-container">
    <!-- Title might need to be dynamic if greenhouseId is used for filtering, or generic if showing all sensors -->
    <h4>Sensors {{ greenhouseId ? 'for Greenhouse ' + greenhouseId : 'List' }}</h4>
    <div v-if="isLoading">
      <p>Loading sensors...</p>
    </div>
    <!-- Display filteredSensors -->
    <div v-else-if="filteredSensors && filteredSensors.length > 0">
      <ul>
        <!-- React's SensorList directly maps and renders list items -->
        <!-- Assuming 'filteredSensors' contains objects with id, type, greenhouse.name, status -->
        <li v-for="sensor in filteredSensors" :key="sensor.id">
          Sensor Type: {{ sensor.type }}
          <span v-if="sensor.greenhouse"> | Greenhouse: {{ sensor.greenhouse.name }}</span>
          <span v-if="sensor.name"> | Name: {{ sensor.name }}</span>
          (Status: {{ sensor.status || 'N/A' }})
          <!-- Link to sensor detail/readings page:
               <router-link :to="`/sensor-readings/${sensor.greenhouseId}/${sensor.id}`">View Readings</router-link>
          -->
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No sensors found {{ greenhouseId ? 'for this greenhouse' : '' }}.</p>
    </div>
    <!-- The use of SensorCard is removed to match React's SensorList structure -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch, computed } from 'vue';
// Import matches the React component (singleton instance)
import { sensorViewModel as importedSensorVMInstance } from "@repo/view-models/SensorViewModel";
import { useObservable } from '../hooks/useObservable';
// SensorCard import is removed.

const props = defineProps<{
  greenhouseId?: string; // Make greenhouseId optional, as React SensorList doesn't seem to filter by it.
}>();

const isLoading = useObservable(importedSensorVMInstance.isLoading$, true);
// Assuming data$ on importedSensorVMInstance provides an array of all sensor data objects
const allSensors = useObservable(importedSensorVMInstance.data$, []);

// Filter sensors if greenhouseId is provided
const filteredSensors = computed(() => {
  if (!allSensors.value) return [];
  if (props.greenhouseId) {
    // Assuming sensor objects have a 'greenhouseId' field or a 'greenhouse.id' field
    return allSensors.value.filter((sensor: any) =>
      sensor.greenhouseId === props.greenhouseId || (sensor.greenhouse && sensor.greenhouse.id === props.greenhouseId)
    );
  }
  return allSensors.value; // Return all sensors if no greenhouseId prop
});

onMounted(() => {
  // Fetch data using the imported singleton's command
  // This will likely fetch all sensors.
  importedSensorVMInstance.fetchCommand.execute();
});

// Watch for greenhouseId changes to potentially re-filter, though computed handles this.
// No explicit re-fetch needed if singleton fetches all data.
watch(() => props.greenhouseId, () => {
  // The computed property 'filteredSensors' will update automatically.
  // If the fetchCommand could be parameterized by greenhouseId, it could be called here:
  // importedSensorVMInstance.fetchCommand.execute({ greenhouseId: newId });
});

</script>

<style scoped>
.list-container {
  padding: 12px;
  margin-top: 10px;
  border-top: 1px solid #eee; /* Optional styling */
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f9f9f9;
  border: 1px solid #eee;
  padding: 8px 12px;
  margin-bottom: 8px;
  border-radius: 4px;
}
</style>
