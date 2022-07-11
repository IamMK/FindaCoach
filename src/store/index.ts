import { defineStore } from "pinia";

export type coachesList = {
  id: string;
  firstName: string;
  lastName: string;
  areas: string[];
  description: string;
  hourlyRate: number;
};

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      userId: "c3",
    };
  },
});

export const useCoachesStore = defineStore("coaches", {
  state: () => {
    return {
      coaches: [
        {
          id: "c1",
          firstName: "Maximilian",
          lastName: "Schwarzmüller",
          areas: ["frontend", "backend", "career"],
          description:
            "I'm Maximilian and I've worked as a freelance web developer for years. Let me help you become a developer as well!",
          hourlyRate: 30,
        },
        {
          id: "c2",
          firstName: "Julie",
          lastName: "Jones",
          areas: ["frontend", "career"],
          description:
            "I am Julie and as a senior developer in a big tech company, I can help you get your first job or progress in your current role.",
          hourlyRate: 30,
        },
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
    registerCoach(coachData: coachesList) {
      const newCoach = {
        ...coachData,
        id: "c" + (this.coaches.length + 1),
      };

      console.log(newCoach);
      this.coaches.push(newCoach);
    },
  },
});
