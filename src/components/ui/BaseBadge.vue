<template>
  <span class="badge" :class="type">
    {{ text }}
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    type: String,
    title: String,
  },
  computed: {
    text(): string {
      if (this.title === undefined) throw Error;
      return this.title.toUpperCase();
    },
  },
});
</script>
