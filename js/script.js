
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!

    var baseURL = "http://maps.googleapis.com/maps/api/streetview?size=600x300&location=";
    var streetValue = $("#street").val();
    var cityValue = $("#city").val();
    var address = streetValue + ", " + cityValue;

    var contentURL = baseURL.concat(address);

    $body.append('<img class="bgimg" src="http://example.com/someimage.png">');
    var img = $("img");
    img.addClass("bgimg");
    img.attr("src", contentURL);

    var nyTimesURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

    nyTimesURL += '?' + $.param({'api-key': "862eb1f3fe854e6e84f2a83ab4953a67",'q': address});

    $.getJSON(nyTimesURL, function(data) {

        var listElems = [];
        var docs = data.response.docs;
        for (i = 0; i < docs.length; i++) {
            var currDoc = docs[i];
            var anchor = '<a href=' + currDoc.web_url + '>' + currDoc.headline.main + '</a>';
            var paragraph = '<p>' + currDoc.snippet + '</p>';
            var listELem = '<li class="article">' + anchor + paragraph + '</li>';
            listElems.push(listELem);
        }
        var unorderedList = '<ul id="nytimes-articles" class="article-list">' + listElems.join("") + '</ul>';
        $nytElem.append(listElems.join(""));
    }).fail(function( jqxhr, textStatus, error ) {
        $nytHeaderElem.html("New York Times Articles Could Not Be Loaded!")
    });

    var wikipediaURL = "https://en.wikipaaaaaaaedia.org/w/api.php";
    wikipediaURL += '?' + $.param({'action': "opensearch","format": "json","search": cityValue});

    var ajaxTimeout = setTimeout(function(){
        $wikiElem.text("Failed to get Wikipedia Source");
    }, 8000);

    $.ajax({ url: wikipediaURL, dataType: "jsonp", success: function(data, textStatus, jqXHR) {

            var listElems = [];

            var titles = data[1];
            var links = data[3];

            for (i = 0; i < titles.length; i++) {
                var anchor = '<a href=' + links[i] + '>' + titles[i] + '</a>';
                var listElem = '<li>' + anchor + '</li>';
                listElems.push(listElem);
            }
            $wikiElem.append(listElems.join(""));

            clearTimeout(ajaxTimeout);
        }
    });

    return false;
};

$('#form-container').submit(loadData);
