const progress = document.querySelector("#progress");
const song = document.querySelector("#song");
const ctrlIcon = document.querySelector("#ctrlIcon");
const play = document.querySelector("#play");
let progressUpdateInterval;

song.onloadedmetadata = function () {
  progress.max = song.duration;
  progress.value = song.currentTime;
};

play.addEventListener("click", () => {
  if (ctrlIcon.classList.contains("fa-pause")) {
    song.pause();
    clearInterval(progressUpdateInterval);
    ctrlIcon.classList.remove("fa-pause");
    ctrlIcon.classList.add("fa-play");
  } else {
    song.play().then(() => {
      ctrlIcon.classList.add("fa-pause");
      ctrlIcon.classList.remove("fa-play");
      progressUpdateInterval = setInterval(() => {
        progress.value = song.currentTime;
      }, 1);
    });
  }
});

progress.onchange = function () {
  song.currentTime = progress.value;
  song.play();
  ctrlIcon.classList.add("fa-pause");
  ctrlIcon.classList.remove("fa-play");
};

song.addEventListener("ended", () => {
  clearInterval(progressUpdateInterval);
  progress.value = 0;
  ctrlIcon.classList.remove("fa-pause");
  ctrlIcon.classList.add("fa-play");
});
