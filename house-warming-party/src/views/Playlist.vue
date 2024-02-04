<template>
    <div>
      <button @click="redirectToPlaylist">Go to Playlist</button>
    </div>
  </template>
  
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
  