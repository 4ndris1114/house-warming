<template>
  <div class="container">
    <div class="requirements-input">
      <h2>Special Requirements</h2>
      <label for="specialRequirement">Excuse me, good sir or madam, might I inquire as to your preferences or desires at this moment in time to humbly ask WATCHA WANT HA?!</label>
      <div class="error-message" v-if="showErrorMessage">
        Your requirements must be at least 1 character long and cannot exceed 200 characters.
      </div>
      <input v-model="requirementInput" @input="resetErrorMessage" type="text" id="specialRequirement">
      <div class="button-container">
        <button @click="submitRequirements">Submit</button>
      </div>
    </div>
    <!-- <div class="requirements-list">
      <div v-for="requirement in requirements" :key="requirement.uid">
        <li>
          {{ requirement.text }}
        </li>
      </div>
    </div> -->
    <!-- <div v-for="requirement in requirements" :key="requirement.uid">
      {{ requirement.text }} -->
      <div>
      <img src="@/assets/opityKvetinac.png" alt="oKvet" class="picture">
    </div>
    <a href="/" class="back-home-btn">
      <img src="https://api.iconify.design/ion:home.svg" alt="Home Icon">
    </a>
  </div>
</template>

<script setup lang="ts">
import { useRequirementsStore } from "@/stores/requirementsStore";
import { ref, computed } from "vue";
import { onMounted } from "vue";
import { Requirement } from "@/types/Requirement";

onMounted(async () => {
  await requirementsStore.fetchRequirements();
});

const requirementsStore = useRequirementsStore();
const requirementInput = ref<string>("");
const showErrorMessage = ref(false);

const requirements = computed(() => {
  return requirementsStore.requirements.slice().reverse();
});

const resetErrorMessage = () => {
  showErrorMessage.value = false;
};

const submitRequirements = () => {
  if (requirementInput.value.trim().length <= 200 && requirementInput.value.trim().length > 0) {
    requirementsStore.addRequirement({ index: requirements.value.length, text: requirementInput.value } as Requirement);
    requirementInput.value = "";
  } else {
    showErrorMessage.value = true;
  }
};
</script>

<style scoped>

.container {
  width: 25vw;
    padding: 20px;
    border: 1vw solid #052240;
    border-radius: 2vw;
    margin-bottom: 2vw;

}
/* .requirements-list {
    border-style: none;
    margin-top: 2rem;
    font-weight: 500;
} */
.requirements {
  width: 90%;
  max-width: 25rem;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

label {
  display: block;
  margin-bottom: 1rem;
}

input[type="text"] {
  width: calc(100% - 4rem);
  max-width: 20rem;
  padding: 1rem;
  border: 0.2rem solid grey;
  border-radius: 2rem;
  box-sizing: border-box;
  margin-bottom: 2rem;
}

.button-container {
  display: flex;
  justify-content: center;
}

button {
  background-color: white;
  border: 0.2rem solid #BE3455;
  color: #BE3455;
  font-size: 1rem;
  font-weight: bold;
  padding: 1rem 2rem;
  border-radius: 2rem;
  cursor: pointer;
}

button:hover {
  background-color: #BE3455;
  color: #ffffff;
}

@media screen and (max-width: 600px) {
  .requirements {
    padding: 1rem;
  }

  input[type="text"] {
    width: calc(100% - 2rem);
    max-width: 18rem;
  }

  button {
    font-size: 0.9rem;
    padding: 0.8rem 1.5rem;
  }

  button:hover {
    background-color: #BE3455;
    color: #ffffff;
  }
}

@media screen and (max-width: 600px) {
  .requirements {
    padding: 1rem;
  }

  input[type="text"] {
    width: calc(100% - 2rem);
    max-width: 18rem;
  }

  button {
    font-size: 0.9rem;
    padding: 0.8rem 1.5rem;
  }
}

.picture {
  width: 20vw;
  /* Adjust the width as needed */
  height: auto;
  /* Maintain aspect ratio */
  position: fixed;
  /* Position the picture */
  right: 2.5vw;
  bottom: 10vw;
  /* Distance from the bottom */
  z-index: 9999;
  /* Ensure it's above other elements */
}

.back-home-btn {
  display: inline-block;
  padding: 1vw 1vw;
  /* Adjust padding as needed */
  background-color: #95deff;
  /* Button background color */
  color: #fff;
  /* Button text color */
  text-decoration: none;
  /* Removing underline from anchor tag */
  border: none;
  /* Removing button border */
  border-radius: 5vw;
  /* Button border-radius */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  /* Button box shadow */
  transition: background-color 0.3s ease;
  /* Transition effect for background-color */
  position: absolute;
  /* Position the button */
  bottom: 3vw;
  /* Distance from the bottom */
  right: 20vw;
  /* Distance from the right */
}

.back-home-btn img {
  width: 25px;
  /* Adjust the width of the icon */
  height: auto;
  /* Maintain aspect ratio */
  display: block;
  /* Ensure proper positioning of the icon */
  margin: auto;
  /* Center the icon horizontally */
}

.back-home-btn:hover {
  background-color: #004b6b;
}

.back-home-btn:hover img {
  filter: brightness(0) invert(1);
  /* Invert the colors to make the icon white on hover */
}
</style>