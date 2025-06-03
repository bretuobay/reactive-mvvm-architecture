<template>
  <div class="card" :class="{ 'alert-active': alertData?.isActive }">
    <div v-if="alertData">
      <router-link
        :to="`/sensor-readings/${alertData.greenhouseId}/${alertData.sensorId}`"
        class="card-header-link"
        title="View sensor readings for this alert"
      >
        <h5>Threshold Alert: {{ alertData.sensorName }} (Sensor ID: {{ alertData.sensorId }})</h5>
      </router-link>
      <p>Threshold: {{ alertData.thresholdValue }} {{ alertData.unit }} ({{ alertData.thresholdType }})</p>
      <p>Current Value: {{ alertData.currentValue }} {{ alertData.unit }}</p>
      <p>Severity: {{ alertData.severity }}</p>
      <p>Active: {{ alertData.isActive ? 'Yes' : 'No' }}</p>
      <p v-if="alertData.triggeredAt">Triggered At: {{ new Date(alertData.triggeredAt).toLocaleString() }}</p>
      <p v-if="!alertData.isActive && alertData.resolvedAt">
        Resolved At: {{ new Date(alertData.resolvedAt).toLocaleString() }}
      </p>
      <!-- Link to view all active alerts -->
      <router-link to="/threshold-alerts" class="details-link">View all active alerts</router-link>
    </div>
    <div v-else>
      <p>Loading alert data...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { ThresholdAlertViewModel, ThresholdAlertWithSensorData } from '@repo/view-models';
import { useObservable } from '../hooks/useObservable';

const props = defineProps<{
  viewModel: ThresholdAlertViewModel;
}>();

// data$ on ThresholdAlertViewModel is expected to emit ThresholdAlertWithSensorData
const alertData = useObservable(props.viewModel.data$ as import('rxjs').Observable<ThresholdAlertWithSensorData | undefined>);
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
  border-left: 5px solid red;
  background-color: #fff0f0;
}
.card-header-link h5 {
  color: #007bff; /* Bluish color for active link */
  text-decoration: none;
  margin-bottom: 6px;
}
.alert-active .card-header-link h5 {
  color: #c00; /* More prominent color for active alerts */
}
.card-header-link:hover h5 {
  text-decoration: underline;
}
.details-link {
  display: inline-block;
  margin-top: 6px;
  font-size: 0.85em;
  color: #0056b3;
}
</style>
