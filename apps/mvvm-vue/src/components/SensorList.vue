<template>
  <div class="list-container">
    <h4>Sensors for Greenhouse {{ greenhouseId }}</h4>
    <div v-if="sensorVMs && sensorVMs.length > 0">
      <SensorCard
        v-for="sensorViewModel in sensorVMs"
        :key="sensorViewModel.id"
        :view-model="sensorViewModel"
      />
    </div>
    <div v-else-if="isLoading">
      <p>Loading sensors...</p>
    </div>
    <div v-else>
      <p>No sensors found for this greenhouse.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps, watch } from 'vue';
import {
  SensorViewModel,
  SensorListViewModel,
  Sensor,
} from '@repo/view-models';
import SensorCard from './SensorCard.vue';
import { useObservable } from '../hooks/useObservable';

const props = defineProps<{
  greenhouseId: string;
}>();

// A new ListViewModel is created when the component is setup.
// It could also be passed as a prop or injected if preferred.
const listViewModel = new SensorListViewModel(props.greenhouseId);

const sensorVMs = ref<SensorViewModel[]>([]);
const isLoading = useObservable(listViewModel.isLoading$);
const sensors = useObservable(listViewModel.sensors$);

// When sensors data changes (due to fetch or props.greenhouseId change),
// create view models for each sensor.
watch(sensors, (newSensors) => {
  if (newSensors) {
    sensorVMs.value = newSensors.map(s => new SensorViewModel(s.id, s));
  } else {
    sensorVMs.value = [];
  }
}, { immediate: true });

// Watch for changes in greenhouseId prop to update the view model
watch(() => props.greenhouseId, (newId) => {
  listViewModel.updateGreenhouseId(newId); // Assumes SensorListViewModel has this method
  listViewModel.fetchSensors();
});

onMounted(() => {
  listViewModel.fetchSensors(); // Initial fetch
});
</script>

<style scoped>
.list-container {
  padding: 12px;
  margin-top: 10px;
  border-top: 1px solid #eee;
}
</style>
