const playbackTime = document.querySelector(".playback-time");
const currentTime = document.querySelector(".curent-time");
const totalTime = document.querySelector(".total-time");
const playBtn = document.querySelector(".btn-footer-play > i");

function getArtist(artistId) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
    .then((response) => response.json())
    .then((artistData) => {
      console.log(artistData);
      displayArtist(artistData);
      getTopTracks(artistId);
    })
    .catch((err) => {
      console.error(err);
    });
  console.log("artist loading");
}

function getTopTracks(id) {
  fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/artist/${id}/top?limit=50`
  )
    .then((response) => response.json())
    .then((trackData) => {
      console.log(trackData.data);
      displayTopTracks(trackData);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getAlbum(albumId) {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
    .then((info) => info.json())
    .then((albumData) => {
      console.log(albumData);
      displayAlbum(albumData);
      displayAlbumSongs(albumData.tracks);
    });
}
function displayAlbum(albumInfo) {
  let albumCover = document.querySelector(".album-coverImg");
  let albumArtist = document.querySelector(".album-artist");
  let albumTitle = document.querySelector(".album-title");
  let albumYear = document.querySelector(".album-year");
  let albumSongs = document.querySelector(".album-songs");
  let albumLength = document.querySelector(".album-time");
  albumCover.innerHTML = `<img src=${albumInfo.cover} class= alt="">
  `;
  albumArtist.innerText = albumInfo.artist.name;
  albumTitle.innerText = albumInfo.title;
  albumYear.innerText = albumInfo.release_date.slice(0, 4);
  albumSongs.innerText = albumInfo.nb_tracks.toString() + " songs";
  albumLength.innerText = secondsToMinutes(albumInfo.duration);
}

function displayAlbumSongs(albumTracksInfo) {
  let albumTrackContainer = document.querySelector(".tracks");

  albumTracksInfo.data.forEach((el) => {
    let trackItem = document.createElement("div");
    trackItem.classList.add("track-details");
    trackItem.innerHTML = `
    <span>${albumTrackContainer.childNodes.length}</span>
    <span>${el.title_short}</span>
    <span>${secondsToMinutes(el.duration)}</span>`;

    albumTrackContainer.append(trackItem);
    trackItem.addEventListener("click", () => {
      loadOnPlayback(el);
    });

    console.log(el);
  });
}

function displayArtist(artistInfo) {
  let artistPage = document.querySelector(".artist-card-body");
  let artistImage = document.querySelector(".artist-coverImg");

  artistImage.innerHTML += `<img src=${artistInfo.picture_xl} class="card-img" alt="..." />`;

  artistPage.innerHTML += `
  <span
  ><i class="fas fa-certificate" style="font-size: 20px;color:#0095ff"></i>
  <p>Verified Artist</p></span
>
<h1 class="album-card-title">${artistInfo.name}</h1>
<p class="album-card-text m-0">
  <span>${artistInfo.nb_fan.toLocaleString()}</span> montly listeners
</p>
          `;
}

function displayTopTracks(track) {
  let tracksContainer = document.querySelector(".tracks");

  track.data.forEach((element) => {
    let trackContainer = document.createElement("div");
    trackContainer.classList.add("row", "track-row");
    trackContainer.innerHTML = `<div
    class="
      track-info-left
      d-flex
      align-items-center
      justify-content-start
    "
  >
    <span class="track-number">${tracksContainer.childNodes.length}</span>
    <div class="track-img">
      <img src="${element.album.cover}" alt="" />
    </div>
    <h5 class="track-title text-nowrap">${element.title}</h5>
  </div>
  <div class="track-info-middle track-album">
    <span><a href="albumPage.html?albumId=${
      element.album.id
    }" target="_blank">${element.album.title}<a></span>
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
    <span>${secondsToMinutes(element.duration)}</span>
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
    trackContainer.addEventListener("click", () => {
      loadOnPlayback(element);
    });
  });

  // let amountOfTracks = document
  //   .querySelectorAll(".track-row")
  //   .length.toString();
  let seeMoreBtn = document.querySelector(".see-more-btn");
  let nextTracks = track.next;

  let url = new URL(window.location.href);
  console.log(url);
  let newUrl = (url.searchParams.search = "value");
  console.log(newUrl);

  seeMoreBtn.addEventListener("click", () => {
    loadMoreTracks(nextTracks);
  });
}

function loadMoreTracks(nexTracksURL) {
  fetch(`https://strive-proxy.herokuapp.com/${nexTracksURL}`)
    .then((data) => data.json())
    .then((tracksData) => {
      console.log(tracksData);
      displayTopTracks(tracksData);
    });
}

function loadOnPlayback(track) {
  totalTime.innerText = secondsToMinutes(track.duration);
  let songTitle = document.querySelector(".song-title");
  songTitle.innerText = track.title_short;
  let songAuthor = document.querySelector(".song-author");
  songAuthor.innerText = track.artist.name;
  let albumCover = document.querySelector(".album-cover-image>img.img-fluid");
  albumCover.setAttribute("src", track.album.cover);

  setPlayback(track.duration);
}

function secondsToMinutes(seconds) {
  let minutes = Math.floor(seconds / 60);
  let _seconds = Math.floor(seconds - minutes * 60);
  let timeStr = `${minutes}:${_seconds < 10 ? "0" + _seconds : _seconds}`;
  return timeStr;
}

let searchBtn = document.querySelector(".search");
searchBtn.addEventListener("click", toggleSearchBar);

function createSearchBar() {
  let navigationBar = document.querySelector(".top-navigation");
  let profileName = document.querySelector(".profile-name");

  let searchBar = document.createElement("input");
  searchBar.classList.add("search-input");
  setAttributes(searchBar, {
    type: "text",
    placeholder: "Serach for...hopefully artist",
    "aria-label": "Search",
  });
  searchBar.setAttribute("hidden", "true");
  navigationBar.insertBefore(searchBar, profileName);
}
function toggleSearchBar() {
  let searchBar = document.querySelector(".search-input");
  searchBar.toggleAttribute("hidden");
}

function setAttributes(el, attrs) {
  for (var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
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

function setPlayback(totalTimeValue) {
  playbackTime.addEventListener("input", function () {
    let time = playbackTime.value;

    let timeInseconds = (totalTimeValue * `${+time}`) / 100;
    let minutes = Math.floor(timeInseconds / 60);
    let seconds = Math.floor(timeInseconds - minutes * 60);

    playbackTime.style.backgroundSize = `${time}% 100%`;
    playbackTime.setAttribute("value", `${time}%`);
    currentTime.innerText = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  });
}

function initPlayback() {
  currentTime.innerText = "0:00";
  playbackTime.style.backgroundSize = `0% 100%`;
  playbackTime.setAttribute("value", "0");
}

window.onload = function (event) {
  initPlayback();
  createSearchBar();
  getArtist(13);
};
