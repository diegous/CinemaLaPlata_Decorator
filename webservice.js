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