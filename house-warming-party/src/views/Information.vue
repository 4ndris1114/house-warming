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
<a href="/" class="back-home-btn">
  <img src="https://api.iconify.design/ion:home.svg" alt="Home Icon">
</a>
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

  .back-home-btn {
  display: inline-block;
  padding: 1vw 1vw;
  background-color: #95deff;
  color: #fff;
  text-decoration: none;
  border: none;
  border-radius: 5vw;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  transition: background-color 0.3s ease;
  position: absolute;
  bottom: 3vw;
  right: 20vw;
  }
.back-home-btn img {
  width: 25px;
  height: auto;
  display: block;
  margin: auto;
}

.back-home-btn:hover {
  background-color: #004b6b;
}

.back-home-btn:hover img {
  filter: brightness(0) invert(1); /* white on hover */
}
  </style>
  