<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
  </li>
  <div>
    <base-badge
      v-for="area in areas"
      :key="area"
      :type="area"
      :title="area"
    ></base-badge>
  </div>
  <section class="actions">
    <base-button link :to="coachContactLink"> Contact </base-button>
    <base-button link :to="coachDetailLink">View Details</base-button>
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
