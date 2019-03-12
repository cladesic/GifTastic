$(document).ready(function () {

 var topics=["work","computer","games"];   

 function topicButtons() {


    $("#topics-view").empty();

    for (var i = 0; i < topics.length; i++) {

      var a = $("<button>");
      a.addClass("topic");
      a.attr("data-name", topics[i]); 
      a.text(topics[i]);
      $("#topics-view").append(a);
      console.log(topics[i]);
    }
  }
  $("#add-topic").on("click", function(event) { 
    event.preventDefault(); 
    var topic = $("#topic-input").val().trim();
    console.log(topic);
    topics.push(topic);

    topicButtons();
  });
  topicButtons();

  $("button").on("click", function() {
      console.log(this);
    var topicCategory= $(this).attr("data-name")
    var queryURL = "https://api.giphy.com/v1/gifs/search?q="+ topicCategory + "&api_key=dc6zaTOxFJmzC&limit=10";
console.log("button pushed" +topicCategory);
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;

          for (var i = 0; i < results.length; i++) {

            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              var gifDiv = $("<div>");
              var rating = results[i].rating;
              var p = $("<p>").text("Rating: " + rating);

              var topicImage = $("<img>");

              topicImage.attr("src", results[i].images.fixed_height.url);

              gifDiv.append(p);
              gifDiv.append(topicImage);

              $("#gifs-return").prepend(gifDiv);
            }
        }
      });
  });


});