<template>
  <header class="header">
    <nav class="navigation">
      <h1 class="navigation__title">Find a Coach</h1>
      <ul class="navigation__linkWrapper">
        <li class="navigation__link">
          <router-link to="/">Home</router-link>
        </li>
        <li class="navigation__link">
          <router-link to="requests">Request</router-link>
        </li>
        <li class="navigation__link">
          <router-link to="register">Register</router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
.header {
  background-color: rgb(66, 66, 233);
  padding: 2em;
  color: rgb(230, 230, 230);
  .navigation {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    &__linkWrapper {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      list-style: none;
    }
    &__link {
      padding: 10px;
      a {
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
