export type coachesList = {
  id: string | null;
  firstName: string;
  lastName: string;
  areas: string[];
  description: string;
  hourlyRate: number;
  message?: string;
};

export type coachesFilter = {
  frontend: boolean;
  backend: boolean;
  career: boolean;
};
