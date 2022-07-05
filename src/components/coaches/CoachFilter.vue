<script setup lang="ts">
import { defineEmits, reactive } from "vue";

let filters = reactive({
  frontend: true,
  backend: true,
  career: true,
});

const emit = defineEmits(["change-filter"]);

const setFilter = () => {
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
        v-model="filters.career"
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
