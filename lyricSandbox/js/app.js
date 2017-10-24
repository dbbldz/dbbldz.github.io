// var init
var wordNetJSON;
var cmupdJSON
var sylVal;

//Load JSON datasets//
$.getJSON ("datasets/wordnet.json", function(wordNet){
  wordNetJSON = wordNet;
  wordNetJSON = wordNetJSON.synset;
});
$.getJSON ("datasets/cmupd.json", function(cmupd){
  cmupdJSON = cmupd;
});

function rhymeDict(sylVal){
  $("#currentWord").attr("placeholder", searchTerm);
  for (var prop in cmupdJSON){
  // if a property name matches the search string then...
    if (searchTerm === prop){
      // declare arpabet translation
      var arpabet = cmupdJSON[prop];
      var arpabetToArr = arpabet.split(" ").splice(sylVal);
      var arpabet = arpabetToArr.join(" ");
      console.log(searchTerm);
      console.log(arpabet);
      console.log(arpabetToArr);
    }
  } //End loop through cmu-pronouncing-dictionary

  for (var prop in cmupdJSON){
    if(cmupdJSON[prop].endsWith(arpabet)){
      console.log(prop);
      $("#rhyme").append("<li>" + prop + " </li>");
  };
  }
} // End rhymeDict(); method

// 1. target word search submit and store value

var searchTerm = ""; // initializes searchTerm so it can be used globally
$("form").submit(function(event){ // listens to the submit button event
  $("#currentWord").attr("placeholder", searchTerm);
  event.preventDefault(); // stops the form from working as it normally does
  searchTerm = $("input:first").val().toLowerCase(); // sets input field to variable
  console.log(searchTerm); // logs the searchTerm value
  $("input:first").val(""); // resets the form
  $("#thesaurus").html(""); // resets the thesaurus items
  $("#rhyme").html(""); // resets the rhyme items

// 2. find word in thesaurus library and match word with related words
// "word" is the property and the actual words we're looking for are stored in a value paired as an array
// we first need to load the JSON object into the project
  // this loops through each synset(aXXXXX) to do something
  var buildThesaurusArray=[];
  for (var prop in wordNetJSON) {
  // access the property "word" in the property which is an array
    let testWords = wordNetJSON[prop].word;
    //iterate through the arrays
    for (var i=0; i<testWords.length; i++){
      if (searchTerm === testWords[i]){
        // check to see if the searchTerm is one of the words in the array
        //push new arry with words into global array
        buildThesaurusArray.push(testWords);
      } // END IF
    } // END LOOP
    }

  // merge final arr pushed from loop into a single concatenated array
    var mergedThesaurusArray = [].concat.apply([], buildThesaurusArray);
    console.log(mergedThesaurusArray);
  //remove duplicate array items
    var finalThesaurusArray = [];
    $.each(mergedThesaurusArray, function(i, el){
    if($.inArray(el, finalThesaurusArray) === -1) finalThesaurusArray.push(el);
    });
    console.log(finalThesaurusArray);
    //loop to remove underscores
    var x;
    for (x=0; x<finalThesaurusArray.length; x++){
    finalThesaurusArray[x] = finalThesaurusArray[x].replace(/_/g, " ");
  }
// 3. return words under thesaurus headed
//loop over array with unique items only to display words as separate list items
    for (var j=0; j<finalThesaurusArray.length; j++){
      $("#thesaurus").append("<li>" + finalThesaurusArray[j] + " </li>");
    }
//START RHYME DICTIONARY //
//loops through all properties
rhymeDict(sylVal);
});//END EVENT HANDLER
var sylMap = [1,2,3,4,5];
  $("#mySlider").slider({
    max: sylMap.length,
    // max:5,
    min:0,
    animate:"fast",
      slide: function(e, ui) {
        console.log(ui.value);
        $("#rhyme").html(""); // resets the rhyme items
        $("#currentWord").attr("placeholder", searchTerm);
        sylVal=0;
        if (ui.value === 0){
          sylVal = -6;
          rhymeDict(-6);
        } else if (ui.value === 1){
          sylVal = -5;
          rhymeDict(-5);
        } else if (ui.value === 2){
          sylVal = -4;
          rhymeDict(-4);
        } else if (ui.value === 3){
          sylVal = -3;
          rhymeDict(-3);
        } else if (ui.value === 4){
          sylVal = -2;
          rhymeDict(-2);
        } else if (ui.value === 5){
          sylVal = -1;
          rhymeDict(-1);
        }
        ;
      }
  });
