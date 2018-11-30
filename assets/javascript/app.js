

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
var allGenres = [];
var allPrices = [];
var likedRestaurants = [];
var dislikedRestaurants = [];
var restSelector = 0;

database.ref().on("value", function(snapshot) {
  if (likedRestaurants.lenght > 0) {
    likedRestaurants = snapshot.val().liked;
  }
  if (dislikedRestaurants.lenght > 0) {
    dislikedRestaurants = snapshot.val().disliked;
  }
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
});

// update the dom with restaurants from a new city
$("#citySearch").on('submit', function(event) {
  event.preventDefault();
  populateRestaurants($("#searchVal").val());
});

//populates the dom with restaurants for sorting
function nextRestaurant() {
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
    //load the first restaurant for sorting
    nextRestaurant();
    //populateGenres();
    //populatePrices();
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
  }
  //load the next restaurant
  nextRestaurant();
  //store changes in database
  database.ref().set({
    liked: likedRestaurants,
    disliked: dislikedRestaurants,
    restSelector: restSelector,
  });
};

<<<<<<< HEAD
$('#search').on('click', function(){
  populateRestaurants();
  
});
=======
//future versions of the app will start with a sorting feature
// of a unique list of genres to flip through before narrowing 
// down to price and finally restaurants
function populateGenres() {
  for (i = 0; i < allRestaurants.length; i++) {
    allGenres.push(allRestaurants[i].categories[0].title);
  }
  allGenres = [ ...new Set(allGenres) ];
  console.log(allGenres);
}

function populatePrices() {
  for (i = 0; i < allRestaurants.length; i++) {
    allPrices.push(allRestaurants[i].price);
  }
  allPrices = [ ...new Set(allPrices) ];
  console.log(allPrices);
}
>>>>>>> 997bf641f235da5cca3b919779c3684bf8eb69c1

