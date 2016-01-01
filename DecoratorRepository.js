var XpathHelper = {
    getSnapshots: function(xpath, source){
        return document.evaluate(xpath, source, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
};

function processRequests(data) {
    GM_xmlhttpRequest({
        method: "GET",
        url: data.url,
        headers: {"Accept": "application/json"},
        // synchronous: true,
        // synchronous: false,
        onload: function(response) {
            data.callback(response);
        }
    });
}

function appendData(htmlNode, data){
    var newNode = document.createElement("div");
    newNode.appendChild(data);

    htmlNode.parentNode.insertBefore(newNode, htmlNode.nextSibling);
}

aFunction = function(htmlNode){
    //alert(msg);
    var a = document.createElement("a");
    a.href = "www.google.com";
    a.appendChild(document.createTextNode("Soy un link"));
    htmlNode.style.color = "blue";
    htmlNode.parentNode.insertBefore(a, htmlNode.nextSibling);
    //htmlNode.appendChild(a);
};

var DecoratorRepository = {
        decorators: [
            {
                type: "Movie",
                elements: [
                    {
                        name: "IMDB",
                        functions: [
                            {
                                description: "Puntaje de IMDb" ,
                                method : function imdbRating(htmlNode){
                                    var actionFunction = function(){
                                        appendData(htmlNode, document.createTextNode("Puntaje IMDB: "+htmlNode.conceptImdbData.imdbRating));
                                    }

                                    var getImdbData = function(movieID){
                                        return {
                                            url: 'http://www.omdbapi.com/?i='+movieID+'&plot=short&r=json',
                                            callback: function(response){
                                                var jsonResponse = JSON.parse(response.responseText);

                                                htmlNode.conceptImdbData = jsonResponse;
                                                actionFunction();
                                            }
                                        }
                                    }

                                    var findImdbId = function(title){
                                        return {
                                            url: 'http://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q='+title,
                                            callback: function (response) {
                                                // Obetner el ID con XPath
                                                var responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
                                                var resultsIDs = responseXML.evaluate('//td[@class="result_text"]/a/@href', responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                                var movieID = resultsIDs.snapshotItem(0).value.substring(7,16);

                                                processRequests(getImdbData(movieID));
                                            }
                                        }
                                    }
                                    
                                    if (typeof (htmlNode.conceptImdbData) !== "undefined"){
                                        actionFunction();
                                    } else {
                                        var xpath = htmlNode.conceptProperties[1].xpath;
                                        var htmlObjects = XpathHelper.getSnapshots(xpath, htmlNode);
                                        var title = htmlObjects.snapshotItem(0).data;

                                        processRequests(findImdbId(title));
                                    }
                                }
                            },
                            {
                                description: "Actores",
                                method : function imdbActors(htmlNode){
                                    var actionFunction = function(){
                                        appendData(htmlNode, document.createTextNode("Actores: "+htmlNode.conceptImdbData.Actors));
                                    }

                                    var getImdbData = function(movieID){
                                        return {
                                            url: 'http://www.omdbapi.com/?i='+movieID+'&plot=short&r=json',
                                            callback: function(response){
                                                var jsonResponse = JSON.parse(response.responseText);

                                                htmlNode.conceptImdbData = jsonResponse;
                                                actionFunction();
                                            }
                                        }
                                    }

                                    var findImdbId = function(title){
                                        return {
                                            url: 'http://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q='+title,
                                            callback: function (response) {
                                                // Obetner el ID con XPath
                                                var responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
                                                var resultsIDs = responseXML.evaluate('//td[@class="result_text"]/a/@href', responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                                var movieID = resultsIDs.snapshotItem(0).value.substring(7,16);

                                                processRequests(getImdbData(movieID));
                                            }
                                        }
                                    }
                                    
                                    if (typeof (htmlNode.conceptImdbData) !== "undefined"){
                                        actionFunction();
                                    } else {
                                        var xpath = htmlNode.conceptProperties[1].xpath;
                                        var htmlObjects = XpathHelper.getSnapshots(xpath, htmlNode);
                                        var title = htmlObjects.snapshotItem(0).data;

                                        processRequests(findImdbId(title));
                                    }
                                }
                            },
                            {
                                description: "Título Internacional",
                                method : function imdbInternationalTitle(htmlNode){
                                    var actionFunction = function(){
                                        appendData(htmlNode, document.createTextNode("Título Internacional: "+htmlNode.conceptImdbData.Title));
                                    }

                                    var getImdbData = function(movieID){
                                        return {
                                            url: 'http://www.omdbapi.com/?i='+movieID+'&plot=short&r=json',
                                            callback: function(response){
                                                var jsonResponse = JSON.parse(response.responseText);

                                                htmlNode.conceptImdbData = jsonResponse;
                                                actionFunction();
                                            }
                                        }
                                    }

                                    var findImdbId = function(title){
                                        return {
                                            url: 'http://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q='+title,
                                            callback: function (response) {
                                                // Obetner el ID con XPath
                                                var responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
                                                var resultsIDs = responseXML.evaluate('//td[@class="result_text"]/a/@href', responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                                var movieID = resultsIDs.snapshotItem(0).value.substring(7,16);

                                                processRequests(getImdbData(movieID));
                                            }
                                        }
                                    }
                                    
                                    if (typeof (htmlNode.conceptImdbData) !== "undefined"){
                                        actionFunction();
                                    } else {
                                        var xpath = htmlNode.conceptProperties[1].xpath;
                                        var htmlObjects = XpathHelper.getSnapshots(xpath, htmlNode);
                                        var title = htmlObjects.snapshotItem(0).data;

                                        processRequests(findImdbId(title));
                                    }
                                }
                            }
                        ],
                        applyTo: function(guiManager, htmlNode){
                            guiManager.drawSubmenu(this, htmlNode);
                        }
                    },
                    {
                        name: "Trailer Addict",
                        functions: [
                            {
                                description: "Buscar Video",
                                method : function trailerAddict(htmlNode){
                                    var getTrailer = function(movieID){
                                        return {
                                            url: 'http://api.traileraddict.com/?imdb='+movieID.slice(2),
                                            callback: function(response){
                                                var regex = /v.traileraddict.com\/(\d*)/;
                                                var regexResult = regex.exec(response.responseText);
                                                var trailerId = regexResult[1];

                                                var newNode = document.createElement("iframe");
                                                newNode.setAttribute("src", "http://v.traileraddict.com/"+trailerId);
                                                newNode.setAttribute("height", "270");
                                                newNode.setAttribute("width", "480");

                                                appendData(htmlNode, newNode);
                                            }
                                        }
                                    }

                                    var findImdbId = function(title){
                                        return {
                                            url: 'http://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q='+title,
                                            callback: function (response) {
                                                // Obetner el ID con XPath
                                                var responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
                                                var resultsIDs = responseXML.evaluate('//td[@class="result_text"]/a/@href', responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                                                var movieID = resultsIDs.snapshotItem(0).value.substring(7,16);

                                                processRequests(getTrailer(movieID));
                                            }
                                        }
                                    }
                                    
                                    if (typeof (htmlNode.conceptImdbData) !== "undefined"){
                                        processRequests(getTrailer(htmlNode.conceptImdbData.imdbID));
                                    } else {
                                        var xpath = htmlNode.conceptProperties[1].xpath;
                                        var htmlObjects = XpathHelper.getSnapshots(xpath, htmlNode);
                                        var title = htmlObjects.snapshotItem(0).data;

                                        processRequests(findImdbId(title));
                                    }
                                }
                            }
                        ]
                    }
                ]
            },
            {
                type: "song",
                elements: []
            }
        ],
        getDecoratorsForConcept: function (aConcept) {
            for (var i = this.decorators.length - 1; i >= 0; i--) {
                if (this.decorators[i].type == aConcept.name) {
                    return this.decorators[i].elements;
                }
            }
        }
    };