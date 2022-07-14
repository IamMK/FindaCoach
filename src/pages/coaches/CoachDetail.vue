<script setup lang="ts">
import { useCoachesStore } from "@/store/coaches";
import { useRoute } from "vue-router";
import { defineProps } from "vue";

const props = defineProps({ id: String });

const coachList = useCoachesStore();
const selectedCoach = coachList.coaches.find(
  (coach: { id: string }) => coach.id === props.id
);

const areas = selectedCoach?.areas;
const rate = selectedCoach?.hourlyRate;
const description = selectedCoach?.description;
const fullName = selectedCoach?.firstName + " " + selectedCoach?.lastName;

const route = useRoute();
const contactLink = route.path + "/contact";
</script>

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
