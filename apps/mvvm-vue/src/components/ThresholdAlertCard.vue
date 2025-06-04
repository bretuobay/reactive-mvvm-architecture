<template>
  <div class="card threshold-alert-card">
    <router-link to="/threshold-alerts" class="card-header-link">
      <h3>Alerts</h3>
    </router-link>
    <p v-if="thresholdAlertsProp" class="card-total-text">
      Total Alerts: {{ thresholdAlertsProp.length }}
    </p>
    <p v-else class="card-total-text">Total Alerts: 0</p>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { ThresholdAlertListData } from "@repo/view-models/ThresholdAlertViewModel";

defineProps<{
  thresholdAlertsProp?: ThresholdAlertListData | null;
}>();
</script>

<style scoped>
.card {
  border: 1px solid #e0e0e0;
  padding: 12px;
  margin: 8px 0;
  border-radius: 6px;
  background-color: #fefefe;
}
.alert-active {
  /* This class might not be used anymore if card only shows total */
  border-left: 5px solid red;
  background-color: #fff0f0;
}
.card-header-link h3 {
  /* Changed from h5 */
  color: #007bff;
  text-decoration: none;
  margin-bottom: 6px;
}
/* .alert-active .card-header-link h5, removed as h5 changed to h3 and active state might be irrelevant */
.card-header-link:hover h3 {
  /* Changed from h5 */
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
.threshold-alert-card {
  /* Specific class if needed */
  /* any specific styles for threshold alert card */
}
</style>
