aFunction = function(msg, htmlNode){
    //alert(msg);
    var a = document.createElement("a");
    a.href = "www.google.com";
    a.appendChild(document.createTextNode("Soy un link"));
    htmlNode.style.color = "blue";
    htmlNode.appendChild(a);
};

DecoratorRepository = {
        decorators: [{
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
                ]
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
            elements: [
            ]
        }],
        getDecoratorsForConcept: function (aConcept) {
            for (var i = this.decorators.length - 1; i >= 0; i--) {
                if (this.decorators[i].type == aConcept.name) {
                    return this.decorators[i].elements;
                }
            };   
        }
    };