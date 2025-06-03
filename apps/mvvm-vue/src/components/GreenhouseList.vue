<template>
  <div class="list-container">
    <h2>Greenhouses</h2>
    <div v-if="isLoading">
      <p>Loading greenhouses...</p>
    </div>
    <div v-else-if="greenhouses && greenhouses.length > 0">
      <ul>
        <!-- React's GreenhouseList directly maps and renders list items -->
        <!-- Assuming 'greenhouses' is an array of objects with at least 'id' and 'name' -->
        <li v-for="gh in greenhouses" :key="gh.id">
          {{ gh.name }} (ID: {{ gh.id }})
          <!-- Add more details if present in 'gh' object and needed -->
          <!-- e.g., Location: {{ gh.location }} -->
          <!-- The React version links items, but here we just display text as per its map -->
          <!-- To link to a detail page: <router-link :to="`/greenhouse/${gh.id}`">{{ gh.name }}</router-link> -->
        </li>
      </ul>
    </div>
    <div v-else>
      <p>No greenhouses found.</p>
    </div>
    <!-- The use of GreenhouseCard is removed to match React's GreenhouseList structure -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'; // watch might not be needed if direct usage
// Import matches the React component (singleton instance)
import { greenHouseViewModel as importedGreenhouseVMInstance } from "@repo/view-models/GreenHouseViewModel";
import { useObservable } from '../hooks/useObservable';
// GreenhouseCard import is removed as it's not used in this aligned version.
// import GreenhouseCard from './GreenhouseCard.vue';

// Use the imported singleton instance
const isLoading = useObservable(importedGreenhouseVMInstance.isLoading$, true);
// Assuming data$ on importedGreenhouseVMInstance provides an array of greenhouse data objects
const greenhouses = useObservable(importedGreenhouseVMInstance.data$, []);

// The 'greenhouseViewModels' ref and its watcher from previous step are removed,
// as we are now directly iterating over 'greenhouses' (raw data) in the template.

onMounted(() => {
  // Fetch data using the imported singleton's command
  // Assuming fetchCommand does not require parameters for this list context
  importedGreenhouseVMInstance.fetchCommand.execute();
});
</script>

<style scoped>
.list-container {
  padding: 16px;
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
