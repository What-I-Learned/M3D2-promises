const playbackTime = document.querySelector(".playback-time");
const currentTime = document.querySelector(".curent-time");
const totalTime = document.querySelector(".total-time");
const playBtn = document.querySelector(".btn-footer-play > i");

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
};
