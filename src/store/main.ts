import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      userId: "c2",
      filter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
});
