$(document).ready(function() {

var animalsArray = ["cat", "dog", "elephant", "llama", "rabbit", "orangutan", "horse", "giraffe", "pig", "panda", "chipmunk", "bear", "goat", "chicken", "sloth", "kangaroo", "chimp", "wolf"];

function addingButtons() {
  $("#animalButtons").empty();
  for (var i = 0; i < animalsArray.length; i++ ) {
	 var a = $("<button>");
	 a.addClass("animal");
	 a.attr("data-name", animalsArray[i]);
	 a.text(animalsArray[i]);
	 $("#animalButtons").append(a);
  }
} 

$("#addAnimal").on("click", function(event) {
  event.preventDefault();
  var usersAnimals = $("#animal-input").val().trim();
  animalsArray.push(usersAnimals);
  addingButtons();
});

$(document).on("click", "button", function(event) {  
	  var animal = $(this).attr("data-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=CbYKK743SG3LKWTOQ97GPlkfRM8JaVx6&q=" + animal + "&limit=10&offset=0&rating=G&lang=en";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
      var results = response.data;
      for (var i = 0; i < results.length; i++) {
        var animalDiv = $("<div>");
        var p = $("<p>").text("Rating: " + results[i].rating);
        var animalImage = $("<img>");
        animalImage.attr("src", results[i].images.fixed_height.url);
        animalDiv.append(p);
        animalDiv.addClass("giphy");
        animalDiv.append(animalImage);
        $("#giphies").prepend(animalDiv);
      }
   });
});

$(document).on("click", "button", function(event) {
   var state = $(this).attr("data-state");
   if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
   } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
   }
});

addingButtons();

});
