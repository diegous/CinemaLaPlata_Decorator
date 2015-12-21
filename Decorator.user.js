// ==UserScript==
// @name        Decorator
// @namespace   info.unlp.edu.ar
// @description Webpage enhancer (?)
// @include     http://cinemalaplata.com/Cartelera.aspx*
// @include     file://*
// @version     1
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @require     http://code.stephenmorley.org/javascript/touch-friendly-drop-down-menus/Dropdown.js
// ==/UserScript==

// Esto es para que no se ejecute más de una vez al cargar una página 
// http://stackoverflow.com/questions/5876874/why-does-jquery-load-twice-in-my-greasemonkey-script
if (window.top != window.self){  //-- Don't run on frames or iframes
    return;
}

// **********************************************************
// ************** ARCHIVOS EXTERNOS *************************
// **********************************************************
// Dropdown.js
var Dropdown=function(){function h(a){for(var b=!1,d=0;d<e.length;d++)e[d].isOpen&&(b=!0);if(b){for(a=a.target;null!=a;){if(/\bdropdown\b/.test(a.className))return;a=a.parentNode}f()}}function f(a){for(var b=0;b<e.length;b++)e[b]!=a&&e[b].close()}function g(a){"string"==typeof a&&(a=document.getElementById(a));e.push(new c(a))}function c(a){this.node=a;a.className+=" dropdownJavaScript";"addEventListener"in a?(a.addEventListener("mouseover",this.bind(this.handleMouseOver),!1),a.addEventListener("mouseout",this.bind(this.handleMouseOut),!1),a.addEventListener("click",this.bind(this.handleClick),!1)):(a.attachEvent("onmouseover",this.bind(this.handleMouseOver)),a.attachEvent("onmouseout",this.bind(this.handleMouseOut)),a.attachEvent("onclick",this.bind(this.handleClick)));"createTouch"in document&&a.addEventListener("touchstart",this.bind(this.handleClick),!1)}var e=[];c.prototype.isOpen=!1;c.prototype.timeout=null;c.prototype.bind=function(a){var b=this;return function(){a.apply(b,arguments)}};c.prototype.handleMouseOver=function(a,b){this.clearTimeout();var d="target"in a?a.target:a.srcElement;for(;"LI"!=d.nodeName&&d!=this.node;)d=d.parentNode;"LI"==d.nodeName&&(this.toOpen=d,this.timeout=window.setTimeout(this.bind(this.open),b?0:250))};c.prototype.handleMouseOut=function(){this.clearTimeout();this.timeout=window.setTimeout(this.bind(this.close),250)};c.prototype.handleClick=function(a){f(this);var b="target"in a?a.target:a.srcElement;for(;"LI"!=b.nodeName&&b!=this.node;)b=b.parentNode;"LI"==b.nodeName&&0<this.getChildrenByTagName(b,"UL").length&&!/\bdropdownOpen\b/.test(b.className)&&(this.handleMouseOver(a,!0),"preventDefault"in a?a.preventDefault():a.returnValue=!1)};c.prototype.clearTimeout=function(){this.timeout&&(window.clearTimeout(this.timeout),this.timeout=null)};c.prototype.open=function(){this.isOpen=!0;for(var a=this.getChildrenByTagName(this.toOpen.parentNode,"LI"),b=0;b<a.length;b++){var d=this.getChildrenByTagName(a[b],"UL");if(0<d.length)if(a[b]!=this.toOpen)a[b].className=a[b].className.replace(/\bdropdownOpen\b/g,""),this.close(a[b]);else if(!/\bdropdownOpen\b/.test(a[b].className)){a[b].className+=" dropdownOpen";for(var c=0,e=d[0];e;)c+=e.offsetLeft,e=e.offsetParent;right=c+d[0].offsetWidth;0>c&&(a[b].className+=" dropdownLeftToRight");right>document.body.clientWidth&&(a[b].className+=" dropdownRightToLeft")}}};c.prototype.close=function(a){a||(this.isOpen=!1,a=this.node);a=a.getElementsByTagName("li");for(var b=0;b<a.length;b++)a[b].className=a[b].className.replace(/\bdropdownOpen\b/g,"")};c.prototype.getChildrenByTagName=function(a,b){for(var d=[],c=0;c<a.childNodes.length;c++)a.childNodes[c].nodeName==b&&d.push(a.childNodes[c]);return d};return{initialise:function(){"createTouch"in document&&document.body.addEventListener("touchstart",h,!1);for(var a=document.querySelectorAll("ul.dropdown"),b=0;b<a.length;b++)g(a[b])},applyTo:g}}();

