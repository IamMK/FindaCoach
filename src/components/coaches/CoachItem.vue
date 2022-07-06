<script setup lang="ts">
import { defineProps } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const props = defineProps({
  id: String,
  firstName: String,
  lastName: String,
  rate: Number,
  areas: Array as () => Array<string>,
});

const coachContactLink = route.path + "/" + props.id + "/contact";
const coachDetailLink = route.path + "/" + props.id;

const fullName = props.firstName + " " + props.lastName;
</script>

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
