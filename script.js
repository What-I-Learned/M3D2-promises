const playbackTime = document.querySelector(".playback-time");
const currentTime = document.querySelector(".curent-time");
const totalTime = document.querySelector(".total-time");
const playBtn = document.querySelector(".btn-footer-play > i");

function getArtist() {
  fetch("https://deezerdevs-deezer.p.rapidapi.com/artist/13", {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9835f40629mshe9f0744f8b07fe0p13e171jsn785e2f64657a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((artistData) => {
      displayArtist(artistData);
      console.log(artistData);
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("artist loading");
}

let top10TrackIds = [
  "1109731",
  "1109737",
  "72160317",
  "854914322",
  "1109739",
  "548348732",
  "6461440",
  "916445",
];

function addTracks() {
  top10TrackIds.forEach((id) => {
    fetchTrack(id);
  });
}

function fetchTrack(id) {
  fetch(`https://deezerdevs-deezer.p.rapidapi.com/track/${id}`, {
    method: "GET",
    headers: {
      "x-rapidapi-key": "9835f40629mshe9f0744f8b07fe0p13e171jsn785e2f64657a",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  })
    .then((response) => response.json())
    .then((trackData) => {
      displayTrack(trackData);
      console.log(trackData);
    })
    .catch((err) => {
      console.error(err);
    });
}

// function getTopTracks(url) {
//   fetch(url, {
//     method: "GET",
//     headers: {
//       "x-rapidapi-key": "9835f40629mshe9f0744f8b07fe0p13e171jsn785e2f64657a",
//       "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//     },
//   })
//     .then((response) => response.json())
//     .then((topTracksData) => {
//       console.log(topTracksData);
//     })
//     .catch((err) => {
//       console.error(err);
//     });
// }

function displayTrack(track) {
  let trackContainer = document.createElement("div");
  trackContainer.classList.add("row", "track-row");

  let tracksContainer = document.querySelector(".tracks");

  console.log(tracksContainer.childNodes["1"]);

  trackContainer.innerHTML += `<div
    class="
      track-info-left
      d-flex
      align-items-center
      justify-content-start
    "
  >
    <span class="track-number">1</span>
    <div class="track-img">
      <img src=${track.album.cover} alt="" />
    </div>
    <h5 class="track-title text-nowrap">${track.title}</h5>
  </div>
  <div class="track-info-middle track-listeners">
    <span>${track.rank}</span>
  </div>
  <div
    class="
      track-info-right track-length
      d-flex
      align-items-center
      justify-content-start
    "
  >
    <button class="track-like">
      <i class="far fa-heart"></i>
    </button>
    <span>${secondsToMinutes(track.duration)}</span>
    <button class="track-more">
      <svg
        role="img"
        height="16"
        width="16"
        viewBox="0 0 32 32"
        class="Svg-sc-1bi12j5-0 fIDrcz"
      >
        <path
          d="M5.998 13.999A2 2 0 105.999 18a2 2 0 00-.001-4zm10.001 0A2 2 0 1016 18a2 2 0 000-4zm10.001 0A2 2 0 1026.001 18 2 2 0 0026 14z"
        ></path>
      </svg>
    </button>
  </div>`;
  tracksContainer.append(trackContainer);
}

function displayArtist(artist) {
  let artistPage = document.querySelector(".artist-card-body");
  let artistImage = document.querySelector(".artist-coverImg");

  artistImage.innerHTML += `<img src=${artist.picture_xl} class="card-img" alt="..." />`;

  artistPage.innerHTML += `
  <span
  ><i class="fas fa-certificate" style="font-size: 14px"></i>
  <p>Verified Artist</p></span
>
<h1 class="album-card-title">${artist.name}</h1>
<p class="album-card-text m-0">
  <span>${artist.nb_fan}</span> montly listeners
</p>
          `;
}

function secondsToMinutes(seconds) {
  let minutes = Math.floor(seconds / 60);
  let _seconds = Math.floor(seconds - minutes * 60);
  let timeStr = `${minutes}:${_seconds}`;
  return timeStr;
}

playBtn.addEventListener("click", function () {
  if (playBtn.className === "fas fa-play-circle") {
    playBtn.classList.remove("fa-play-circle");
    playBtn.classList.add("fa-pause-circle");
  } else {
    playBtn.classList.remove("fa-pause-circle");
    playBtn.classList.add("fa-play-circle");
  }
});

let totalTimeValue = totalTime.innerText.split(":");
totalTimeValue = +totalTimeValue[0] * 60 + +totalTimeValue[1];

playbackTime.addEventListener("input", function () {
  let time = playbackTime.value;
  let timeInseconds = (totalTimeValue * `${+time}`) / 100;
  let minutes = Math.floor(timeInseconds / 60);
  let seconds = Math.floor(timeInseconds - minutes * 60);
  console.log(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);

  playbackTime.style.backgroundSize = `${time}% 100%`;
  playbackTime.setAttribute("value", `${time}%`);
  currentTime.innerText = `${minutes}:${
    seconds < 10 ? "0" + seconds : seconds
  }`;
});

window.onload = function (event) {
  currentTime.innerText = "0:00";
  playbackTime.style.backgroundSize = `0% 100%`;
  playbackTime.setAttribute("value", "0");
  console.log("page is fully loaded", event.curr);
  getArtist();
  addTracks();
};
