// ==UserScript==
// @name        Decorator
// @namespace   info.unlp.edu.ar
// @description Webpage enhancer (?)
// @include     http://cinemalaplata.com/*
// @include     file://*
// @version     1
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// ==/UserScript==

console.log("ç-- inicio  --");


var movieTitleElement = getTitleElementsFromCinemaLaPlata();


for (var i = 0; i < movieTitleElement.snapshotLength; i++) {
    try {
        var movieNode = new MovieNode(movieTitleElement.snapshotItem(i))
        // getIMDbID(movieNode);
        getIMDbIDFromIMDb(movieNode);
        // getMLPrices(movieNode);


    } catch (e) {
        console.log("----------------------- ERROR ------------------");
        console.log(e);
        console.log("----------------------- ERROR ------------------");
    }
}


console.log("ç-- fin --");



// -------------------------------------------------
// -----------------   FUNCIONES   -----------------
// -------------------------------------------------


function getTitleElementsFromCinemaLaPlata(){
    return document.evaluate('//div[@class="page-container singlepost"]/h4[@class="shortcodes-title"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null)
}

function getIMDbIDFromXML(xmlIMDbResponse){
    var movieID = xmlIMDbResponse.evaluate('//ImdbEntity/@id', xmlIMDbResponse, null, XPathResult.STRING_TYPE, null).stringValue;
    return movieID;
}

function getIMDbID(movieNode){
    var data = {
        url: "http://www.imdb.com/xml/find?xml=1&nr=1&tt=on&q="+movieNode.getTitle(),
        callback: function (response) {
            // Obtener ID de película
            responseXML = new DOMParser().parseFromString(response.responseText, "text/xml");
            var movieID = getIMDbIDFromXML(responseXML);
            movieNode.appendIMDBNode(movieID);
        }
    };

    processRequests(data);
}

function getIMDbIDFromIMDb(movieNode){
    var data = {
        url: 'http://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q='+movieNode.getTitle(),
        callback: function (response) {
            // Obetner el ID con XPath
            var responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
            var resultsIDs = responseXML.evaluate('//td[@class="result_text"]/a/@href', responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
            var movieID = resultsIDs.snapshotItem(0).value.substring(7,16);

            // Obtener el ID con expresión regular
            // var regex = /title\/(tt\d{7})\//g;
            // var movieID = response.response.match(regex)[1].substring(6,15);
            movieNode.appendIMDBNode(movieID);
        }
    };

    processRequests(data);
}

function getMLPrices(movieNode) {
    var data = {
        url: "https://api.mercadolibre.com/sites/MLA/search?category=MLA13508&q="+movieNode.getTitle(),
        callback: function (response) {
            responseAsJson = JSON.parse(response.response);
            console.log(responseAsJson.results[0].price+"----"+responseAsJson.results[0].currency_id);

        }
    };

    processRequests(data);    
}

function processRequests(data) {
    GM_xmlhttpRequest({
        method: "GET",
        url: data.url,
        headers: {"Accept": "application/json"},
        // synchronous: true,
        // synchronous: false,
        onload: function(response) {
            console.log("adentro, ANTES del request");
            data.callback(response);
            console.log("adentro, despues del request");
        }
    });
}

// MovieNode Class
function MovieNode(movieNode){
    this.htmlNode = movieNode;
    
    this.getTitle = function () {
        // movieNode.childNodes[1].childNodes[1].textContent
        return this.htmlNode.childNodes[1].childNodes[1].textContent;
    }

    this.appendIMDBNode = function (id) {
        // movieNode.childNodes[1].appendChild(node);
        var textNode = document.createTextNode("IMDb link");
        var node = document.createElement("a");
        node.appendChild(textNode);
        node.setAttribute("href", "http://www.imdb.com/title/"+id);
        // node.setAttribute("href", "http://www.imdb.com/"+id);
        return this.htmlNode.childNodes[1].appendChild(node);
    } 
}


