<script setup lang="ts">
import { reactive, computed } from "vue";
import { useAuthStore } from "@/store/auth";

const authStore = useAuthStore();

const data = reactive({
  email: "",
  password: "",
  mode: "login",
  formIsValid: true,
  isLoading: false,
  error: null as string | null,
});

const submitButtonCaption = computed(() => {
  if (data.mode === "login") return "Login";
  else return "Sign up";
});

const switchModeButtonCaption = computed(() => {
  if (data.mode === "login") return "Signup instead";
  else return "Login instead";
});

const switchAuthMode = () => {
  if (data.mode === "login") {
    data.mode = "signup";
  } else {
    data.mode = "login";
  }
};

const submitForm = async () => {
  data.formIsValid = true;
  if (
    data.email === "" ||
    !data.email.includes("@") ||
    data.password.length < 6
  ) {
    data.formIsValid = false;
    return;
  }

  data.isLoading = true;

  try {
    if (data.mode === "login") {
      await authStore.login({
        email: data.email,
        password: data.password
      })
    } else {
      await authStore.signup({
        email: data.email,
        password: data.password,
      });
    }
  } catch (err: string) {
    data.error = err || "Failed to authenticate. Try later.";
  }

  data.isLoading = false;
};

const handleError = () => {
  data.error = null;
};
</script>

<template>
  <div>
    <base-dialog
      :show="!!data.error"
      title="An error occured"
      @close="handleError"
    >
      <p>{{ data.error }}</p>
    </base-dialog>
    <base-dialog title="Authenticating..." :show="data.isLoading" fixed>
      <base-spinner></base-spinner>
    </base-dialog>
    <base-card>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label
          ><input
            type="email"
            name="email"
            id="email"
            v-model.trim="data.email"
          />
        </div>
        <div class="form-control">
          <label for="password">Password</label
          ><input
            type="password"
            name="password"
            id="password"
            v-model.trim="data.password"
          />
        </div>
        <p v-if="!data.formIsValid">
          Please enter a valid email and password (must be at least 6 characters
          long)
        </p>
        <base-button>{{ submitButtonCaption }}</base-button>
        <base-button type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</base-button>
      </form>
    </base-card>
  </div>
</template>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
