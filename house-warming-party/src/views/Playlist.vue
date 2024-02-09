<template>
  <div class="container">
    <h1 class="header-text" style="color: #052240;">Add your favorite songs to our Spotify playlist</h1>
    <p class="sub-text">Let's make it a collection of bangers!</p>
    <button class="cool-button" @click="redirectToPlaylist">Go to Playlist</button>
    
    <!-- Display the newest tracks here -->
    <ul v-if="newestTracks.length">
      <li v-for="track in newestTracks" :key="track.id">{{ track.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newestTracks: [],
      playlistId: '62IsjIZlurUQjilgkL4eo2?si=b90bf73e10ab40de&pt=02e91f7ef9c010d9ab2bb1bec78ea023',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      accessToken: null,
    };
  },
  mounted() {
    this.getPlaylistTracks();
  },
  methods: {
    async getPlaylistTracks() {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${this.playlistId}`);
      if (!response.ok) {
        console.error('Failed to fetch playlist');
        return;
      }
      const data = await response.json();
      this.newestTracks = data.tracks.items.slice(0, 5);
    },
    redirectToPlaylist() {
      const playlistURI = this.playlistId;
      window.location.href = `https://open.spotify.com/playlist/${playlistURI}`;
    },
  },
};
</script>

<style>
/* Your existing styles remain the same */
</style>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-text {
  font-size: 2.5em;
  color: #BE3455;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
}

.sub-text {
  font-size: 1.2em;
  color: #666;
  text-align: center;
  margin-top: 0;
}


</style>
