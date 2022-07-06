<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps({
  mode: {
    type: String,
    required: false,
    default: null,
  },
  link: {
    type: Boolean,
    required: false,
    default: false,
  },
  to: {
    type: String,
    reuired: false,
    default: "/",
  },
});

const modeClass = props.mode != null ? "button--" + props.mode : "";
</script>

<template>
  <button class="button" v-if="!link" :class="modeClass">
    <slot></slot>
  </button>
  <router-link class="button" v-else :to="to" :class="modeClass"
    ><slot></slot
  ></router-link>
</template>

<style lang="scss">
.button {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
  &:hover,
  &:active {
    background-color: #270041;
    border-color: #270041;
  }
  &--flat {
    background-color: transparent;
    color: #3a0061;
    border: none;
    &:hover,
    &:active {
      background-color: #edd2ff;
    }
  }
  &--outline {
    background-color: transparent;
    border-color: #270041;
    color: #270041;
    &:hover,
    &:active {
      background-color: #edd2ff;
    }
  }
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}
</style>
