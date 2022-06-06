<template>
  <section>FILTER</section>

  <section class="controls">
    <base-card>
      <base-button>Refresh</base-button>
      <base-button link to="/register">Register as a Coach</base-button>
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
    </base-card>
  </section>
</template>

<script lang="ts">
import { useCoachesStore } from "@/store";

import CoachItem from "@/components/coaches/CoachItem.vue";
import BaseButton from "@/components/ui/BaseButton.vue";

export default {
  components: {
    CoachItem,
    BaseButton,
  },
  setup() {
    const coaches = useCoachesStore();

    return { coaches };
  },
};
</script>