// -------------------------------
// webservice.js
var webserviceData = [
        {
            "name": "Cartelera de Cinema La Plata",
            "urlPattern": "http://cinemalaplata.com/Cartelera.aspx",
            "concepts": [
                {
                    "id": 1440162653658,
                    "name": "Movie",
                    "tags": ["movie"],
                    "xpath": "//div[@class=\"page-container singlepost\"]",
                    "mainProperty": "0",
                    "properties": [
                        {
                            "id": 1440000442391,
                            "name": "Menu Location",
                            "tags": ["menu_location"],
                            "xpath": ".//h4[@class=\"shortcodes-title\"]"
                        },
                        {
                            "id": 1440000442392,
                            "name": "Title",
                            "tags": ["title"],
                            "xpath": ".//h4[@class=\"shortcodes-title\"]/strong/a/text()"
                        }
                    ]
                }
            ]
        },
        {
            "name": "Cartelera de Cinema La Plata",
            "urlPattern": "file:///mnt/5F11BDC19A875904/oo2/CinemaLaPlata_Decorator/page.html",
            "concepts": [
                {
                    "id": 1440162653658,
                    "name": "Movie",
                    "tags": ["movie"],
                    "xpath": "//div[@class=\"page-container singlepost\"]",
                    "mainProperty": "0",
                    "properties": [
                        {
                            "id": 1440000442391,
                            "name": "Menu Location",
                            "tags": ["menu_location"],
                            "xpath": ".//h4[@class=\"shortcodes-title\"]"
                        },
                        {
                            "id": 1440000442392,
                            "name": "Title",
                            "tags": ["title"],
                            "xpath": ".//h4[@class=\"shortcodes-title\"]/strong/a/text()"
                        }
                    ]
                }
            ]
        },
        {
            "name": "Sitio de prueba",
            "urlPattern": "file:///mnt/5F11BDC19A875904/oo2/CinemaLaPlata_Decorator/TestMenus2_sin_javascript.html",
            "concepts": [
                {
                    "id": 432432432,
                    "name": "Pelicula",
                    "tags": ["movie", "Peli"],
                    "xpath": "//li[@class=\"peli\"]",
                    "mainProperty": "0",
                    "properties": [
                        {
                            "id": 43432,
                            "name": "Title",
                            "tags": ["title"],
                            "xpath": "//p[@class=\"id\"]"
                        }
                    ]
                }
            ]
        },
    ];

// -------------------------------
// DecoratorRepository.js
aFunction = function(htmlNode){
    //alert(msg);
    var a = document.createElement("a");
    a.href = "www.google.com";
    a.appendChild(document.createTextNode("Soy un link"));
    htmlNode.style.color = "blue";
    htmlNode.parentNode.insertBefore(a, htmlNode.nextSibling);
    //htmlNode.appendChild(a);
};

