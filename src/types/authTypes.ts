export type auth = {
  email: string;
  password: string;
  returnSecureToken?: boolean;
};

export type userData = {
  token: string | null;
  userId: string | null;
  tokenExpiration: string | null;
};
