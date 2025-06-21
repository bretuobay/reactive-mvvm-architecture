<template>
  <router-link to="/" class="back-button">
    <BackArrow class="back-arrow" />
  </router-link>
  <section class="flex-container flex-row">
    <form class="form-container" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Greenhouse Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          v-model="formData.name"
          required
          class="input-field"
          placeholder="Enter greenhouse name"
        />
      </div>

      <div class="form-group">
        <label for="location">Location:</label>
        <textarea
          id="location"
          name="location"
          v-model="formData.location"
          required
          rows="3"
          class="textarea-field"
          placeholder="Location"
        ></textarea>
      </div>

      <div class="form-group">
        <label for="size">Size:</label>
        <select id="size" class="select-field" name="size" v-model="formData.size" required>
          <option value="">Select size</option>
          <option value="25sqm">25sqm / Small</option>
          <option value="50sqm">50sqm / Medium</option>
          <option value="100sqm">100sqm / Large</option>
        </select>
      </div>

      <div class="form-group">
        <label for="cropType">Crop Type:</label>
        <input
          type="text"
          name="cropType"
          id="cropType"
          v-model="formData.cropType"
          class="input-field"
          placeholder="Enter crop type"
        />
      </div>

      <button type="submit" class="button">Submit</button>
    </form>

    <div class="card" style="max-width: 600px">
      <h1 class="card-title">Greenhouses</h1>
      <div v-if="isLoading" class="card-content">
        <p>Loading greenhouses...</p>
      </div>
      <div v-else-if="greenhouses && greenhouses.length > 0">
        <ul class="card-content list">
          <li v-for="gh in greenhouses" :key="gh.id" class="list-item" style="font-size: 1.8rem; justify-content: space-between">
            <span>{{ gh.name }}</span>
            <div class="button-group">
              <button class="button-tiny button-tiny-delete" @click="handleDelete(gh.id)">
                Delete
              </button>
              <button class="button-tiny button-tiny-edit" @click="handleUpdate(gh.id)">
                Edit
              </button>
            </div>
          </li>
        </ul>
      </div>
      <div v-else>
        <p class="card-content">No greenhouses found.</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue';
import { greenHouseViewModel } from '@repo/view-models/GreenHouseViewModel';
import { useObservable } from '../hooks/useObservable';
import BackArrow from '../assets/back-arrow.svg?component'; // Use ?component to import as a Vue component
import type { GreenHouseModel } from '@repo/models/GreenHouseModel';


const isLoading = useObservable(greenHouseViewModel.isLoading$, true);
const greenhouses = useObservable(greenHouseViewModel.data$, [] as GreenHouseModel[]);

const greenHouseSizeOptions = ['25sqm', '50sqm', '100sqm'] as const;

const initialFormData = {
  name: '',
  location: '',
  size: '',
  cropType: '',
};
const formData = reactive({ ...initialFormData });
// To store the ID of the greenhouse being edited
const editingGreenhouseId = ref<string | null | undefined>(null);


onMounted(() => {
  greenHouseViewModel.fetchCommand.execute();
});

const handleSubmit = (event: Event) => {
  const form = event.target as HTMLFormElement;
  const nativeFormData = new FormData(form);
  const name = nativeFormData.get('name') as string;
  const location = nativeFormData.get('location') as string;
  const size = nativeFormData.get('size') as string;
  const cropType = nativeFormData.get('cropType') as string;

  const data = { name, location, size, cropType };

  if (editingGreenhouseId.value) {
     const existingGreenhouse = greenhouses.value?.find((gh) => gh.id === editingGreenhouseId.value);
     if (existingGreenhouse) {
        greenHouseViewModel.updateCommand.execute({
            id: existingGreenhouse.id || '',
            ...existingGreenhouse,
            name: data.name,
            location: data.location,
            size: data.size,
            cropType: data.cropType,
        });
     }
  } else {
    const existingGreenhouseByName = greenhouses.value?.find((gh) => gh.name === name);
    if (existingGreenhouseByName) {
      console.error('Greenhouse with this name already exists:', name);
       greenHouseViewModel.updateCommand.execute({
        id: existingGreenhouseByName.id || '',
        ...existingGreenhouseByName,
        name: data.name,
        location: data.location,
        size: data.size,
        cropType: data.cropType,
      });
      return;
    }
    // @ts-ignore - known issue with single object vs array
    greenHouseViewModel.createCommand.execute(data);
  }

  // Reset form and editing state
  Object.assign(formData, initialFormData);
  editingGreenhouseId.value = null;
  // Optionally, reset the native form if not using v-model for everything (though we are)
  form.reset();
};

const handleDelete = (id?: string) => {
  if (!id) {
    console.error('No ID provided for deletion');
    return;
  }
  greenHouseViewModel.deleteCommand.execute(id);
};

const handleUpdate = (id?: string) => {
  const greenhouse = greenhouses.value?.find((gh) => gh.id === id);
  if (!greenhouse) {
    console.error('Greenhouse not found for update:', id);
    return;
  }
  formData.name = greenhouse.name;
  formData.location = greenhouse.location;

  if (!greenHouseSizeOptions.includes(greenhouse.size as typeof greenHouseSizeOptions[number])) {
    console.error('Invalid greenhouse size:', greenhouse.size);
    formData.size = '100sqm'; // Default to '100sqm' if invalid
  } else {
    formData.size = greenhouse.size;
  }
  formData.cropType = greenhouse.cropType || '';
  editingGreenhouseId.value = greenhouse.id;
};
</script>

<style scoped>
/* Using global styles where possible, but some might be needed here */
.back-button {
  display: inline-block;
  margin-bottom: 1rem;
}
.back-arrow {
  width: 24px; /* Or your desired size */
  height: 24px; /* Or your desired size */
}
.flex-container {
  display: flex;
  gap: 2rem; /* Add some space between form and list */
}
.flex-row {
  flex-direction: row;
}
.form-container {
  flex: 1; /* Allow form to take available space */
  max-width: 500px; /* Or as desired */
}
.form-group {
  margin-bottom: 1rem;
}
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}
.input-field,
.textarea-field,
.select-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Include padding and border in the element's total width and height */
}
.textarea-field {
  resize: vertical;
}
.button {
  padding: 0.75rem 1.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}
.button:hover {
  background-color: #0056b3;
}
.card {
  flex: 1.5; /* Allow card to take more space if needed */
  /* Assuming card styles are global, otherwise replicate/import */
}
.list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}
.list-item:last-child {
  border-bottom: none;
}
.button-group .button-tiny {
  margin-left: 0.5rem;
}

/* Add styles for button-tiny, button-tiny-delete, button-tiny-edit if not globally available */
.button-tiny {
  padding: 0.25rem 0.5rem;
  font-size: 0.8rem;
  border-radius: 3px;
}
.button-tiny-delete {
  background-color: #dc3545;
  color: white;
  border: 1px solid #dc3545;
}
.button-tiny-delete:hover {
  background-color: #c82333;
}
.button-tiny-edit {
  background-color: #ffc107;
  color: #212529;
  border: 1px solid #ffc107;
}
.button-tiny-edit:hover {
  background-color: #e0a800;
}

</style>
