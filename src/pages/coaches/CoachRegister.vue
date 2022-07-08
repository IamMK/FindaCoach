<script setup lang="ts">
import CoachForm from "@/components/coaches/CoachForm.vue";
import { coachesList } from "@/store/coaches";

const saveData = (data: coachesList) => {
  console.log(data);
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
