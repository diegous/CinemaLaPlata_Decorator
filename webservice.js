webserviceData = [
        {
            "name": "Cartelera de Cinema La Plata",
            "urlPattern": "http://cinemalaplata.com/cartelera.aspx",
            "concepts": [
                {
                    "id": 1440162653658,
                    "name": "Movie",
                    "tags": ["movie"],
                    "xpath": "//div[@class=\"page-container singlepost\"]",
                    "properties": [
                        {
                            "id": 1440000442392,
                            "name": "Title",
                            "tags": ["title"],
                            "xpath": ".//h4[@class=\"shortcodes-title\""
                        }
                    ]
                }
            ]
        },
        {
            "name": "Sitio de prueba",
            "urlPattern": "file:///D:/oo2/CinemaLaPlata_Decorator/TestMenus.html",
            "concepts": [
                {
                    "id": 432432432,
                    "name": "Pelicula",
                    "tags": ["movie", "Peli"],
                    "xpath": "//li[@class=\"peli\"]",
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