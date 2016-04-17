
var GuiManager = {
    // Dibuja submenu
    drawSubmenu: function (text, collection, functionToCall, firstParameter, secondParameter) {
        var span = createHTMLHelper({elem:"span", appendChild:document.createTextNode(text)});
        var list = createHTMLHelper({elem:"ul"});
        var li = createHTMLHelper({elem:"li", appendChildren:[span, list]});

        for (var element of collection){
            var nodoFuncion = this[functionToCall](element, firstParameter, secondParameter);
            list.appendChild(nodoFuncion);
        }

        return li;
    },

    // Dibuja botón "Menu" y submenus
    drawMenuButton: function (collection, functionToCall, firstParameter, secondParameter) {
        var li = this.drawSubmenu("Menu", collection, functionToCall, firstParameter, secondParameter);
        var ul = createHTMLHelper({elem:"ul", appendChild:li, className:"dropdown_WebSiteDecorator"});
        return ul;
    },

    // Dibuja botón de menú que llama a una función
    drawSubmenuItem: function (item, decoratorParameter, functionToCall) {
        var span = createHTMLHelper({elem:"span",appendChild:document.createTextNode(item.description)})
        var li = createHTMLHelper({elem:"li", appendChild:span})
        span.onclick = function(){item[functionToCall](decoratorParameter);};

        return li;
    },

    // Dibuja submenu con funciones de un decorador
    drawConceptDecoratorsSubmenu: function (decorator, decoratorParameter, functionToCall) {
        return this.drawSubmenu(decorator.name, decorator.functions, "drawSubmenuItem", decoratorParameter, functionToCall);
    },

    // Dibuja submenu con decoradores para un concepto
    drawConceptsSubmenu: function (concept, selectedText, functionToCall) {
        return this.drawSubmenu(concept.type, concept.elements, "drawConceptDecoratorsSubmenu", selectedText, functionToCall);
    },

    // Crea menú para texto seleccionado
    drawMenuForAllConcepts: function (conceptsList, decoratorParameter) {
        return this.drawMenuButton(conceptsList, "drawConceptsSubmenu", decoratorParameter, "decorateSelectedText");
    },

    // Crea menú para un Concepto
    drawMenuForAConcept: function (htmlNode, decoratorList) {
        var ul = this.drawMenuButton(decoratorList, "drawConceptDecoratorsSubmenu", htmlNode, "decorateConcept");

        var menuXpath = htmlNode.menuLocation;
        var htmlObjects = XpathHelper.getSnapshots(menuXpath, htmlNode);
        var mainNode = htmlObjects.snapshotItem(0);
        mainNode.parentNode.insertBefore(ul, mainNode.nextSibling);
    },
};

function createHTMLHelper (data) {
    var elem = document.createElement(data.elem);

    if (data.className)
        elem.className = data.className;

    if (data.appendChild) 
        elem.appendChild(data.appendChild);

    if (data.appendChildren)
        for (element of data.appendChildren)
            elem.appendChild(element);

    return elem;
}