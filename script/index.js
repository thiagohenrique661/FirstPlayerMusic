let musics = [
  {
    title: "Music1",
    artist: "Teste1",
    source: "/musics/Body of Water - TrackTribe.mp3",
    img: "/images/image1.jpg",
  },
  {
    title: "Music2",
    artist: "Teste2",
    source: "/musics/Jane Street - TrackTribe.mp3",
    img: "/images/image2.jpg",
  },
  {
    title: "Music3",
    artist: "Teste3",
    source: "/musics/Savior - Telecasted.mp3",
    img: "/images/image3.jpg",
  },
  {
    title: "Music4",
    artist: "Teste4",
    source: "/musics/Underground Academy - Hanu Dixit.mp3",
    img: "/images/image4.jpg",
  },
];

let music = document.querySelector("audio");
let volumeSlider = document.getElementById("volumeSlider");
let musicIndex = 0;

let nameMusic = document.querySelector(".description h2");
let nameArtist = document.querySelector(".description i");
let image = document.querySelector("img");
let durationTime = document.querySelector(".time .start");
let musicDuration = document.querySelector(".time .end");

nameMusic.textContent = musics[musicIndex].title;
nameArtist.textContent = musics[musicIndex].artist;
image.setAttribute("src", musics[musicIndex].img);

musicDuration.textContent = secondsConvertMinutes(Math.floor(music.duration));

document.querySelector(".btnPlay").addEventListener("click", songListen);

document.querySelector(".btnPause").addEventListener("click", songPause);

music.addEventListener("timeupdate", updateBar);

document.querySelector(".previous").addEventListener("click", () => {
  musicIndex--;
  if (musicIndex < 0) {
    musicIndex = 3;
  }
  renderMusic(musicIndex);
});

document.querySelector(".next").addEventListener("click", () => {
  musicIndex++;
  if (musicIndex > 3) {
    musicIndex = 0;
  }
  renderMusic(musicIndex);
});

function renderMusic(musicIndex) {
  music.setAttribute("src", musics[musicIndex].source);

  music.addEventListener("loadeddata", () => {
    nameMusic.textContent = musics[musicIndex].title;
    nameArtist.textContent = musics[musicIndex].artist;
    image.src = musics[musicIndex].img;

    durationTime.textContent = secondsConvertMinutes(
      Math.floor(music.duration)
    );
  });
  document.body.append(music);
}

function songListen() {
  music.play();
  document.querySelector(".btnPause").style.display = "block";
  document.querySelector(".btnPlay").style.display = "none";
}

function songPause() {
  music.pause();
  document.querySelector(".btnPause").style.display = "none";
  document.querySelector(".btnPlay").style.display = "block";
}

function updateBar() {
  let bar = document.querySelector("progress");
  bar.style.width =
    Math.floor((music.currentTime / music.duration) * 100) + "%";

  let timeProgress = document.querySelector(".start");
  timeProgress.textContent = secondsConvertMinutes(
    Math.floor(music.currentTime)
  );
}

function secondsConvertMinutes(seconds) {
  let fieldMinutes = Math.floor(seconds / 60);
  let fieldSeconds = seconds % 60;

  if (fieldSeconds < 10) {
    fieldSeconds = "0" + fieldSeconds;
  }
  return fieldMinutes + ":" + fieldSeconds;
}

music.volume = volumeSlider.value;

volumeSlider.addEventListener("input", function () {
  music.volume = volumeSlider.value;
});
