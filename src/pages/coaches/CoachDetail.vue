<template>
  <section>
    <base-card>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </base-card>
  </section>
  <section>
    <base-card>
      <header>
        <h2>Interested? Reach us now</h2>
        <base-button link :to="contactLink">Contact</base-button>
      </header>
      <router-view></router-view>
    </base-card>
  </section>
  <section>
    <base-card>
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
      <p>{{ description }}</p>
    </base-card>
  </section>
</template>

<script lang="ts">
import { useCoachesStore } from "@/store";
import { defineComponent } from "@vue/runtime-core";
export default defineComponent({
  props: { id: String },
  computed: {
    contactLink() {
      return this.$route.path + "/contact"; //do poprawy all routes
    },
  },
  setup(props) {
    const coachList = useCoachesStore();

    const selectedCoach = coachList.coaches.find(
      (coach) => coach.id === props.id
    );
    const fullName = selectedCoach
      ? selectedCoach.firstName + " " + selectedCoach.lastName
      : console.log();
    console.log(fullName);

    return {
      fullName,
      rate: selectedCoach?.hourlyRate,
      areas: selectedCoach?.areas,
      description: selectedCoach?.description,
    };
  },
});
</script>
