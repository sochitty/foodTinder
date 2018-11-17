// Initialize Firebase
var config = {
  apiKey: "AIzaSyCkd_pu_cNIG-m9SslOM5VoErwGr3vzt8Q",
  authDomain: "foodtinder-d04db.firebaseapp.com",
  databaseURL: "https://foodtinder-d04db.firebaseio.com",
  projectId: "foodtinder-d04db",
  storageBucket: "foodtinder-d04db.appspot.com",
  messagingSenderId: "770202764576"
};
//firebase.initializeApp(config);

var likedRestaurants = [];
var dislikedRestaurants = [];

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.fixed-action-btn');
    var instances = M.FloatingActionButton.init(elems, {
      direction: 'left'
    });
    //end nav bar

    $.ajax({
      url: "https://data.austintexas.gov/resource/nguv-n54k.json",
      type: "GET",
      data: {
        "$limit" : 5000,
        "$$app_token" : "i03YK9NGI8Vg6d6pqTTHndSeF"
      }
  }).done(function(data) {
    
    console.log('Here is your data, sir!' + data);
  });
});

function populateRestaurants(search) {


  var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + search + 
    "&limit=50";

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      'Authorization':'Bearer TORyea5OVqnWWzs9IHpLAqrzf7DLddQUfO9lKmjIwim5Ha8rFCx9c0ZYc8WDO2ZtQX8lCoJL7rdaTiywiLCJAkMYHuzGYXXGkmCeELnm0BQMk_j_C-qbzT8REyLrW3Yx',
  }  }).then(function(response) {
    console.log(response);
    //var movieData = JSON.stringify(response);
  });
}

populateRestaurants("Austin");

$(".vote").on("click", function() {
  if ($(this).attr("data-like") == "like") {
    likedRestaurants.append("current restaurant");
  } else {
    dislikedRestaurants.append("current restuarant");
  }
});