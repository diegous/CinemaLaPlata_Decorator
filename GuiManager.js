
var GuiManager = {
    // Submenu
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

    // Crea botón "Menu"
    drawMenuButton: function (collection, functionToCall, firstParameter, secondParameter) {
        var li = this.drawSubmenu("Menu", collection, functionToCall, firstParameter, secondParameter);
        var ul = createHTMLHelper({elem:"ul", appendChild:li, className:"dropdown_WebSiteDecorator"});
        return ul;
    },


    // Botón para función de decorator 
    drawSubmenuItem: function (item, decoratorParameter, functionToCall) {
        var span = createHTMLHelper({elem:"span",appendChild:document.createTextNode(item.description)})
        var li = createHTMLHelper({elem:"li", appendChild:span})
        span.onclick = function(){item[functionToCall](decoratorParameter);};

        return li;
    },

    // Submenu para funciones de decorador
    drawConceptDecoratorsSubmenu: function (decorator, decoratorParameter, functionToCall) {
        return this.drawSubmenu(decorator.name, decorator.functions, "drawSubmenuItem", decoratorParameter, functionToCall);
    },

    // Submenu para decoradores para concepto
    drawConceptsSubmenu: function (concept, selectedText, functionToCall) {
        return this.drawSubmenu(concept.type, concept.elements, "drawConceptDecoratorsSubmenu", selectedText, functionToCall);
    },

    // Botón de Menu para todos los conceptos (texto seleccionado)
    drawMenuForAllConcepts: function (conceptsList, decoratorParameter) {
        return this.drawMenuButton(conceptsList, "drawConceptsSubmenu", decoratorParameter, "decorateSelectedText");
    },

    // Botón de Menu para un solo concepto
    drawMenuForAConcept: function (htmlNode, decoratorList) {
        var ul = this.drawMenuButton(decoratorList, "drawConceptDecoratorsSubmenu", htmlNode, "decorateConcept");

        var xpath = htmlNode.conceptProperties[0].xpath;
        var htmlObjects = XpathHelper.getSnapshots(xpath, htmlNode);
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