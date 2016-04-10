
var GuiManager = {
    // Botón para función de decorator 
    drawSubmenuItem: function(item, decoratorParameter, functionToCall){
        var li = document.createElement("li");

        var span = document.createElement("span");
        li.appendChild(span);
        span.appendChild(document.createTextNode(item.description));
        span.onclick = function(){item[functionToCall](decoratorParameter);};

        return li;
    },

    // Submenu para funciones de decorador
    drawSubmenu: function(decorator, decoratorParameter, functionToCall){
        var li = document.createElement("li");

        var span = document.createElement("span");
        li.appendChild(span);
        span.appendChild(document.createTextNode(decorator.name));

        var decoratorMethodsList = document.createElement("ul");
        li.appendChild(decoratorMethodsList);

        for (var aFunction of decorator.functions){
            var nodoFuncion = this.drawSubmenuItem(aFunction, decoratorParameter, functionToCall);
            decoratorMethodsList.appendChild(nodoFuncion);
        }

        return li;
    },

    // Submenu para decoradores para concepto
    drawConceptsSubmenu: function(concept, selectedText, functionToCall){
        var li = document.createElement("li");

        var span = document.createElement("span");
        li.appendChild(span);
        span.appendChild(document.createTextNode(concept.type));

        var decoratorMethodsList = document.createElement("ul");
        li.appendChild(decoratorMethodsList);
        
        for (var decorator of concept.elements){
            var submenu = this.drawSubmenu(decorator, selectedText, functionToCall);
            decoratorMethodsList.appendChild(submenu);
        }

        return li;
    },

    // Botón de Menu para todos los conceptos (texto seleccionado)
    drawMenuForAllConcepts: function(conceptsList, decoratorParameter){
        var ul = document.createElement("ul");
        ul.className = "dropdown_WebSiteDecorator";

        var li = document.createElement("li");
        ul.appendChild(li);

        var span = document.createElement("span");
        li.appendChild(span);
        span.appendChild(document.createTextNode("Menu"));

        var decoratorList = document.createElement("ul");
        li.appendChild(decoratorList);
        
        for (var concept of conceptsList){
            var submenu = this.drawConceptsSubmenu(concept, decoratorParameter, "decorateSelectedText");
            decoratorList.appendChild(submenu);
        }

        return ul;
    },

    // Botón de Menu para un solo concepto
    drawMenu: function(htmlNode, decoratorList){
        var ul = document.createElement("ul");
        ul.className = "dropdown_WebSiteDecorator";

        var li = document.createElement("li");
        ul.appendChild(li);

        var span = document.createElement("span");
        li.appendChild(span);
        span.appendChild(document.createTextNode("Menu"));

        var list = document.createElement("ul");
        li.appendChild(list);

        for (var decorator of decoratorList){
            var submenu = this.drawSubmenu(decorator, htmlNode, "decorateConcept");
            list.appendChild(submenu);
        }

        var xpath = htmlNode.conceptProperties[0].xpath;
        var htmlObjects = XpathHelper.getSnapshots(xpath, htmlNode);
        var mainNode = htmlObjects.snapshotItem(0);
        mainNode.parentNode.insertBefore(ul, mainNode.nextSibling);
    },
};