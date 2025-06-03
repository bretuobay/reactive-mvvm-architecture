import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Dashboard from './components/Dashboard.vue';
import GreenhouseList from './components/GreenhouseList.vue';
import SensorList from './components/SensorList.vue';
import SensorReadingList from './components/SensorReadingList.vue';
import ThresholdAlertList from './components/ThresholdAlertList.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/greenhouses',
    name: 'GreenhouseList',
    component: GreenhouseList,
  },
  {
    // Expects greenhouseId as a route parameter
    path: '/sensors/:greenhouseId',
    name: 'SensorList',
    component: SensorList,
    props: true, // Pass route.params to component as props
  },
  {
    // Expects greenhouseId and sensorId as route parameters
    path: '/sensor-readings/:greenhouseId/:sensorId',
    name: 'SensorReadingList',
    component: SensorReadingList,
    props: true, // Pass route.params to component as props
  },
  {
    path: '/threshold-alerts',
    name: 'ThresholdAlertList',
    component: ThresholdAlertList,
  },
  // TODO: Add a route for individual greenhouse details, e.g., /greenhouse/:id
  // TODO: Add a route for individual sensor details, e.g., /sensor/:id (if different from readings)
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // import.meta.env.BASE_URL is common for Vite projects
  routes,
});

export default router;
