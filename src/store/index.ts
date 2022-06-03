import { defineStore } from "pinia";

import coachesModule from "./coaches";

export const useCoachesStore = defineStore("coaches", coachesModule);
