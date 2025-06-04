<template>
  <div class="card sensor-card">
    <router-link to="/sensors" class="card-header-link">
      <!-- Assuming a general /sensors route exists -->
      <h3>Sensors</h3>
    </router-link>
    <p v-if="sensorListDataProp" class="card-total-text">
      Total: {{ sensorListDataProp.length }}
    </p>
    <p v-else class="card-total-text">Total: 0</p>
    <!-- Original content for displaying single sensor details is removed -->
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { SensorListData } from "@repo/view-models/SensorViewModel";
defineProps<{
  sensorListDataProp?: SensorListData | null;
}>();
</script>

<style scoped>
.card {
  border: 1px solid #eee;
  padding: 12px;
  margin: 8px 0;
  border-radius: 6px;
  background-color: #f9f9f9;
}
.card-header-link h4, /* Changed from h4 to h3 to match React, or keep h3 in template */
.card-header-link h3 {
  color: #007bff;
  text-decoration: none;
  margin-bottom: 6px;
}
.card-header-link:hover h3,
.card-header-link:hover h4 {
  text-decoration: underline;
}
.details-link {
  /* This was from the old Vue card, might not be relevant now */
  display: inline-block;
  margin-top: 6px;
  font-size: 0.85em;
  color: #0056b3;
}
/* Added from React's Dashboard.css for consistency */
.card-total-text {
  font-size: 1.2em;
  color: #000000;
  font-weight: bold;
  margin-top: 10px;
  margin-bottom: 5px;
}
.sensor-card {
  /* Specific class if needed */
  /* any specific styles for sensor card */
}
</style>
