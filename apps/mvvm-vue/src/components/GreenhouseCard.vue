<template>
  <div class="card greenhouse-card">
    <router-link to="/greenhouses" class="card-header-link">
      <h3>Greenhouses</h3>
    </router-link>
    <!-- Display total count if greenhouseListDataProp is an array -->
    <p v-if="greenhouseListDataProp" class="card-total-text">
      Total: {{ greenhouseListDataProp.length }}
    </p>
    <p v-else class="card-total-text">Total: 0</p>
    <!-- Original content for displaying single greenhouse details is removed to match React's GreenhouseCard -->
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import type { GreenhouseListData } from "@repo/view-models/GreenHouseViewModel";

defineProps<{
  greenhouseListDataProp?: GreenhouseListData | null;
}>();
</script>

<style scoped>
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
.details-link {
  /* This was from the old Vue card, might not be relevant now */
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
.greenhouse-card {
  /* Specific class if needed */
  /* any specific styles for greenhouse card */
}
</style>