function imdbRating(htmlNode){

    var appendData = function(htmlNode, data){
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(data));

        htmlNode.parentNode.insertBefore(p, htmlNode.nextSibling);
    }
    console.log(htmlNode.conceptImdbData);
    if (typeof (htmlNode.conceptImdbData) !== "undefined"){
        appendData(htmlNode, "Puntaje IMDB: "+htmlNode.conceptImdbData.imdbRating);
    } else {
        var xpath = htmlNode.conceptProperties[1].xpath;
        var htmlObjects = XpathHelper.getSnapshots(xpath, htmlNode);
        var title = htmlObjects.snapshotItem(0).data;

        var data = {
            url: 'http://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q='+title,
            callback: function (response) {
                // Obetner el ID con XPath
                var responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
                var resultsIDs = responseXML.evaluate('//td[@class="result_text"]/a/@href', responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                var movieID = resultsIDs.snapshotItem(0).value.substring(7,16);


                var moreData = {
                    url: 'http://www.omdbapi.com/?i='+movieID+'&plot=short&r=json',
                    callback: function(response){
                        var jsonResponse = JSON.parse(response.responseText);

                        htmlNode.conceptImdbData = jsonResponse;
                        appendData(htmlNode, "Puntaje IMDB: "+htmlNode.conceptImdbData.imdbRating);
                    }
                }

                processRequests(moreData);
            }
        };

        processRequests(data);
    }
}

