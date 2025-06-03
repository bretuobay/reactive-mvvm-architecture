<template>
  <div class="list-container">
    <h5>Readings for Sensor {{ sensorId }}</h5>
    <div v-if="sensorReadingViewModel">
      <SensorReadingCard :view-model="sensorReadingViewModel" />
    </div>
    <div v-else-if="isLoading">
      <p>Loading sensor readings...</p>
    </div>
    <div v-else>
      <p>No readings available for this sensor.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue';
import { SensorReadingViewModel } from '@repo/view-models';
import SensorReadingCard from './SensorReadingCard.vue';
import { useObservable } from '../hooks/useObservable'; // Assuming isLoading$ is on the VM

const props = defineProps<{
  sensorId: string;
  greenhouseId: string; // Required by SensorReadingViewModel constructor
}>();

// A new ViewModel is created when the component is setup.
// It could also be passed as a prop or injected.
const sensorReadingViewModel = ref<SensorReadingViewModel | null>(null);
// We need to observe isLoading on the ViewModel instance if it exists
// For simplicity, let's assume the card itself handles its loading state internally for now
// or that SensorReadingViewModel doesn't have its own isLoading$
// const isLoading = useObservable(sensorReadingViewModel.value?.isLoading$); // This would require careful handling

watch(
  () => [props.sensorId, props.greenhouseId],
  ([newSensorId, newGreenhouseId]) => {
    if (newSensorId && newGreenhouseId) {
      // Create a new ViewModel instance when sensorId or greenhouseId changes
      const newViewModel = new SensorReadingViewModel(newSensorId, newGreenhouseId);
      sensorReadingViewModel.value = newViewModel;
      // The SensorReadingCard will use this new viewModel to fetch and display data.
      // If the ViewModel has a fetch method, it could be called here,
      // but it's often handled within the ViewModel's constructor or on subscription.
    } else {
      sensorReadingViewModel.value = null;
    }
  },
  { immediate: true }
);

// No explicit onMounted fetch call here, assuming ViewModel handles it
// or the card triggers it.
</script>

<style scoped>
.list-container {
  padding: 10px;
  margin-top: 8px;
  border-top: 1px solid #f0f0f0;
}
</style>
