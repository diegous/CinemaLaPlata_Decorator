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
// @require     https://raw.githubusercontent.com/diegous/CinemaLaPlata_Decorator/master/GuiManager.js
// @require     https://raw.githubusercontent.com/diegous/CinemaLaPlata_Decorator/master/webservice.js
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

var XpathHelper = {
    getSnapshots: function(xpath, source){
        return document.evaluate(xpath, source, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
    }
};

function Concept (aJson) {
    aJson.getNodes = function (){
        var htmlObjects = XpathHelper.getSnapshots(this.xpath, document);
        var htmlNodes = [];

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
        this.getNodes().forEach(function(node){GuiManager.drawMenuForAConcept(node, decorators);});
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
        //return this.siteUrl == url;
        //return this.siteUrl.slice(0, url.length) == url;
        return url.test(this.siteUrl);
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



// ****************************
// ************main************
// ****************************

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