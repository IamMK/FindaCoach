<template>
  <section>FILTER</section>
  <section class="controls">
    <button>Refresh</button>
    <router-link to="/register">Register as a Coach</router-link>
  </section>
  <section>
    <h2>Coaches</h2>
    <ul v-if="coaches.coachesNotEmpty">
      <coach-item
        v-for="coach in coaches.coaches"
        :key="coach.id"
        :id="coach.id"
        :first-name="coach.firstName"
        :last-name="coach.lastName"
        :rate="coach.hourlyRate"
        :areas="coach.areas"
      ></coach-item>
    </ul>
    <h3 v-else>And coacherów niet</h3>
  </section>
</template>

<script lang="ts">
import { useCoachesStore } from "@/store";

import CoachItem from "@/components/coaches/CoachItem.vue";

export default {
  components: {
    CoachItem,
  },
  setup() {
    const coaches = useCoachesStore();

    return { coaches };
  },
};
</script>
