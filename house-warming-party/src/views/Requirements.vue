<template>
    <div class="requirements">
      <h2>Special Requirements</h2>
      <label for="specialRequirements">Whatcha want ha?!</label>
      <input @input="resetErrorMessage()" v-model="requirementInput.text" type="text" id="specialRequirement">
      <div class="button-container">
        <button @click="submitRequirements">Submit</button>
        <div v-if="showErrorMessage">
          Your requirements must be at least 1 character long and cannot exceed 200 characters.
        </div>
      </div>
      </div>
      <div v-for="requirement in requirements" :key="requirement.uid">
        {{ requirement.text }}
    </div>
  </template>
  
  <script setup lang="ts">
  import {useRequirementsStore} from "@/stores/requirementsStore"
  import { onMounted, ref, computed, watch, Ref } from "vue";
  import {Requirement} from "@/types/Requirement"
  
  const requirementsStore = useRequirementsStore()
  onMounted (async ()=> {
    await requirementsStore.fetchRequirements();
    requirements.value = requirementsStore.requirements;
  })
  const requirements: Ref<Requirement[]> = ref([]);
  
    const specialRequirements = computed(() => {
        requirements.value = requirementsStore.requirements;
        return requirementsStore.requirements;
    })


    const requirementInput: Requirement = ref({text: ""});
    const showErrorMessage = ref(false);
    const resetErrorMessage = () => {
      showErrorMessage.value=false
    }

    const submitRequirements = async () => {
      if(requirementInput.value.text.length <= 200 && requirementInput.value.text.length > 0) {
        requirementsStore.addRequirement(requirementInput.value);
        requirements.value.push(requirementInput.value)
        requirementInput.value.text = "";
      }
      else {
         showErrorMessage.value = true;
      }
    }
  </script>
  
  <style scoped>
  .requirements {
    width: 90%;
    max-width: 25rem;
    margin: 0 auto;
    padding: 2rem;
    border: 0.5rem solid #052240;
    border-radius: 2rem;
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
  }
  </style>
  