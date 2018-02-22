
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // My Code
    var street = $('#street').val();
    var city = $('#city').val();
    var address = street + ', ' + city;

    $greeting.text('So, you want to live at ' + address + '?');

    // Google street view URL to render background image
    var mapsAPIKey = '&key=AIzaSyCZLKPaJyA-1FLAZ3W46gzL1V3AvI4imfk';
    var src = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location='
         + address + mapsAPIKey;
    // console.log(src);
    $body.append('<img class="bgimg" src="' + src + '">');

    // New York times articles
    var nytURL = 'https://api.nyttimes.com/svc/search/v2/articlesearch.json?q=';
    var nytAPIKey = '&api-key=6e6a7d8710f64281951d89fbd7a7325c';
    nytURL = nytURL + city + nytAPIKey;
    // cosole.log(nytAPIKey);
    $.getJSON(nytURL, function (data) {
        // .getJSON returns an object which we then pass to a function to do stuff with it
        $nytHeaderElem.text('New York Times Articles About ' + city);

        articles = data.response.docs;  // this is an array of objects with properties and values
        articles.forEach( function(article) {
            // iterate through the items in the array and make list item elements
            $nytElem.append('<li class="article"><a href="' +
                article.web_url + '"">' + article.headline.main + '</a></li>' +
                '<p>' + article.snippet + '</p>');
        });

    }).fail(function() {
        $nytHeaderElem.append(' Could Not Be Loaded At This Time')
    });


    return false;
};

$('#form-container').submit(loadData);

// Google Maps API Key:
// AIzaSyCZLKPaJyA-1FLAZ3W46gzL1V3AvI4imfk
//
// This works:
// http://maps.googleapis.com/maps/api/streetview?size=600x300&location="city hall, new york, ny"&key=AIzaSyCZLKPaJyA-1FLAZ3W46gzL1V3AvI4imfk
//
// so does this without quotes:
// http://maps.googleapis.com/maps/api/streetview?size=600x300&location=5218 Montclair, Peoria&key=AIzaSyCZLKPaJyA-1FLAZ3W46gzL1V3AvI4imfk
//
// It autoconverts to this:
// http://maps.googleapis.com/maps/api/streetview?size=600x300&location=%22city%20hall,%20new%20york,%20ny%22&key=AIzaSyCZLKPaJyA-1FLAZ3W46gzL1V3AvI4imfk
//
// New York Times URL:
// https://api.nytimes.com/svc/search/v2/articlesearch.json?q=
//
//  NYT Article Search API: 6e6a7d8710f64281951d89fbd7a7325c
//
// This works: https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Peoria&api-key=6e6a7d8710f64281951d89fbd7a7325c
