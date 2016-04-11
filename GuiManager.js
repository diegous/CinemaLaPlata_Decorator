
var GuiManager = {
    // Botón para función de decorator 
    drawSubmenuItem: function(item, decoratorParameter, functionToCall){
        var span = createHTMLHelper({elem:"span",appendChild:document.createTextNode(item.description)})
        var li = createHTMLHelper({elem:"li", appendChild:span})
        span.onclick = function(){item[functionToCall](decoratorParameter);};

        return li;
    },

    // Submenu para funciones de decorador
    drawSubmenu: function(decorator, decoratorParameter, functionToCall){

        var span = createHTMLHelper({elem:"span",appendChild:document.createTextNode(decorator.name)});
        var li = createHTMLHelper({elem:"li",appendChild:span});
        var decoratorMethodsList = createHTMLHelper({elem:"ul",selfAppend:li});

        for (var aFunction of decorator.functions){
            var nodoFuncion = this.drawSubmenuItem(aFunction, decoratorParameter, functionToCall);
            decoratorMethodsList.appendChild(nodoFuncion);
        }

        return li;
    },

    // Submenu para decoradores para concepto
    drawConceptsSubmenu: function(concept, selectedText, functionToCall){
        var span = createHTMLHelper({elem:"span",appendChild:document.createTextNode(concept.type)});
        var decoratorMethodsList = createHTMLHelper({elem:"ul"});

        //Revisar de implementar multiples elementos para appendear en el createHTMLHelper
        var li = createHTMLHelper({elem:"li",appendChild:span});
        li.appendChild(decoratorMethodsList);
        
        for (var decorator of concept.elements){
            var submenu = this.drawSubmenu(decorator, selectedText, functionToCall);
            decoratorMethodsList.appendChild(submenu);
        }

        return li;
    },

    // Botón de Menu para todos los conceptos (texto seleccionado)
    drawMenuForAllConcepts: function(conceptsList, decoratorParameter){
        
        var span = createHTMLHelper({elem:"span",appendChild:document.createTextNode("Menu")});
        var li = createHTMLHelper({elem:"li", appendChild:span});
        var ul = createHTMLHelper({elem:"ul", appendChild:li, className:"dropdown_WebSiteDecorator"});
         
        var decoratorList = createHTMLHelper({elem:"ul", selfAppend:li});
        
        //Revisar de implementar multiples elementos para appendear en el createHTMLHelper
        for (var concept of conceptsList){
            var submenu = this.drawConceptsSubmenu(concept, decoratorParameter, "decorateSelectedText");
            decoratorList.appendChild(submenu);
        }

        return ul;
    },

    // Botón de Menu para un solo concepto
    drawMenu: function(htmlNode, decoratorList){
        var span = createHTMLHelper({elem:"span", appendChild:document.createTextNode("Menu")});
        var li = createHTMLHelper({elem:"li",appendChild:span});
        var ul = createHTMLHelper({elem:"ul",appendChild:li,className:"dropdown_WebSiteDecorator"})
        var list = createHTMLHelper({elem:"ul",selfAppend:li});

        //Revisar de implementar multiples elementos para appendear en el createHTMLHelper
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

function createHTMLHelper (data){
    var elem = document.createElement(data.elem);
    if (data.className) {
        elem.className = data.className;
    }
    if (data.appendChild) {
        elem.appendChild(data.appendChild);
    }
    if (data.selfAppend) {
        data.selfAppend.appendChild(elem);
    }
    return elem;
}   