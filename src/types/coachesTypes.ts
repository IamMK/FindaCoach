export type coachesList = {
  id: string;
  firstName: string;
  lastName: string;
  areas: string[];
  description: string;
  hourlyRate: number;
};

export type coachesFilter = {
  frontend: boolean;
  backend: boolean;
  career: boolean;
};