function imdbActors(htmlNode){

    var appendData = function(htmlNode, data){
        var p = document.createElement("p");
        p.appendChild(document.createTextNode(data));

        htmlNode.parentNode.insertBefore(p, htmlNode.nextSibling);
    }
    console.log(htmlNode.conceptImdbData);
    if (typeof (htmlNode.conceptImdbData) !== "undefined"){
        appendData(htmlNode, "Actores: "+htmlNode.conceptImdbData.Actors);
    } else {
        var xpath = htmlNode.conceptProperties[1].xpath;
        var htmlObjects = XpathHelper.getSnapshots(xpath, htmlNode);
        var title = htmlObjects.snapshotItem(0).data;

        var data = {
            url: 'http://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q='+title,
            callback: function (response) {
                // Obetner el ID con XPath
                var responseXML = new DOMParser().parseFromString(response.responseText, "text/html");
                var resultsIDs = responseXML.evaluate('//td[@class="result_text"]/a/@href', responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
                var movieID = resultsIDs.snapshotItem(0).value.substring(7,16);


                var moreData = {
                    url: 'http://www.omdbapi.com/?i='+movieID+'&plot=short&r=json',
                    callback: function(response){
                        var jsonResponse = JSON.parse(response.responseText);

                        htmlNode.conceptImdbData = jsonResponse;
                        appendData(htmlNode, "Actores: "+htmlNode.conceptImdbData.Actors);
                    }
                }

                processRequests(moreData);
            }
        };

        processRequests(data);
    }
}

var DecoratorRepository = {
        decorators: [
            {
                type: "Pelicula",
                elements: [
                    {
                        name: "IMDB",
                        functions: [
                            {
                                description: "Puntaje de IMDb" ,
                                method : aFunction
                            },
                            {
                                description: "Premios",
                                method : aFunction
                            },
                            {
                                description: "Ficha de Director",
                                method : aFunction
                            }
                        ],
                        applyTo: function(guiManager, htmlNode){
                            guiManager.drawSubmenu(this, htmlNode);
                        }
                    },
                    {
                        name: "Mercado Libre",
                        functions: [
                            {
                                description: "Buscar Precios",
                                method : aFunction
                            }
                        ]
                    }
                ]
            },
            {
                type: "Movie",
                elements: [
                    {
                        name: "IMDB",
                        functions: [
                            {
                                description: "Puntaje de IMDb" ,
                                method : imdbRating
                            },
                            {
                                description: "Actores",
                                method : imdbActors
                            },
                            {
                                description: "Ficha de Director",
                                method : aFunction
                            }
                        ],
                        applyTo: function(guiManager, htmlNode){
                            guiManager.drawSubmenu(this, htmlNode);
                        }
                    },
                    {
                        name: "Mercado Libre",
                        functions: [
                            {
                                description: "Buscar Precios",
                                method : aFunction
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

// **********************************************************
// ************** fin archivos externos**********************
// **********************************************************


var GuiManager = {
    drawSubmenuItem: function(item, htmlNode){
        var listItem = document.createElement("li");

        var span = document.createElement("span");
        listItem.appendChild(span);
        span.appendChild(document.createTextNode(item.description));
        span.onclick = function(){item.method(htmlNode);};

        return listItem;
    },

    drawSubmenu: function(decorator, htmlNode){
        var subMenuItem = document.createElement("li");

        var span = document.createElement("span");
        subMenuItem.appendChild(span);
        span.appendChild(document.createTextNode(decorator.name));

        var listaMetodosDecoradores = document.createElement("ul");
        subMenuItem.appendChild(listaMetodosDecoradores);

        for (var aFunction of decorator.functions){
            // aFunction.drawSubmenuItem(aFunction, htmlNode);
            var nodoFuncion = this.drawSubmenuItem(aFunction, htmlNode);
            listaMetodosDecoradores.appendChild(nodoFuncion);
        }

        return subMenuItem;
    },

    drawMenu: function(htmlNode, decoratorList){
        var contenedorUlMenu = document.createElement("ul");
        contenedorUlMenu.className = "dropdown";

        var contenedorLiMenu = document.createElement("li");
        contenedorUlMenu.appendChild(contenedorLiMenu);

        var spanMenu = document.createElement("span");
        contenedorLiMenu.appendChild(spanMenu);
        spanMenu.appendChild(document.createTextNode("Menu"));

        var listaDecoradores = document.createElement("ul");
        contenedorLiMenu.appendChild(listaDecoradores);

        for (var decorator of decoratorList){
            // decorator.drawSubmenu(htmlNode);
            var submenu = this.drawSubmenu(decorator, htmlNode);
            listaDecoradores.appendChild(submenu);
        }

        var xpath = htmlNode.conceptProperties[0].xpath;
        var htmlObjects = XpathHelper.getSnapshots(xpath, htmlNode);
        var mainNode = htmlObjects.snapshotItem(0);

        mainNode.appendChild(contenedorUlMenu);
    }
};

var WebService = {
    /*
    * FakeService
    */
    concepts: function () {
        return webserviceData;
    }
};

var XpathHelper = {
    getSnapshots: function(xpath, source){
        return document.evaluate(xpath, source, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
};

function Concept (aJson) {
    aJson.getNodes = function (){
        var htmlObjects = XpathHelper.getSnapshots(this.xpath, document);
        var htmlNodes = [];

        //for (var i = htmlObjects.snapshotLength - 1; i >= 0; i--) {
        for (var i = 0; i < htmlObjects.snapshotLength; i++) {
            var snapItem = htmlObjects.snapshotItem(i);
            snapItem.conceptProperties = this.properties;
            snapItem.mainProperty = this.mainProperty;
            htmlNodes.push(snapItem);
        }

        return htmlNodes;
    };

    aJson.createMenu = function () {
        var decorators = DecoratorRepository.getDecoratorsForConcept(this);
        this.getNodes().forEach(function(node){GuiManager.drawMenu(node, decorators);});
    };

    return aJson;
}

function WebsiteConceptCollection(aJson){
    aJson.concepts = aJson.concepts.map(function(item){return Concept(item);});

    aJson.createMenu = function () {
        this.concepts.forEach(function(item){item.createMenu();});
    };

    return aJson;
}

function CCFactory(){
    this.jsonList = [];
    this.siteUrl = null;

    this.matchWithLocation = function (url) {
        //retorna si la url coincide o aplica para la ubicacion(location.hostname)
        return this.siteUrl == url;
        //return this.siteUrl.slice(0, url.length) == url;
    };

    this.getJsonConcepts = function () {
        this.jsonList = WebService.concepts();
    };

    this.initialize = function () {
        this.siteUrl = window.location.href;
        this.getJsonConcepts();
        var wccList = [];

        for (var aJson of this.jsonList) {
            if (this.matchWithLocation(aJson.urlPattern)) {
                wccList.push(WebsiteConceptCollection(aJson));
            }
        }

        return wccList;
    };
}

var DecoratorManager = {
    create: function (WCCList){
        WCCList.forEach(function(aWCC){aWCC.createMenu();});
    }
};

var aCCFactory = new CCFactory();
var wccList = aCCFactory.initialize();

DecoratorManager.create(wccList);

// initialise the drop-down menus
Dropdown.initialise();

console.log("fin codigo");








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


