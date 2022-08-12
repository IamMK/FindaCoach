import { defineStore } from "pinia";
import { coachesList } from "@/types/coachesTypes";
import { useAuthStore } from "./auth";

export const useCoachesStore = defineStore("coaches", {
  state: () => {
    return {
      lastFetch: null as null | number,
      coaches: [] as coachesList[],
    };
  },
  getters: {
    coachesNotEmpty: (state: { coaches: coachesList[] }): boolean => {
      return state.coaches.length > 0;
    },
    isCoach: (state) => {
      const coaches = state.coaches;
      const userId = useAuthStore().userId;

      return coaches.some((coach) => coach.id === userId);
    },
    shouldUpdate: (state) => {
      const lastFetch = state.lastFetch;
      if (!lastFetch) {
        return true;
      }
      const currentTimeStamp = new Date().getTime();
      return currentTimeStamp - lastFetch - 1000 > 60;
    },
  },
  actions: {
    async registerCoach(coachData: coachesList) {
      const userId = useAuthStore().userId;
      const newCoach = {
        ...coachData,
        // id: "c" + (this.coaches.length + 1),
      };

      const response = await fetch(
        `https://findacoach-37458-default-rtdb.europe-west1.firebasedatabase.app/coaches/${userId}.json`,
        {
          method: "PUT",
          body: JSON.stringify(newCoach),
        }
      );

      if (!response.ok) {
        // error
      }

      this.coaches.push({ ...newCoach, id: userId });
    },
    async loadCoaches(payload: { forceRefresh: boolean }) {
      if (!payload.forceRefresh && !this.shouldUpdate) {
        return;
      }
      const response = await fetch(
        "https://findacoach-37458-default-rtdb.europe-west1.firebasedatabase.app/coaches.json"
      );

      const responseData: coachesList[] = await response.json();

      if (!response.ok) {
        const error = new Error("Failed to fetch");
        throw error;
      }

      const coaches = [];

      for (const key in responseData) {
        const coach: coachesList = {
          id: key,
          firstName: responseData[key].firstName,
          lastName: responseData[key].lastName,
          description: responseData[key].description,
          hourlyRate: responseData[key].hourlyRate,
          areas: responseData[key].areas,
        };
        coaches.push(coach);
      }

      this.coaches = coaches;
      this.setFetchTimeStamp;
    },
    setFetchTimeStamp() {
      this.lastFetch = new Date().getTime();
    },
  },
});
