<script setup lang="ts">
import { useRequestsStore } from "@/store/requests";

import RequestItem from "@/components/requests/RequestItem.vue";

const requests = useRequestsStore();
</script>

<template>
  <section>
    <base-card>
      <header>
        <h2>Requests Received</h2>
      </header>
      <ul v-if="requests.hasRequests">
        <request-item
          v-for="request in requests.requests"
          :key="request.id"
          :userEmail="request.userEmail"
          :message="request.message"
        ></request-item>
      </ul>
      <h3 v-else>You haven't any requests yet!</h3>
    </base-card>
  </section>
</template>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>
