import { defineStore } from "pinia";
import { useMainStore } from "./main";
import { request } from "@/types/requestTypes";

// const main = useMainStore();

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
    async addRequest(data: {
      email: string;
      message: string;
      coachId: string | string[];
    }) {
      const newRequest: request = {
        userEmail: data.email,
        message: data.message,
      };
      const request = await fetch(
        `https://findacoach-37458-default-rtdb.europe-west1.firebasedatabase.app/requests/${data.coachId}.json`,
        {
          method: "POST",
          body: JSON.stringify(newRequest),
        }
      );
      const response = await request.json();

      if (!request.ok) {
        const error = new Error(response.message || "Failed to send Request");
        throw error;
      }

      newRequest.id = response.name;
      newRequest.coachId = response.coachId;

      // console.log(response);

      this.requests.push(newRequest);
    },
    async fetchRequest() {
      const userId = useMainStore().userId;
      const request = await fetch(
        `https://findacoach-37458-default-rtdb.europe-west1.firebasedatabase.app/requests/${userId}.json`
      );
      const response = await request.json();

      if (!request.ok) {
        const error = new Error("Failed to fetch Request");
        throw error;
      }

      const requests = [];

      for (const key in response) {
        const request: request = {
          id: key,
          coachId: userId,
          message: response[key].message,
          userEmail: response[key].userEmail,
        };
        requests.push(request);
      }
      this.requests = requests;
    },
  },
});
