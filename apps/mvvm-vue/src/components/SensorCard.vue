<template>
  <div class="card">
    <div v-if="sensorData">
      <router-link :to="`/sensor-readings/${sensorData.greenhouseId}/${sensorData.id}`" class="card-header-link">
        <h4>Sensor: {{ sensorData.name }} ({{ sensorData.type }})</h4>
      </router-link>
      <p>ID: {{ sensorData.id }}</p>
      <p>Greenhouse ID: {{ sensorData.greenhouseId }}</p>
      <!-- Link to view all sensors for this greenhouse -->
      <router-link :to="`/sensors/${sensorData.greenhouseId}`" class="details-link">
        View all sensors in this greenhouse
      </router-link>
    </div>
    <div v-else>
      <p>Loading sensor data...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { SensorViewModel } from '@repo/view-models';
import { useObservable } from '../hooks/useObservable';

const props = defineProps<{
  viewModel: SensorViewModel;
}>();

const sensorData = useObservable(props.viewModel.data$);
</script>

<style scoped>
.card {
  border: 1px solid #eee;
  padding: 12px;
  margin: 8px 0;
  border-radius: 6px;
  background-color: #f9f9f9;
}
.card-header-link h4 {
  color: #007bff; /* Bluish color */
  text-decoration: none;
  margin-bottom: 6px;
}
.card-header-link:hover h4 {
  text-decoration: underline;
}
.details-link {
  display: inline-block;
  margin-top: 6px;
  font-size: 0.85em;
  color: #0056b3;
}
</style>
