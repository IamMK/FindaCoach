import { defineStore } from "pinia";
import { useAuthStore } from "./auth";
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
      const userId = useAuthStore().userId;
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
      const userId = useAuthStore().userId;
      const token = useAuthStore().token;
      const response = await fetch(
        `https://findacoach-37458-default-rtdb.europe-west1.firebasedatabase.app/requests/${userId}.json?auth=${token}`
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error("Failed to fetch Request");
        throw error;
      }

      const requests = [];

      for (const key in responseData) {
        const request: request = {
          id: key,
          coachId: userId,
          message: responseData[key].message,
          userEmail: responseData[key].userEmail,
        };
        requests.push(request);
      }
      this.requests = requests;
    },
  },
});
