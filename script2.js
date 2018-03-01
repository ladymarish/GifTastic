$(document).ready(function() {

  // VARIABLES
  // --------------------------------------------------------------------------
  var topics = [
    "Ronaldinho",
    "Dennis Bergkamp",
    "Rivaldo"
  ];

  // FUNCTIONS
  // --------------------------------------------------------------------------
  $.each(topics, function (i) {
    $("<input>")
      .attr('type', 'button')
      // .attr('data-person', topics[i])
      .attr('value', topics[i])
      .appendTo($("#buttons"))
    ;
  });

  $("#topic-submit").on('click', function(event) {
    event.preventDefault();

    if ($("#topic-input").val() === "") {return}

    var topicInput = $("#topic-input").val().trim();
    var newBtn = $("<input>").attr('type', 'button');

    newBtn
      // .attr('data-person', topicInput)
      .attr('value', topicInput)
      .appendTo($("#buttons"))
    ;

    topics.push(topicInput);

    $("#topic-input").val("");
  });
    
  $("input[type='button']").on('click', function() {
    // var btnAdded = $(this).attr('data-person');
    var btnAdded = $(this).attr('value');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      btnAdded + "&api_key=dc6zaTOxFJmzC&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
    
    .then(function(response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var addedImage = $("<img>");

          addedImage
            .attr("src", results[i].images.fixed_height_still.url)
            .attr("data-still", results[i].images.fixed_height_still.url)
            .attr("data-animate", results[i].images.fixed_height.url)
            .attr("data-state", "still")
            .addClass("gif")
            .append(p)
          ;

          $("#topic").prepend(addedImage);
        }
      }
    });
  });

  $(document).on("click", '.gif', function() {
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
  
});