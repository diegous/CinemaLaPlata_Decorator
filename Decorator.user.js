// ==UserScript==
// @name        Decorator
// @namespace   info.unlp.edu.ar
// @description Webpage enhancer (?)
// @include     http://www.cinemalaplata.com/Cartelera.aspx*
// @include     file://*
// @version     2.113
// @grant       GM_xmlhttpRequest
// @grant       GM_log
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @require     https://raw.githubusercontent.com/diegous/CinemaLaPlata_Decorator/master/Dropdown.js
// @require     https://raw.githubusercontent.com/diegous/CinemaLaPlata_Decorator/master/DecoratorRepository.js
// @resource    DropdownStyle https://raw.githubusercontent.com/diegous/CinemaLaPlata_Decorator/master/Dropdown.css
// @resource    DemonstrationStyle https://raw.githubusercontent.com/diegous/CinemaLaPlata_Decorator/master/demonstration.css
// ==/UserScript==

// Agregar CSS de los menus
var css1 = GM_getResourceText("DropdownStyle");
var css2 = GM_getResourceText("DemonstrationStyle");
GM_addStyle(css1);
GM_addStyle(css2);

// Esto es para que no se ejecute más de una vez al cargar una página 
// http://stackoverflow.com/questions/5876874/why-does-jquery-load-twice-in-my-greasemonkey-script
if (window.top != window.self){  //-- Don't run on frames or iframes
    return;
}

// **********************************************************
// ************** ARCHIVOS EXTERNOS *************************
// **********************************************************
// webservice.js
// @require     https://raw.githubusercontent.com/diegous/CinemaLaPlata_Decorator/master/webservice.js
var webserviceData = [
        {
            "name": "Cartelera de Cinema La Plata",
            "urlPattern": "http://www.cinemalaplata.com/Cartelera.aspx",
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
            "urlPattern": "file:///home/enrique/git/CinemaLaPlata_Decorator/page.html",
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
            "urlPattern": "file:///home/enrique/git/CinemaLaPlata_Decorator/TestMenus2_sin_javascript.html",
            "concepts": [
                {
                    "id": 432432432,
                    "name": "Movie",
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

var XpathHelper = {
    getSnapshots: function(xpath, source){
        return document.evaluate(xpath, source, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
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