<template>
  <header class="header">
    <router-link to="/" class="header-item">Dashboard</router-link>
    <nav class="flex-container">
      <router-link to="/greenhouses" class="header-item">Greenhouses</router-link>
      <router-link to="/sensors" class="header-item">Sensors</router-link>
      <router-link to="/sensor-readings" class="header-item">Sensor Readings</router-link>
      <router-link to="/threshold-alerts" class="header-item">Threshold Alerts</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
};
</script>
<style scoped>
a {
  font-weight: 500;
}
</style>
