const audioPlay = function (audio, startTime, endTime) {
  audio.currentTime = startTime;
  audio.play();
  audio.addEventListener('timeupdate', function(){
    if(audio.currentTime >= endTime) audio.pause();
  }, false)  
}

export { audioPlay }
