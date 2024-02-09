<template>
  <div class="container">
    <h1 class="header-text" style="color: #052240;">Add your favorite songs to our Spotify playlist</h1>
    <p class="sub-text">Let's make it a collection of bangers!</p>
    <button class="cool-button" @click="redirectToPlaylist">Go to Playlist</button>
    <p class="table-description-text" style="color: #052240;">You can look forward to these songs:</p>
    
    <table v-if="newestTracks.length" class="track-table">
      <thead>
        <!-- Remove the entire first column -->
        <!-- <th></th> -->
        <th>Track Name</th>
      </thead>
      <tbody>
        <tr v-for="(track, index) in newestTracks" :key="track.id">
          <!-- Remove the entire first column -->
          <!-- <td></td> -->
          <td>{{ track.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newestTracks: [],
      playlistId: '62IsjIZlurUQjilgkL4eo2?si=b90bf73e10ab40de&pt=02e91f7ef9c010d9ab2bb1bec78ea023',
      clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      clientSecret: import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
      accessToken: null,
    };
  },
  mounted() {
    this.getAccessToken();
  },
  methods: {
    async getAccessToken() {
      const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
        },
        body: 'grant_type=client_credentials'
      });

      if (!response.ok) {
        console.error('Failed to get access token');
        return;
      }

      const data = await response.json();
      this.accessToken = data.access_token;
      this.getPlaylistTracks();
    },
    async getPlaylistTracks() {
      const response = await fetch(`https://api.spotify.com/v1/playlists/${this.playlistId}`, {
        headers: {
          'Authorization': 'Bearer ' + this.accessToken
        }
      });

      if (!response.ok) {
        console.error('Failed to fetch playlist');
        return;
      }

      const data = await response.json();
      this.newestTracks = data.tracks.items.slice(0, 5).map(item => ({
        id: item.track.id,
        name: item.track.name
      }));
    },
    redirectToPlaylist() {
      const playlistURI = this.playlistId;
      window.location.href = `https://open.spotify.com/playlist/${playlistURI}`;
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.header-text {
  font-size: 2.5vw;
  color: #052240;
  font-weight: bold;
  text-align: center;
  width: 80%; /* Adjust width to match table */
  margin-top: 5vw;
}

.sub-text {
  font-size: 1.8vw;
  color: grey;
  text-align: center;
}

.table-description-text {
  font-size: 1.8vw;
  color: #052240;
  text-align: center;
  margin-bottom: 2vw; /* Add margin-bottom */
}

.cool-button {
  display: inline-block;
  padding: 1vw 2vw;
  font-size: 1.5vw;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  border: 0.2vw solid #BE3455;
  color: #BE3455;
  background-color: #ffffff;
  border-radius: 2vw;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  margin-bottom: 4vw; /* Add margin-bottom */
}

.cool-button:hover {
  background-color: #BE3455;
  color: #ffffff;
}

.track-table {
  width: 80%;
  border-collapse: collapse;
}

.track-table th,
.track-table td {
  padding: 1.5vw;
  text-align: left;
}

.track-table th {
  background-color: #BE3455;
  color: #ffffff;
  border-radius: 2vw;
}
</style>
