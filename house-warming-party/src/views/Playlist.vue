<template>
    <div>
        <h1 class="header-text">Add your favorite songs to our Spotify playlist</h1>
        <p class="sub-text">Let's make it a collection of bangers!</p>
      <button @click="redirectToPlaylist">Go to Playlist</button>
    </div>
  </template>

<style>
.header-text {
  font-size: 2.5em;
  color: #4285f4; /* Change the color to your preference */
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
}

.sub-text {
  font-size: 1.2em;
  color: #666;
  text-align: center;
  margin-top: 0;
}
</style>
  
  <script>
  export default {
    methods: {
      redirectToPlaylist() {
        const playlistURI = '62IsjIZlurUQjilgkL4eo2?si=b90bf73e10ab40de&pt=02e91f7ef9c010d9ab2bb1bec78ea023';
        window.location.href = `https://open.spotify.com/playlist/${playlistURI}`;
      },
    },
  };
  </script>
  
  <style scoped>
  </style>
  