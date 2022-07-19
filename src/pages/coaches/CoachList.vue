<script setup lang="ts">
import { useCoachesStore } from "@/store/coaches";

import CoachItem from "@/components/coaches/CoachItem.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import coachFilter from "@/components/coaches/CoachFilter.vue";
import { computed } from "@vue/reactivity";
import { coachesList } from "@/types/coachesTypes";
import { useMainStore } from "@/store/main";
import { onMounted } from "vue";

const coaches = useCoachesStore();
const main = useMainStore();

let activeFilters = main.filter;

const filteredCoaches = computed(() => {
  const coachesTemp = structuredClone(coaches.coaches);

  return coachesTemp.filter((coach: coachesList) => {
    if (activeFilters.frontend && coach.areas.includes("frontend")) {
      return true;
    }
    if (activeFilters.backend && coach.areas.includes("backend")) {
      return true;
    }
    if (activeFilters.career && coach.areas.includes("career")) {
      return true;
    }
  });
});

const loadCoaches = () => {
  coaches.loadCoaches();
};

onMounted(() => {
  loadCoaches();
});
</script>

<template>
  <section><coach-filter /></section>

  <section class="controls">
    <base-card>
      <base-button mode="flat" @click="loadCoaches">Refresh</base-button>
      <base-button v-if="!coaches.isCoach" link to="/register"
        >Register as a Coach</base-button
      >
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
