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