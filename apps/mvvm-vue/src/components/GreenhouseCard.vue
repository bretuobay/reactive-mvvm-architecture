<template>
  <div class="card greenhouse-card">
    <router-link to="/greenhouses" class="card-header-link">
      <h3>Greenhouses</h3>
    </router-link>
    <!-- Display total count if greenhouseListDataProp is an array -->
    <p v-if="greenhouseListDataProp" class="card-total-text">
      Total: {{ greenhouseListDataProp.length }}
    </p>
    <p v-else class="card-total-text">
      Total: 0
    </p>
    <!-- Original content for displaying single greenhouse details is removed to match React's GreenhouseCard -->
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
// Import matches the React component for @repo/view-models
import type { GreenhouseListData } from "@repo/view-models/GreenHouseViewModel";

const props = defineProps<{
  // Prop name matches the one introduced in the previous subtask, type is GreenhouseListData
  greenhouseListDataProp: GreenhouseListData | null;
}>();

// No specific ViewModel instance logic here, as it's mirroring the React component's structure,
// which is a simple display component for the provided data.
// The 'greenhouseData' const from previous step is no longer needed as data is used directly from prop.
</script>

<style scoped>
/* Styles can be kept or adjusted. Copied from previous state. */
.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
}
.card-header-link h3 {
  color: #007bff;
  text-decoration: none;
  margin-bottom: 8px;
}
.card-header-link:hover h3 {
  text-decoration: underline;
}
.details-link { /* This was from the old Vue card, might not be relevant now */
  display: inline-block;
  margin-top: 8px;
  font-size: 0.9em;
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
.greenhouse-card { /* Specific class if needed */
  /* any specific styles for greenhouse card */
}
</style>
