// Initial array of brands
var brands = ["Converse", "Vans", "Louis Vuitton", "Nike", "Prada", "Chanel", "X-men", "shoes", "youtube", "horses", "modern dance", "runway", "Uggs"];

// displayShoeImages function re-renders the HTML to display the appropriate content
function displayShoeImages() {
  $("#shoes-view").empty();

  var brandName = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + brandName + "&api_key=h1r3UpbjPtncFwWwh82S3X0ODSXi9Vsn";

  // Creating an AJAX call for the specific animal button being clicked

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response)
    for (i = 0; i < 10; i++) {
      var rating = response.data[i].rating;
      var activeImg = response.data[i].images.fixed_height.url;
      console.log(rating);
      console.log(image);
      var stillImg = response.data[i].images.fixed_height_still.url;
      console.log(stillImg);
      
      var pOne = $("<p>").text("Rating: " + rating);
      var image = $("<img>").attr("src", stillImg).attr("data-still", stillImg).attr("data-animate", activeImg).attr("data-state", "still");

      $("#shoes-view").append(pOne);
      $("#shoes-view").append(image);
      image.addClass("gif");

     

    }
  });

}



$(document).on("click", ".gif", function () {
  // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
  var state = $(this).attr("data-state");
  // If the clicked image's state is still, update its src attribute to what its data-animate value is.
  // Then, set the image's data-state to animate
  // Else set src to the data-still value
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }

});
// Function for displaying shoe data
function renderButtons() {
  // (this is necessary otherwise we will have repeat buttons)
  $("#shoe-buttons").empty();
  // Looping through the array of brands
  for (var i = 0; i < brands.length; i++) {

    // Then dynamicaly generating buttons for each movie in the array.
    // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
    var newButton = $("<button>");
    // Adding a class
    newButton.addClass("shoe-btn");
    // Adding a data-attribute with a value of the movie at index i
    newButton.attr("data-name", brands[i]);
    // Providing the button's text with a value of the movie at index i
    newButton.text(brands[i]);
    // Adding the button to the HTML
    $("#shoe-buttons").append(newButton);
  }
}

// This function handles events where one button is clicked
$("#add-shoe").on("click", function (event) {
  // event.preventDefault() prevents the form from trying to submit itself.
  // We're using a form so that the user can hit enter instead of clicking the button if they want
  event.preventDefault();
  // This line will grab the text from the input box
  var brand = $("#shoe-input").val().trim();
  // The movie from the textbox is then added to our array
  brands.push(brand);

  // calling renderButtons which handles the processing of our animal array
  renderButtons();
  $("#shoe-input").val("")
});


// Adding a click event listener to all elements with a class of "s-btn"
$(document).on("click", ".shoe-btn", displayShoeImages);

// Calling the renderButtons function at least once to display the initial list of animals
renderButtons();
