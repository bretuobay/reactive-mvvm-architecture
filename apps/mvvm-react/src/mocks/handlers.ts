import { http, HttpResponse } from 'msw';

// Define the base URL of your API.
// This should match the baseUrl used in your RestfulApiViewModel or model configurations.
// The view models use '/api' as a base, so MSW needs to intercept that.
// Assuming the tests run in an environment where 'http://localhost' is the base.
const API_BASE_URL = '/api'; // This will be prefixed by the test server's origin

export const handlers = [
  http.get(`${API_BASE_URL}/greenhouses`, ({ request }) => {
    console.log(`MSW intercepted GET ${request.url}`);
    return HttpResponse.json([]);
  }),
  http.get(`${API_BASE_URL}/sensors`, ({ request }) => {
    console.log(`MSW intercepted GET ${request.url}`);
    return HttpResponse.json([]);
  }),
  http.get(`${API_BASE_URL}/sensor-readings`, ({ request }) => {
    console.log(`MSW intercepted GET ${request.url}`);
    return HttpResponse.json([]);
  }),
  http.get(`${API_BASE_URL}/threshold-alerts`, ({ request }) => {
    console.log(`MSW intercepted GET ${request.url}`);
    return HttpResponse.json([]);
  }),
];
