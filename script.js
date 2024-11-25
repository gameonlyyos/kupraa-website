/**
 * Video Player Script
 * Created by Kupraa
 * https://github.com/kupraa
 */

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("myVideo");
  const playBtn = document.getElementById("playBtn");
  const muteBtn = document.getElementById("muteBtn");
  const fullscreenBtn = document.getElementById("fullscreenBtn");
  const volumeSlider = document.getElementById("volumeSlider");
  const progress = document.querySelector(".progress");
  const progressBar = document.querySelector(".progress-bar");
  const currentTimeElement = document.getElementById("currentTime");
  const durationElement = document.getElementById("duration");
  const bottomPlayBtn = document.getElementById("bottomPlayBtn");

  // Fungsi Play/Pause
  function togglePlay() {
    if (video.paused) {
      video.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      video.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  // Fungsi Mute
  function toggleMute() {
    video.muted = !video.muted;
    muteBtn.innerHTML = video.muted
      ? '<i class="fas fa-volume-mute"></i>'
      : '<i class="fas fa-volume-up"></i>';
    volumeSlider.value = video.muted ? 0 : video.volume;
  }

  // Fungsi Fullscreen
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      video.parentElement.requestFullscreen();
      fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
      document.exitFullscreen();
      fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
  }

  // Format waktu
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  }

  // Update progress bar
  function updateProgress() {
    const percent = (video.currentTime / video.duration) * 100;
    progress.style.width = `${percent}%`;
    currentTimeElement.textContent = formatTime(video.currentTime);
    durationElement.textContent = formatTime(video.duration);
  }

  // Event Listeners
  playBtn.addEventListener("click", togglePlay);
  muteBtn.addEventListener("click", toggleMute);
  fullscreenBtn.addEventListener("click", toggleFullscreen);
  video.addEventListener("click", togglePlay);
  video.addEventListener("timeupdate", updateProgress);

  volumeSlider.addEventListener("input", function () {
    video.volume = this.value;
    video.muted = false;
    muteBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  });

  progressBar.addEventListener("click", function (e) {
    const pos = (e.pageX - this.offsetLeft) / this.offsetWidth;
    video.currentTime = pos * video.duration;
  });

  // Keyboard shortcuts
  document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      e.preventDefault();
      togglePlay();
    }
    if (e.code === "KeyM") {
      toggleMute();
    }
    if (e.code === "KeyF") {
      toggleFullscreen();
    }
  });

  // Tambahkan event listener untuk tombol play bawah
  bottomPlayBtn.addEventListener("click", function () {
    togglePlay();
    updateBottomPlayButton();
  });

  // Fungsi untuk update tampilan tombol bottom play
  function updateBottomPlayButton() {
    if (video.paused) {
      bottomPlayBtn.innerHTML =
        '<i class="fas fa-play"></i><span>Play Video</span>';
    } else {
      bottomPlayBtn.innerHTML =
        '<i class="fas fa-pause"></i><span>Pause Video</span>';
    }
  }

  // Update event listener video untuk mengubah tombol bottom play
  video.addEventListener("play", updateBottomPlayButton);
  video.addEventListener("pause", updateBottomPlayButton);
});
