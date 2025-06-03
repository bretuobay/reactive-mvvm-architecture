<template>
  <div class="list-container">
    <h3>Active Threshold Alerts</h3>
    <div v-if="alertVMs && alertVMs.length > 0">
      <ThresholdAlertCard
        v-for="alertViewModel in alertVMs"
        :key="alertViewModel.id"
        :view-model="alertViewModel"
      />
    </div>
    <div v-else-if="isLoading">
      <p>Loading alerts...</p>
    </div>
    <div v-else>
      <p>No active threshold alerts.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  ThresholdAlertViewModel,
  ThresholdAlertListViewModel,
  ThresholdAlertWithSensorData, // Assuming this is the type emitted by alerts$
} from '@repo/view-models';
import ThresholdAlertCard from './ThresholdAlertCard.vue';
import { useObservable } from '../hooks/useObservable';

// Assume a global or injected instance of ThresholdAlertListViewModel
// For simplicity, creating a new one here.
const listViewModel = new ThresholdAlertListViewModel();

const alertVMs = ref<ThresholdAlertViewModel[]>([]);
const isLoading = useObservable(listViewModel.isLoading$);
const alerts = useObservable(listViewModel.alerts$);

// When alerts data changes, create view models for each
listViewModel.alerts$.subscribe((activeAlerts: ThresholdAlertWithSensorData[]) => {
  alertVMs.value = activeAlerts.map(alert => new ThresholdAlertViewModel(alert.id, alert));
});

onMounted(() => {
  listViewModel.fetchAlerts(); // Trigger data fetching
});
</script>

<style scoped>
.list-container {
  padding: 16px;
  background-color: #fff5f5; /* Light red background for alert section */
  border-radius: 8px;
  margin-top: 16px;
}
h3 {
  color: #c00;
}
</style>
