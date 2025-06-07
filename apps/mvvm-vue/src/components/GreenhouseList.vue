<template>
  <router-link to="/">
    <div class="back-arrow" aria-label="Back to Dashboard"><BackArrow /></div>
  </router-link>
  <div class="card">
    <h2 class="" card-title>Greenhouses</h2>
    <div v-if="isLoading" class="card-content">
      <p>Loading greenhouses...</p>
    </div>
    <div v-else-if="greenhouses && greenhouses.length > 0">
      <ul class="card-content list">
        <li v-for="gh in greenhouses" :key="gh.id" class="list-item">
          {{ gh.name }} (ID: {{ gh.id }})
        </li>
      </ul>
    </div>
    <div v-else>
      <p class="card-content">No greenhouses found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { greenHouseViewModel as importedGreenhouseVMInstance } from "@repo/view-models/GreenHouseViewModel";
import { useObservable } from "../hooks/useObservable";
import BackArrow from "../assets/back-arrow.svg";

const isLoading = useObservable(importedGreenhouseVMInstance.isLoading$, true);
const greenhouses = useObservable(importedGreenhouseVMInstance.data$, []);

onMounted(() => {
  importedGreenhouseVMInstance.fetchCommand.execute();
});
</script>

<style scoped></style>
