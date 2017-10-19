var elem = document.getElementsByClassName("pyr-1")[0];

window.addEventListener("deviceorientation", function(e) {
  // remember to use vendor-prefixed transform property
  elem.style.transform =
    "rotateY(" + (e.alpha - 180) + "deg) " +
    "rotateX(" + (e.beta - 55) + "deg) "; +
    "rotateZ(" + (-e.gamma) + "deg)";
});
