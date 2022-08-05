<script setup lang="ts">
import { useRequestsStore } from "@/store/requests";
import { reactive } from "vue";
import { onMounted } from "vue";

import RequestItem from "@/components/requests/RequestItem.vue";

const state = reactive({ isLoading: false, error: null });

const requests = useRequestsStore();

const loadRequests = async () => {
  state.isLoading = true;
  try {
    await requests.fetchRequest();
  } catch (error: any) {
    state.error = error.message || "Sth went Wrong";
  }
  state.isLoading = false;
};

const handleError = () => {
  state.error = null;
};

onMounted(() => {
  loadRequests();
});
</script>

<template>
  <div>
    <base-dialog
      :show="!!state.error"
      title="An error occured"
      @close="handleError"
    ></base-dialog>
    <section>
      <base-card>
        <header>
          <h2>Requests Received</h2>
        </header>
        <base-spinner v-if="state.isLoading"></base-spinner>
        <ul v-else-if="requests.hasRequests && !state.isLoading">
          <request-item
            v-for="request in requests.receivedRequest"
            :key="request.id"
            :userEmail="request.userEmail"
            :message="request.message"
          ></request-item>
        </ul>
        <h3 v-else>You haven't any requests yet!</h3>
      </base-card>
    </section>
  </div>
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
