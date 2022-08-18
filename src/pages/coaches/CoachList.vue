<script setup lang="ts">
import { useCoachesStore } from "@/store/coaches";
import { useMainStore } from "@/store/main";
import { useAuthStore } from "@/store/auth";

import CoachItem from "@/components/coaches/CoachItem.vue";
import coachFilter from "@/components/coaches/CoachFilter.vue";
import { computed } from "@vue/reactivity";
import { coachesList } from "@/types/coachesTypes";
import { onMounted } from "vue";
import { reactive } from "vue";

const coaches = useCoachesStore();
const main = useMainStore();
const authStore = useAuthStore();

let activeFilters = main.filter;

const state = reactive({ isLoading: false, error: null });

const filteredCoaches = computed(() => {
  const coachesTemp = coaches.coaches;

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

const loadCoaches = async (refresh = false) => {
  state.isLoading = true;
  try {
    await coaches.loadCoaches({ forceRefresh: refresh });
  } catch (error: any) {
    state.error = error.message || "Sth went Wrong";
  }
  state.isLoading = false;
};

const handleError = () => {
  state.error = null;
};

onMounted(() => {
  loadCoaches();
});
</script>

<template>
  <div>
    <base-dialog
      :show="!!state.error"
      title="An error occured"
      @close="handleError"
    >
      <p>{{ state.error }}</p>
    </base-dialog>
    <section><coach-filter /></section>

    <section class="controls">
      <base-card>
        <base-button mode="flat" @click="loadCoaches(true)"
          >Refresh</base-button
        >
        <base-button link to="/auth" v-if="!authStore.isAuthenticated"
          >Login</base-button
        >
        <base-button
          v-if="
            authStore.isAuthenticated && !coaches.isCoach && !state.isLoading
          "
          link
          to="/register"
          >Register as a Coach</base-button
        >
        <div v-if="state.isLoading">
          <base-spinner></base-spinner>
        </div>
        <ul
          class="coach__container"
          v-else-if="!state.isLoading && coaches.coachesNotEmpty"
        >
          <coach-item
            v-for="coach in filteredCoaches"
            :key="(coach.id as string)"
            :id="(coach.id as string)"
            :first-name="coach.firstName"
            :last-name="coach.lastName"
            :rate="coach.hourlyRate"
            :areas="coach.areas"
          ></coach-item>
        </ul>
        <h3 v-else>And coacherów niet</h3>
      </base-card>
    </section>
  </div>
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
