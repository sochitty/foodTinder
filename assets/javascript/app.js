// Initialize Firebase
var config = {
  apiKey: "AIzaSyCkd_pu_cNIG-m9SslOM5VoErwGr3vzt8Q",
  authDomain: "foodtinder-d04db.firebaseapp.com",
  databaseURL: "https://foodtinder-d04db.firebaseio.com",
  projectId: "foodtinder-d04db",
  storageBucket: "foodtinder-d04db.appspot.com",
  messagingSenderId: "770202764576"
};
firebase.initializeApp(config);

var database = firebase.database();

var allRestaurants = [];
var likedRestaurants = [];
var dislikedRestaurants = [];
var restSelector = 0;

database.ref().on("value", function(snapshot) {
  likedRestaurants = snapshot.val().liked;
  dislikedRestaurants = snapshot.val().disliked;
  restSelector = snapshot.val().restSelector;

// If any errors are experienced, log them to console.
}, function(errorObject) {
  console.log("The read failed: " + errorObject.code);
});

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.fixed-action-btn');
  var instances = M.FloatingActionButton.init(elems, {
    direction: 'left'
  });
  //end nav bar

  //calling populat restaurants
  populateRestaurants("Austin");

  function getHealthScore() {
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
  }
  //getHealthScore();
});

function handleResponse() {
  $("#restaurantImage").attr("src", allRestaurants[restSelector].image_url);
  $("#restName").text(allRestaurants[restSelector].name);
  $("#rating").text(allRestaurants[restSelector].rating + "/5");
  $("#genre").text(allRestaurants[restSelector].categories[0].title);
  $("#price").text(allRestaurants[restSelector].price);
}

//ajax call to get an object of 50 restaurants based on a location input
function populateRestaurants(search) {
  var queryURL = "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?location=" + search + 
    "&limit=50";

  $.ajax({
    url: queryURL,
    method: "GET",
    headers: {
      'Authorization':'Bearer TORyea5OVqnWWzs9IHpLAqrzf7DLddQUfO9lKmjIwim5Ha8rFCx9c0ZYc8WDO2ZtQX8lCoJL7rdaTiywiLCJAkMYHuzGYXXGkmCeELnm0BQMk_j_C-qbzT8REyLrW3Yx',
  }  }).then(function(response) {
    allRestaurants = response.businesses;
    handleResponse();
  });
}

//calling sorting function
$(document).on("click", ".vote", sortRestaurant);

//sorting function 
function sortRestaurant() {
  if ($(this).attr("data-like") == "like") {
    likedRestaurants.push(allRestaurants[restSelector]);
  } else {
    dislikedRestaurants.push(allRestaurants[restSelector]);
  }
  if (restSelector < allRestaurants.length - 1) {
    restSelector++;
  } else {
    restSelector = 0;
  console.log(restSelector);
  //load the next restaurant
  handleResponse();
  //store changes in database
  database.ref().set({
    liked: likedRestaurants,
    disliked: dislikedRestaurants,
    restSelector: restSelector,
  });
};