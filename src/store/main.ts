import { defineStore } from "pinia";

export const useMainStore = defineStore("main", {
  state: () => {
    return {
      filter: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
});
