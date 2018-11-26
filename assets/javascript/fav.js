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
var likedRestaurants = [];

database.ref().on("value", function(snapshot) {
    likedRestaurants = snapshot.val().liked;
    console.log(likedRestaurants);

    //Populate the previously liked restaurants.
    populateLikes();

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
});

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

function populateLikes() {
    for (i = 0; i < likedRestaurants.length; i++) {

        var colDiv = $("<div>");
        colDiv.addClass("col s4");
        colDiv.attr("id", "colDiv" + i);

        var cardDiv = $("<div>");
        cardDiv.addClass("card");
        cardDiv.attr("id", "cardDiv" + i);

        var cardImgDiv = $("<div>");
        cardImgDiv.addClass("card-image waves-effect waves-block waves-light");
        cardImgDiv.attr("id", "cardImgDiv" + i);

        var cardImg = $("<img>");
        cardImg.addClass("activator");
        cardImg.attr("src", likedRestaurants[i].image_url);
        cardImg.attr("id", "cardImg" + i);

        var cardContentDiv = $("<div>");
        cardContentDiv.addClass("card-content");
        cardContentDiv.attr("id", "cardContentDiv" + i);

        var cardContentSpan = $("<span>");
        cardContentSpan.addClass("card-title activator grey-text text-darken-4");
        cardContentSpan.text(likedRestaurants[i].name);
        cardContentSpan.attr("id", "cardContentSpan" + i);

        var spanI = $("<i>");
        spanI.addClass("material-icons right");
        spanI.text("restaurant");
        spanI.attr("id", "spanI" + i);

        var contentP = $("<p>");
        contentP.attr("id", "contentP" + i);

        var pLink = $("<a>");
        pLink.attr("href", likedRestaurants[i].url);
        pLink.attr("target", "_blank");
        pLink.text(likedRestaurants[i].name + " Website");
        pLink.attr("id", "pLink" + i);

        var cardRevealDiv = $("<div>");
        cardRevealDiv.addClass("card-reveal");
        cardRevealDiv.attr("id", "cardRevealDiv" + i);

        var cardRevealSpan = $("<span>");
        cardRevealSpan.addClass("card-title grey-text text-darken-4");
        cardRevealSpan.text(likedRestaurants[i].name);
        cardRevealSpan.attr("id", "cardRevealSpan" + i);

        var revealI = $("<i>");
        revealI.addClass("material-icons right");
        revealI.text("close");
        revealI.attr("id", "revealI" + i);

        var revealP = $("<p>");
        revealP.text("Details about the restuarant");
        revealP.attr("id", "revealP" + i);

        // var cardSmall = $("<div>");
        // cardSmall.addClass("card small");
        // cardSmall.attr("id", "cardSmall" + i);

        $("#favsGoHere").append(colDiv);
        $("#colDiv" + i).append(cardDiv);
        $("#cardDiv" + i).append(cardImgDiv);
        $("#cardDiv" + i).append(cardContentDiv);
        $("#cardDiv" + i).append(cardRevealDiv);
        // $("#cardDiv" + i).append(cardSmall);
        $("#cardImgDiv" + i).append(cardImg);
        $("#cardContentDiv" + i).append(cardContentSpan);
        $("#cardContentSpan" + i).append(spanI);
        $("#cardContentDiv" + i).append(contentP);
        $("#contentP" + i).append(pLink);
        $("#cardRevealDiv" + i).append(cardRevealSpan);
        $("#cardRevealSpan" + i).append(revealI);
        $("#cardRevealDiv" + i).append(revealP);
    }
}

