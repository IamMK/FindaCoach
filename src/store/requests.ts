import { defineStore } from "pinia";
import { useMainStore } from "./main";
import { request } from "@/types/requestTypes";

export const useRequestsStore = defineStore("requests", {
  state: () => {
    return {
      requests: [] as request[],
    };
  },
  getters: {
    hasRequests(): boolean {
      return this.receivedRequest.length > 0;
    },
    receivedRequest: (state): request[] => {
      const userId = useMainStore().userId;
      return state.requests.filter((request) => request.coachId === userId);
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
