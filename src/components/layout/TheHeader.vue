<script setup lang="ts">
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();
</script>

<template>
  <header class="header">
    <nav class="navigation">
      <h1 class="navigation__title">Find a Coach</h1>
      <ul class="navigation__linkWrapper">
        <li class="navigation__link">
          <router-link class="navigation__url" to="/">Home</router-link>
        </li>
        <li v-if="authStore.isAuthenticated" class="navigation__link">
          <router-link class="navigation__url" to="requests"
            >Request</router-link
          >
        </li>
        <li v-else class="navigation__link">
          <router-link class="navigation__url" to="auth">Login</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
.header {
  width: 100%;
  height: 5rem;
  background-color: #3d008d;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ddd;
}

.navigation {
  width: 90%;
  margin: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  &__linkWrapper {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__title {
    margin: 0;
  }
  &__link {
    margin: 0 0.5rem;
  }
  &__url {
    text-decoration: none;
    color: #f391e3;
    display: inline-block;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    &:active,
    &:hover,
    &.router-link-active {
      border: 1px solid #f391e3;
    }
  }
}
</style>
