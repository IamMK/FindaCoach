<template>
  <h3>{{ fullName }}</h3>
  <h4>${{ rate }}/hour</h4>
  <section class="actions">
    <router-link :to="coachContactLink"> Contact </router-link>
    <router-link :to="coachDetailLink">View Details</router-link>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    id: String,
    firstName: String,
    lastName: String,
    rate: Number,
    areas: String,
  },
  computed: {
    fullName(): string {
      return this.firstName + " " + this.lastName;
    },
    coachContactLink(): string {
      return this.$route.path + "/coaches/" + this.id + "/contact";
    },
    coachDetailLink(): string {
      return this.$route.path + "/coaches/" + this.id;
    },
  },
});
</script>
