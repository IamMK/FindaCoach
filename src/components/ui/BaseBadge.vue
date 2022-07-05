<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  type: String,
  title: String,
});

const text = props.title ? props.title.toUpperCase() : "";
</script>

<template>
  <span class="skills__badge" :class="'skills__badge--' + type">
    {{ text }}
  </span>
</template>

<style lang="scss">
.skills__badge {
  background-color: #ccc;
  color: #252525;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  &--frontend {
    background-color: #3d008d;
    color: white;
  }

  &--backend {
    background-color: #71008d;
    color: white;
  }

  &--career {
    background-color: #8d006e;
    color: white;
  }
}
</style>
