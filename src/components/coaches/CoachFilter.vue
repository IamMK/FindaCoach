<script setup lang="ts">
import { defineEmits } from "vue";

let filters = {
  frontend: true,
  backend: true,
  carrer: true,
};

const emit = defineEmits(["change-filter"]);

// const filterValue = {
//   frontend: true,
//   backend: true,
//   career: true,
// };

// const setFilter = (filter: string) => {
//   console.log(filter);
// };

const setFilter = () => {
  // console.log(filters);

  // console.log(event);
  // const input = event.target ? event.target.id : "Dupa";
  // const isActive = event.target ? event.target.checked : "dupa";
  // const updatedFilters = {
  //   ...filters,
  //   [input]: isActive,
  // };
  // return updatedFilters;
  emit("change-filter", filters);
};
</script>

<template>
  <base-card>
    <h2>Find Your Coach</h2>
    <span class="filter-option">
      <input
        type="checkbox"
        name="frontend"
        id="frontend"
        v-model="filters.frontend"
        @change="setFilter"
        checked
      />
      <label for="frontend">Frontend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        name="backend"
        id="backend"
        v-model="filters.backend"
        @change="setFilter"
        checked
      />
      <label for="backend">Backend</label>
    </span>
    <span class="filter-option">
      <input
        type="checkbox"
        name="career"
        id="career"
        v-model="filters.carrer"
        @change="setFilter"
        checked
      />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>
