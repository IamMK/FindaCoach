import { defineStore } from "pinia";
import { auth, userData } from "@/types/authTypes";
import { appConfig } from "@/appConfig";

export const useAuthStore = defineStore("auth", {
  state: (): userData => {
    return {
      userId: null,
      token: null,
      tokenExpiration: null,
    };
  },
  actions: {
    async login(data: auth) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${appConfig.appkey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to authenticate."
        );
        throw error;
      }

      this.setUser({
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });

    },
    async signup(data: auth) {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${appConfig.appkey}`,
        {
          method: "POST",
          body: JSON.stringify({
            email: data.email,
            password: data.password,
            returnSecureToken: true,
          }),
        }
      );
      const responseData = await response.json();

      if (!response.ok) {
        const error = new Error(
          responseData.message || "Failed to authenticate."
        );
        throw error;
      }

      this.setUser({
        token: responseData.idToken,
        userId: responseData.localId,
        tokenExpiration: responseData.expiresIn,
      });
    },
    setUser(userData: userData) {
      this.token = userData.token;
      this.userId = userData.userId;
      this.tokenExpiration = userData.tokenExpiration;
    },
  },
});
