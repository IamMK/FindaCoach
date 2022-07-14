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
