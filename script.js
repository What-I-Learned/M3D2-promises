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
let top10Tracks = [];

top10TrackIds.forEach((id) => {
  top10Tracks.push(fetchTrack(id));
});

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
};
