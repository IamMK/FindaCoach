<script setup lang="ts">
import { reactive } from "@vue/reactivity";
import BaseButton from "../ui/BaseButton.vue";
import { defineEmits } from "vue";

const emits = defineEmits(["save-data"]);

const coachData = reactive({
  firstName: {
    value: "",
    isValid: true,
  },
  lastName: {
    value: "",
    isValid: true,
  },
  description: {
    value: "",
    isValid: true,
  },
  hourlyRate: { value: null, isValid: true },
  areas: { value: [], isValid: true },
});

let formIsValid = true;

const clearValidity = (input: string) => {
  switch (input) {
    case "firstName": {
      coachData.firstName.isValid = true;
      break;
    }
    case "lastName": {
      coachData.lastName.isValid = true;
      break;
    }
    case "description": {
      coachData.description.isValid = true;
      break;
    }
    case "rate": {
      coachData.hourlyRate.isValid = true;
      break;
    }
    case "areas": {
      coachData.areas.isValid = true;
      break;
    }
    default: {
      break;
    }
  }
};

const validate = () => {
  formIsValid = true;

  if (coachData.firstName.value === "") {
    coachData.firstName.isValid = false;
    formIsValid = false;
  }
  if (coachData.lastName.value === "") {
    coachData.lastName.isValid = false;
    formIsValid = false;
  }
  if (coachData.description.value === "") {
    coachData.description.isValid = false;
    formIsValid = false;
  }
  if (!coachData.hourlyRate.value || coachData.hourlyRate.value < 0) {
    coachData.hourlyRate.isValid = false;
    formIsValid = false;
  }
  if (coachData.areas.value.length === 0) {
    coachData.areas.isValid = false;
    formIsValid = false;
  }
};

const submitForm = () => {
  validate();

  if (!formIsValid) {
    return;
  }

  const data = {
    firstName: coachData.firstName.value,
    lastName: coachData.lastName.value,
    description: coachData.description.value,
    hourlyRate: coachData.hourlyRate.value,
    areas: coachData.areas.value,
  };
  console.log(data);

  emits("save-data", data);
};
</script>

<template>
  <form @submit.prevent="submitForm">
    <div
      class="form-control"
      :class="{ invalid: !coachData.firstName.isValid }"
      @change="clearValidity('firstName')"
    >
      <label for="firstname">First Name: </label>
      <input
        type="text"
        name="firstname"
        id="firstname"
        v-model.trim="coachData.firstName.value"
      />
      <p v-if="!coachData.firstName.isValid">First Name should not be empty</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !coachData.lastName.isValid }"
      @change="clearValidity('lastName')"
    >
      <label for="lastname">Last Name: </label>
      <input
        type="text"
        name="lastname"
        id="lastname"
        v-model.trim="coachData.lastName.value"
      />
      <p v-if="!coachData.lastName.isValid">Last Name should not be empty</p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !coachData.description.isValid }"
      @change="clearValidity('description')"
    >
      <label for="desription">Description: </label>
      <textarea
        name="description"
        id="description"
        rows="5"
        v-model.trim="coachData.description.value"
      ></textarea>
      <p v-if="!coachData.description.isValid">
        Description should not be empty
      </p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !coachData.hourlyRate.isValid }"
      @change="clearValidity('rate')"
    >
      <label for="rate">Hourly Rate: </label>
      <input
        type="number"
        name="rate"
        id="rate"
        v-model.number="coachData.hourlyRate.value"
      />
      <p v-if="!coachData.hourlyRate.isValid">
        Hourly Rate should not be empty or equal 0
      </p>
    </div>
    <div
      class="form-control"
      :class="{ invalid: !coachData.areas.isValid }"
      @change="clearValidity('areas')"
    >
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          name="frontend"
          id="frontend"
          value="frontend"
          v-model="coachData.areas.value"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="backend"
          id="backend"
          value="backend"
          v-model="coachData.areas.value"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          name="career"
          id="career"
          value="career"
          v-model="coachData.areas.value"
        />
        <label for="career">Career Advisory</label>
        <p v-if="!coachData.areas.isValid">
          You should check minimum one expertise
        </p>
      </div>
      <p>Form data is invalid. Fix and try again!</p>
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
