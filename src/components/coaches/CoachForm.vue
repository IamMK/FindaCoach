<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import BaseButton from "../ui/BaseButton.vue";

const coachData = reactive({
  firstname: "",
  lastname: "",
  description: "",
  rate: null,
  areas: [],
});

const submitForm = () => {
  console.log(coachData);
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstname">First Name: </label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        v-model.trim="coachData.firstname"
      />
    </div>
    <div class="form-control">
      <label for="lastname">Last Name: </label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        v-model.trim="coachData.lastname"
      />
    </div>
    <div class="form-control">
      <label for="desription">Description: </label>
      <textarea
        name="description"
        id="description"
        rows="5"
        v-model.trim="coachData.description"
      ></textarea>
    </div>
    <div class="form-control">
      <label for="rate">Hourly Rate: </label>
      <input
        type="number"
        name="rate"
        id="rate"
        v-model.number="coachData.rate"
      />
    </div>
    <div class="form-control">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          value="frontend"
          v-model="coachData.areas"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          value="backend"
          v-model="coachData.areas"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="career"
          id="career"
          value="career"
          v-model="coachData.areas"
        />
        <label for="career">Career Advisory</label>
      </div>
      <base-button>Register</base-button>
    </div>
  </form>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type="checkbox"] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type="checkbox"] {
  display: inline;
  width: auto;
  border: none;
}

input[type="checkbox"]:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>