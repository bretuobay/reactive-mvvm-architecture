<template>
  <div class="dashboard-container">
    <h1>MVVM Vue Dashboard</h1>

    <section class="dashboard-section">
      <ThresholdAlertList />
    </section>

    <section class="dashboard-section">
      <GreenhouseList />
    </section>

    <!--
      Future enhancements:
      - Display selected greenhouse details
      - Display SensorList for a selected greenhouse
      - Display SensorReadingList for a selected sensor
      - More sophisticated layout and data visualization
    -->
  </div>
</template>

<script setup lang="ts">
// Import the list components
import GreenhouseList from './GreenhouseList.vue';
import ThresholdAlertList from './ThresholdAlertList.vue';

// Composition API setup script
// No specific logic needed in the script block for this basic dashboard structure yet.
// Data fetching and management are handled by the individual list components.
</script>

<style scoped>
.dashboard-container {
  font-family: Arial, sans-serif;
  padding: 20px;
}

.dashboard-section {
  margin-bottom: 24px;
  padding: 16px;
  border: 1px solid #eaeaea;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 24px;
}
</style>
