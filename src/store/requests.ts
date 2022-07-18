import { defineStore } from "pinia";

export type request = {
  id: string;
  userEmail: string;
  message: string;
  coachId: string | string[];
};

export const useRequestsStore = defineStore("requests", {
  state: () => {
    return {
      requests: [] as request[],
    };
  },
  getters: {
    hasRequests: (state) => {
      return state.requests.length > 0 && state.requests;
    },
  },
  actions: {
    addRequest(data: {
      email: string;
      message: string;
      coachId: string | string[];
    }) {
      const newRequest: request = {
        id: new Date().toISOString(),
        userEmail: data.email,
        message: data.message,
        coachId: data.coachId,
      };
      this.requests.push(newRequest);
    },
  },
});
