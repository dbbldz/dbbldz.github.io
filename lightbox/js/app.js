// This is a simple lightbox program I made using jQuery

let test=1;
let counter=0;
let windowWidth = $(window).width();

$("img").click(function(){
  // entire block wrapped in condition to prevent user from clicking on another image while the lightbox focuses on the "current image" since test value goes to 0 when any single image is clicked and is incremented back to 1 when the user clicks the 'esc' button

  if (test===1){
    test--;

  // creates a new fixed element that takes up entire body and darkens content behind it
    $(".lightbox-bg").css("display","inherit");
  // targets event img and makes it a centered, fixed, element with a higher z-index than the dimmer panel
    $(this).css({
      "margin":"0",
      "position": "fixed",
      "z-index":"2",
      "width":"70%",
  // % positioning combined with translate offset = perfect centering
      "top":"50%",
      "left":"50%",
      "transform":"rotate(360deg) translate(-50%, -50%)",
    });
  // parses event object width property so we can calculate the correct height (3:2 ratio)
      imgWidth = parseInt($(this).css("width"));
      imgHeight = (2*imgWidth)/3;
      $(this).css("height", imgHeight+"px");

  //inserts a blank list item set to the exact height and width of the static li
    $(this).after("<li class="+'"'+"blank-li"+'"'+"></li>");
  //inserts a fixed 'escape' button
    $(this).before("<button type=" +'"'+"button"+'"'+">X</button>");
  //calculates correct positioning for the esc button based on width of the event object applying negative margins to one half of the image width gets us in the upper left corner of the image
    $("button").css({
      "margin-left":-(imgWidth/2)+"px",
      "margin-top":-(imgHeight/2)+"px"
    });
  //this time out function was necessary to let the first set of styles from the stylesheet drop in before applying the opacity + color fade transition effect
    window.setTimeout( function() { $("button").css({
      "opacity":"1",
      "color":"tomato"
    });
  },200);

  //allows targeting of the current image so we can differentiate between all images and the image currently in focus. I couldn't figure out how to target the image using .this or image.current-image and adding this class was the only thing that worked out

  $(this).addClass("current-image");

  //updates the height of the image when the window is resized AFTER clicked. images load proportionally on site load but break if the browser is resized. this fixes that. probably could turn this into a function since the code is very similar but not sure how to do that.

  $(window).resize(function(){
    imgWidth = parseInt($(".current-image").css("width"));
    imgHeight = (2*imgWidth)/3;
    $(".current-image").css("height", imgHeight+"px");
    $("button").css({
      "margin-left":-(imgWidth/2)+10+"px",
      "margin-top":-(imgHeight/2)+10+"px",
      "color":"tomato"
    });
  });

  //Start Button Click Funtion - everything from here on revert img back to it's original position and delete the 'X' button
    //clicking the button
    $("button").click(function(){
      //removes the black placeholder list item
      $("li.blank-li").remove();
      //turns off the dimmer
      $(".lightbox-bg").css("display","none");
      //restores original styling to the image (maybe an easier way to do this?)
      $(this).next().css({
        "position": "relative",
        "z-index":"0",
        "width":"300px",
        "height":"200px",
        "margin":"10px",
        "left":"0",
        "transform":"rotate(-360deg)  translate(0)"
      });
      //removes the button
      $(this).remove();
      //removes the current-image class since having an addClass left on an image confuses our program about which element we want it to update on window resize and breaks that functionality
      $("img").removeClass("current-image");
      //increments tester so we can click a new image and run this code again
      test++;
      counter++;
      if (counter>9){
        alert("OK calm down it's not THAT fucking fun");
        counter-=10;
      }
    });
  }
  else {
  }
});
