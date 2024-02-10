<template>
    <div class="information">
      <h2>General Information</h2>
      <p>We are looking forward to meeting you on <span class="date-time">February 17th at 16:00</span>.</p>
      <p>Location: Nyhavsgade 2, 2tv, 6700, Esbjerg</p>
      <p>Fellow guests are kindly requested to bring drinks and snacks. If you have any special requirements, please let us know by clicking the button below.</p>
      <p></p>
      <div class="button-container">
      <button @click="redirectToRequirements">Add Special Requirements</button>
    </div>
</div>
  </template>
  
  <script>
  export default {
    name: 'Information',
    methods: {
      redirectToRequirements() {
        this.$router.push('/requirements');
      }
    }
  }
  </script>
  
  <style scoped>
  .information {
    width: 25vw;
    padding: 20px;
    border: 1vw solid #052240;
    border-radius: 2vw;
    margin-bottom: 2vw;
  }
  .button-container {
  display: flex;
  justify-content: center;
}
button {
  background-color: white;
  border: 0.2vw solid #BE3455;
  color: #BE3455;
  font-size: 1vw;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 2vw;
  cursor: pointer;
}
  .date-time {
  color: #BE3455;
}
  
  button:hover {
    background-color: #BE3455;
    color: #ffffff;
  }
  </style>
  