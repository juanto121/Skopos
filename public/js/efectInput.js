function fadeIn() {
  var transcripcion = document.getElementsByClassName("transcripcion")[0];
  transcripcion.style.opacity = 0;

  
  var tick = function() {
    transcripcion.style.opacity = +transcripcion.style.opacity + 0.05;
    

    if (+transcripcion.style.opacity < 1) {
      (window.requestAnimationFrame && requestAnimationFrame(tick)) || setTimeout(tick, 16)
    }
  };

  tick();
}
