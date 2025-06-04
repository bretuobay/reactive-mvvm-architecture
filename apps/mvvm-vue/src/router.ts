import { createRouter, createWebHistory } from "vue-router";

const routes: Array<any> = [
  {
    path: "/",
    name: "Dashboard",
    component: import("./components/Dashboard.vue"), // Lazy-loaded component
  },
  {
    path: "/greenhouses",
    name: "GreenhouseList",
    component: import("./components/GreenhouseList.vue"),
  },
  {
    path: "/sensors",
    name: "SensorList",
    component: import("./components/SensorList.vue"),
    props: true,
  },
  {
    path: "/sensor-readings",
    name: "SensorReadingList",
    component: import("./components/SensorReadingList.vue"),
    props: true,
  },
  {
    path: "/threshold-alerts",
    name: "ThresholdAlertList",
    component: import("./components/ThresholdAlertList.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // import.meta.env.BASE_URL is common for Vite projects
  routes,
});

export default router;
