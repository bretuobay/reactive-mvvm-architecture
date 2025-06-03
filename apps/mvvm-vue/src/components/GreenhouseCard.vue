<template>
  <div class="card">
    <div v-if="greenhouseData">
      <router-link :to="`/sensors/${greenhouseData.id}`" class="card-header-link">
        <h3>{{ greenhouseData.name }}</h3>
      </router-link>
      <p>Location: {{ greenhouseData.location }}</p>
      <p>Description: {{ greenhouseData.description }}</p>
      <!-- Link to view all greenhouses (list) - if not already on that list -->
      <router-link to="/greenhouses" class="details-link">View all greenhouses</router-link>
    </div>
    <div v-else>
      <p>Loading greenhouse data...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { GreenhouseViewModel } from '@repo/view-models';
import { useObservable } from '../hooks/useObservable';
// import { useRouter } from 'vue-router'; // Not strictly needed if using <router-link>

const props = defineProps<{
  viewModel: GreenhouseViewModel;
}>();

const greenhouseData = useObservable(props.viewModel.data$);
// const router = useRouter(); // For programmatic navigation if needed

// const navigateToSensors = () => {
//   if (greenhouseData.value) {
//     router.push(`/sensors/${greenhouseData.value.id}`);
//   }
// };
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  padding: 16px;
  margin: 8px;
  border-radius: 8px;
}
.card-header-link h3 {
  color: #007bff; /* Bluish color */
  text-decoration: none;
  margin-bottom: 8px;
}
.card-header-link:hover h3 {
  text-decoration: underline;
}
.details-link {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.9em;
  color: #0056b3;
}
</style>
