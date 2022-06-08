<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
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
  </li>
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

<style scoped lang="scss">
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
