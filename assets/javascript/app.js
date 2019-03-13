$(document).ready(function () {

    var topics = ["work", "computer", "games", "programing", "happy", "trucks"];
    var still = [];
    var active =[];


    function topicButtons() {


        $("#topics-view").empty();

        for (var i = 0; i < topics.length; i++) {

            var a = $("<button>");
            a.addClass("topic");
            a.attr("data-name", topics[i]);
            a.text(topics[i]);
            $("#topics-view").append(a);

        }
    }
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val().trim();
        topics.push(topic);
        $("#topic-input").val("");

        topicButtons();
    });
    topicButtons();

    $(document).on("click", "button", function () {
        var topicCategory = $(this).attr("data-name")
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicCategory + "&api_key=dc6zaTOxFJmzC&limit=10";
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
             //   console.log(results);
                for (var i = 0; i < results.length; i++) {
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                        var gifDiv = $("<div>");
                        var rating = results[i].rating;
                        var p = $("<p>").text("Rating: " + rating);
                        var topicImage = $("<img>");
                        topicImage.attr("src", results[i].images.fixed_height_still.url); 
                        topicImage.addClass("topicGif");
                        topicImage.attr("data-state", "still");
                        topicImage.attr("data-still", results[i].images.fixed_height_still.url);
                        topicImage.attr("data-animate", results[i].images.fixed_height.url );
                        gifDiv.append(p);
                        gifDiv.append(topicImage);
                        $("#gifs-return").prepend(gifDiv);

                    }
                    
                }
                
            });
    });
    $(document).on("click", ".topicGif", function () {
       
        var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
       
    
    

});