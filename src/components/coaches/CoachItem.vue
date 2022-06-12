<template>
  <li class="coach">
    <h3 class="coach__fullname">{{ fullName }}</h3>
    <h4 class="coach__rate">${{ rate }}/hour</h4>
    <section class="skills">
      <base-badge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></base-badge>
    </section>
    <section class="actions">
      <base-button link mode="flat" :to="coachContactLink">
        Contact
      </base-button>
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
      return this.$route.path + "/" + this.id + "/contact";
    },
    coachDetailLink(): string {
      return this.$route.path + "/" + this.id;
    },
  },
});
</script>

<style lang="scss">
.skills {
  margin: 0.5rem 0;
}

.coach {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
  &__fullname {
    font-size: 1.5rem;
  }
  &__fullname,
  &__rate {
    margin: 0.5rem 0;
  }
}
.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
