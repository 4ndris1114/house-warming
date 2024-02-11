<template>
  <div class="container">
    <h1 class="header-text" style="color: #052240;">Add your favorite songs to our Spotify playlist</h1>
    <p class="sub-text">Let's make it a collection of bangers!</p>
    <button class="cool-button" @click="redirectToPlaylist">Go to Playlist</button>
    <p class="table-description-text" style="color: #052240;">You can look forward to these songs:</p>
    <img src="@/assets/tancujuciKvetinac.png" alt="tKvet" class="picture"></img>
    
    <table v-if="newestTracks.length" class="track-table">
      <thead>
        <th>Track Name</th>
      </thead>
      <tbody>
        <tr v-for="(track, index) in newestTracks" :key="track.id">
          <td>{{ track.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <a href="/" class="back-home-btn">
  <img src="https://api.iconify.design/ion:home.svg" alt="Home Icon">
</a>
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
  computed: {
    showBackButton() {
      return this.$route.name !== 'home';
    }
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
    goBack() {
      this.$router.push({ name: 'home' });
    }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Ensure proper positioning of absolute elements */
}

.header-text {
  font-size: 2.5vw;
  color: #052240;
  font-weight: bold;
  text-align: center;
  width: 80%;
  margin-top: 5vw;
  margin-bottom: 1vw;
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
  margin-bottom: 2vw;
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
  margin-bottom: 3vw;
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
.picture {
  width: 20vw; /* Adjust the width as needed */
  height: auto; /* Maintain aspect ratio */
  position: fixed; /* Position the picture */
  right: 2.5vw;
  bottom: 20vw; /* Distance from the bottom */
  z-index: 9999; /* Ensure it's above other elements */
}
.back-home-btn {
  display: inline-block;
  padding: 1vw 1vw; /* Adjust padding as needed */
  background-color: #95deff; /* Button background color */
  color: #fff; /* Button text color */
  text-decoration: none; /* Removing underline from anchor tag */
  border: none; /* Removing button border */
  border-radius: 5vw; /* Button border-radius */
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3); /* Button box shadow */
  transition: background-color 0.3s ease; /* Transition effect for background-color */
  position: absolute; /* Position the button */
  bottom: 3vw; /* Distance from the bottom */
  right: 20vw; /* Distance from the right */
}
.back-home-btn img {
  width: 25px; /* Adjust the width of the icon */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Ensure proper positioning of the icon */
  margin: auto; /* Center the icon horizontally */
}

.back-home-btn:hover {
  background-color: #004b6b;
}

.back-home-btn:hover img {
  filter: brightness(0) invert(1); /* Invert the colors to make the icon white on hover */
}
</style>
