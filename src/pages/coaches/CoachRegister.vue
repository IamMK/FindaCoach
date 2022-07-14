<script setup lang="ts">
import CoachForm from "@/components/coaches/CoachForm.vue";
import { coachesList } from "@/types/types";
import { useCoachesStore } from "@/store/coaches";
import { useRouter } from "vue-router";

const store = useCoachesStore();
const router = useRouter();

const saveData = (data: coachesList) => {
  store.registerCoach(data);
  router.replace("/coaches");
};
</script>

<template>
  <section>
    <base-card>
      <h2>Register as a coach now!</h2>
      <coach-form @save-data="saveData" />
    </base-card>
  </section>
</template>
