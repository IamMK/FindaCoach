<script setup lang="ts">
export type coachesFilter = {
  frontend: boolean;
  backend: boolean;
  career: boolean;
};

import { useCoachesStore } from "@/store";

import CoachItem from "@/components/coaches/CoachItem.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import coachFilter from "@/components/coaches/CoachFilter.vue";
import { reactive, computed } from "@vue/reactivity";
import { coachesList } from "@/store/coaches";

const coaches = useCoachesStore();

let activeFilters = reactive({
  filters: { frontend: true, backend: true, career: true },
});

const setFilters = (updatedFilters: coachesFilter) => {
  activeFilters.filters = updatedFilters;
};

const filteredCoaches = computed(() => {
  const coachesTemp = structuredClone(coaches.coaches);

  return coachesTemp.filter((coach: coachesList) => {
    if (activeFilters.filters.frontend && coach.areas.includes("frontend")) {
      return true;
    }
    if (activeFilters.filters.backend && coach.areas.includes("backend")) {
      return true;
    }
    if (activeFilters.filters.career && coach.areas.includes("career")) {
      return true;
    }
  });
});
</script>

<template>
  <section><coach-filter @change-filter="setFilters" /></section>

  <section class="controls">
    <base-card>
      <base-button mode="flat">Refresh</base-button>
      <base-button link to="/register">Register as a Coach</base-button>
      <h2>Coaches</h2>
      <ul class="coach__container" v-if="coaches.coachesNotEmpty">
        <coach-item
          v-for="coach in filteredCoaches"
          :key="coach.id"
          :id="coach.id"
          :first-name="coach.firstName"
          :last-name="coach.lastName"
          :rate="coach.hourlyRate"
          :areas="coach.areas"
        ></coach-item>
      </ul>
      <h3 v-else>And coacherów niet</h3>
    </base-card>
  </section>
</template>

<style lang="scss">
.coach__container {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
