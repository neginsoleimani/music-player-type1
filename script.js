const musicContainer =document.getElementById('music-container');
const playBtn =document.getElementById('play');
const prevBtn =document.getElementById('prev');
const nextBtn =document.getElementById('next');
const audio =document.getElementById('audio');
const progress =document.getElementById('progress');
const progressContainer =document.getElementById('progress-container');
const title =document.getElementById('title');
const cover =document.getElementById('cover');
const currTime=document.getElementById('currTime');
const durTime =document.getElementById('durTime');

const  songs =['https://s19.picofile.com/d/8439234350/12ab782a-4dc7-416a-8c50-6b07a53cf7b2/fly_me_to_the_moon','https://dl.dlmusics.ir/Music/2019/Ghostly%20Kisses/Ghostly%20Kisses%20-%20Empty%20Note%20128','http://dl.resamusic.ir//%DB%B0%DB%B0/%DB%B1/Sting%20-%20Shape%20Of%20My%20Heart'];
const images=['https://rozup.ir/view/3442200/99-999438_way-to-zion-vinyl-shop.png','https://rozup.ir/view/3442200/99-999438_way-to-zion-vinyl-shop.png'];

let songIndex=2;
loadSong(songs[songIndex]);


function loadSong(song) {
    audio.src=`${song}.mp3`;
}

function playSong() {
  musicContainer.classList.add('play');
  playBtn.querySelector('i.fas').classList.remove('fa-play');
  playBtn.querySelector('i.fas').classList.add('fa-pause');
  audio.play();
}


function pauseSong() {
    musicContainer.classList.remove('play');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}


function prevSong() {
    songIndex--;
    if (songIndex<0){
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function nextSong() {
    songIndex++;
    if (songIndex>songs.length-1){
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

function updateProgress(e) {
    const {duration , currentTime }=e.srcElement;
    const progressPercent=(currentTime/duration)*100;
    progress.style.width=`${progressPercent}%`;
}
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e. offsetX;
    const duration = audio.duration;
    audio.currentTime=(clickX/width)*duration;
}

function DurTime(e) {
    const {duration , currentTime }=e.srcElement;
    var sec;
    var sec_d;

    let min=(currentTime==null) ? 0 : Math.floor(currentTime/60);
    min = min<10 ?  '0' + min  : min;

    let min_d = (duration == null) ? 0 : Math.floor(duration / 60);
    min_d = min_d <10 ? '0' + min_d : min_d;


    function get_sec(x) {
        if (Math.floor(x) >= 60) {
            sec = Math.round(x % 60);
            sec = sec < 10 ? '0' + sec : sec;
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }

      }
      get_sec(currentTime);
      currTime.innerHTML = min + ':' + sec;

      function get_sec_d(x) {
          if (Math.floor(x) >= 60) {
              sec_d = Math.round(x % 60);
              sec_d= sec_d < 10 ? '0' + sec_d : sec_d;
          } else {
              sec_d = Math.floor(x);
              sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
          }
        }
        get_sec_d(duration);
        durTime.innerHTML = min_d + ':' + sec_d;

}


playBtn.addEventListener('click', ( )=>{
    const  isPlaying =musicContainer.classList.contains('play');
    if (isPlaying){
        pauseSong();
    }else {
        playSong();
    }
});

prevBtn.addEventListener('click',prevSong);
nextBtn.addEventListener('click',nextSong);
audio.addEventListener('timeupdate',updateProgress);
progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended',nextSong);
audio.addEventListener('timeupdate',DurTime);
