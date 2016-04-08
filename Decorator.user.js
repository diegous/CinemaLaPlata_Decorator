// ==UserScript==
// @name        Decorator
// @namespace   info.unlp.edu.ar
// @description Webpage enhancer (?)
// @include     *
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
                            "xpath": ".//h4[@class=\"shortcodes-title\"]/strong"
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
            "name": "Cartelera de Cines Arentinos",
            "urlPattern": "http://www.cinesargentinos.com.ar/cartelera/",
            "concepts": [
                {
                    "id": 1440162653658,
                    "name": "Movie",
                    "tags": ["movie"],
                    "xpath": "//div[@class=\"texto\"]/ul/li/h3/a",
                    "mainProperty": "0",
                    "properties": [
                        {
                            "id": 1440000442391,
                            "name": "Menu Location",
                            "tags": ["menu_location"],
                            "xpath": "."
                        },
                        {
                            "id": 1440000442392,
                            "name": "Title",
                            "tags": ["title"],
                            "xpath": "./text()"
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
    // Botón para función de decorator 
    drawSubmenuItem: function(item, decoratorParameter, functionName){
        var li = document.createElement("li");

        var span = document.createElement("span");
        li.appendChild(span);
        span.appendChild(document.createTextNode(item.description));
        span.onclick = function(){item[functionName](decoratorParameter);};

        return li;
    },

    // Submenu para funciones de decorador
    drawSubmenu: function(decorator, decoratorParameter, functionName){
        var subMenuItem = document.createElement("li");

        var span = document.createElement("span");
        subMenuItem.appendChild(span);
        span.appendChild(document.createTextNode(decorator.name));

        var listaMetodosDecoradores = document.createElement("ul");
        subMenuItem.appendChild(listaMetodosDecoradores);
        for (var aFunction of decorator.functions){
            // aFunction.drawSubmenuItem(aFunction, htmlNode);
            var nodoFuncion = this.drawSubmenuItem(aFunction, decoratorParameter, functionName);
            listaMetodosDecoradores.appendChild(nodoFuncion);
        }

        return subMenuItem;
    },

    // Submenu para decoradores para concepto
    drawConceptsSubmenu: function(concept, selectedText, functionName){
        var subMenuItem = document.createElement("li");

        var span = document.createElement("span");
        subMenuItem.appendChild(span);
        span.appendChild(document.createTextNode(concept.type));

        var listaMetodosDecoradores = document.createElement("ul");
        subMenuItem.appendChild(listaMetodosDecoradores);
        
        for (var decorator of concept.elements){
            var submenu = this.drawSubmenu(decorator, selectedText, functionName);
            listaMetodosDecoradores.appendChild(submenu);
        }

        return subMenuItem;
    },

    // Botón de Menu para todos los conceptos (texto seleccionado)
    drawMenuForAllConcepts: function(conceptsList, decoratorParameter){
        var contenedorUlMenu = document.createElement("ul");
        contenedorUlMenu.className = "dropdown_WebSiteDecorator";

        var contenedorLiMenu = document.createElement("li");
        contenedorUlMenu.appendChild(contenedorLiMenu);

        var spanMenu = document.createElement("span");
        contenedorLiMenu.appendChild(spanMenu);
        spanMenu.appendChild(document.createTextNode("Menu"));

        var listaDecoradores = document.createElement("ul");
        contenedorLiMenu.appendChild(listaDecoradores);

        var functionName = "selectedText";
        
        for (var concept of conceptsList){
            var submenu = this.drawConceptsSubmenu(concept, decoratorParameter, functionName);
            listaDecoradores.appendChild(submenu);
        }

        return contenedorUlMenu;
    },

    // Botón de Menu para un solo concepto
    drawMenu: function(htmlNode, decoratorList){
        var contenedorUlMenu = document.createElement("ul");
        contenedorUlMenu.className = "dropdown_WebSiteDecorator";

        var contenedorLiMenu = document.createElement("li");
        contenedorUlMenu.appendChild(contenedorLiMenu);

        var spanMenu = document.createElement("span");
        contenedorLiMenu.appendChild(spanMenu);
        spanMenu.appendChild(document.createTextNode("Menu"));

        var listaDecoradores = document.createElement("ul");
        contenedorLiMenu.appendChild(listaDecoradores);

        var functionName = "method";

        for (var decorator of decoratorList){
            var submenu = this.drawSubmenu(decorator, htmlNode, functionName);
            listaDecoradores.appendChild(submenu);
        }

        var xpath = htmlNode.conceptProperties[0].xpath;
        var htmlObjects = XpathHelper.getSnapshots(xpath, htmlNode);
        var mainNode = htmlObjects.snapshotItem(0);
        mainNode.parentNode.insertBefore(contenedorUlMenu, mainNode.nextSibling);
    },
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

var pageX, pageY;
var selectedText = {text:"", focusNode: "", focusOffset: ""};

function decorateSelection() {
    // crear menu escondido para cuando haya selección
    var allConcepts = DecoratorRepository.getAllDecorators();

    var hiddenMenu = GuiManager.drawMenuForAllConcepts(allConcepts, selectedText);
    hiddenMenu.style.display = "none"; 
    hiddenMenu.id = "hiddenDropdownMenu";

    var bodyElement = document.getElementsByTagName("body")[0];
    bodyElement.appendChild(hiddenMenu);

    window.onmousedown = function (e) {
        pageX = e.pageX;
        pageY = e.pageY;
    };

    window.onmouseup = function () {
        hiddenMenu = document.getElementById('hiddenDropdownMenu');
        
        if (window.getSelection().toString() != "") {
            selectedText.text = window.getSelection().toString();
            selectedText.focusNode = window.getSelection().focusNode;
            selectedText.focusOffset = window.getSelection().focusOffset;
            hiddenMenu.style.display = "block";
            hiddenMenu.style.left = pageX + "px";
            hiddenMenu.style.top = (pageY - 35)+"px";
        } else {
            hiddenMenu.style.display = "none";                     
        };
    };
}

var aCCFactory = new CCFactory();
var wccList = aCCFactory.initialize();

DecoratorManager.create(wccList);

decorateSelection();

// initialise the drop-down menus
Dropdown.initialise();