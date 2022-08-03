import { defineStore } from "pinia";
import { coachesList } from "@/types/coachesTypes";
import { useMainStore } from "./main";

export const useCoachesStore = defineStore("coaches", {
  state: () => {
    return {
      coaches: [
        // {
        //   id: "c1",
        //   firstName: "Maximilian",
        //   lastName: "Schwarzmüller",
        //   areas: ["frontend", "backend", "career"],
        //   description:
        //     "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
        //   hourlyRate: 30,
        // },
        // {
        //   id: "c2",
        //   firstName: "Julie",
        //   lastName: "Jones",
        //   areas: ["frontend", "career"],
        //   description:
        //     "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
        //   hourlyRate: 30,
        // },
      ] as coachesList[],
    };
  },
  getters: {
    coachesNotEmpty: (state: { coaches: coachesList[] }): boolean => {
      return state.coaches.length > 0;
    },
    isCoach: (state) => {
      const coaches = state.coaches;
      const userId = useMainStore().userId;

      return coaches.some((coach) => coach.id === userId);
    },
  },
  actions: {
    async registerCoach(coachData: coachesList) {
      const userId = useMainStore().userId;
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
    async loadCoaches() {
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

      console.log(coaches);
      this.coaches = coaches;
      console.log(this.coaches);
    },
  },
});
