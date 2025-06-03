<template>
  <div class="list-container">
    <h2>Greenhouses</h2>
    <div v-if="greenhouses && greenhouses.length > 0">
      <GreenhouseCard
        v-for="ghViewModel in greenhouseViewModels"
        :key="ghViewModel.id"
        :view-model="ghViewModel"
      />
    </div>
    <div v-else-if="isLoading">
      <p>Loading greenhouses...</p>
    </div>
    <div v-else>
      <p>No greenhouses found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  GreenhouseViewModel,
  GreenhouseListViewModel,
  Greenhouse,
} from '@repo/view-models';
import GreenhouseCard from './GreenhouseCard.vue';
import { useObservable } from '../hooks/useObservable';

// Assume a global or injected instance of GreenhouseListViewModel
// For simplicity, creating a new one here. In a real app, this might be provided.
const listViewModel = new GreenhouseListViewModel();

const greenhouseViewModels = ref<GreenhouseViewModel[]>([]);
const isLoading = useObservable(listViewModel.isLoading$); // Assuming isLoading$ exists

// Subscribe to the list of greenhouses
const greenhouses = useObservable(listViewModel.greenhouses$);

// When greenhouses data changes, create view models for each
listViewModel.greenhouses$.subscribe((ghs: Greenhouse[]) => {
  greenhouseViewModels.value = ghs.map(gh => new GreenhouseViewModel(gh.id, gh));
});

onMounted(() => {
  listViewModel.fetchGreenhouses(); // Trigger data fetching
});
</script>

<style scoped>
.list-container {
  padding: 16px;
}
</style>
