var WebService = {
    /*
    * FakeService
    */
    concepts: function () {
        return webserviceData;
    }
};

var webserviceData = [
        {
            "name": "Cartelera de Cinema La Plata",
            "urlPattern": /cinemalaplata\.com.*\/(C|c)artelera/,
            "concepts": [
                {
                    "id": 1440162653658,
                    "name": "Movie",
                    "tags": ["movie"],
                    "xpath": "//div[@class=\"page-container singlepost\"]",
                    "menuLocation": ".//h4[@class=\"shortcodes-title\"]/strong",
                    "properties": [
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
            "urlPattern": /cinesargentinos\.com.*\/cartelera/,
            "concepts": [
                {
                    "id": 1440162653658,
                    "name": "Movie",
                    "tags": ["movie"],
                    "xpath": "//div[@class=\"texto\"]/ul/li/h3/a",
                    "menuLocation": ".",
                    "properties": [
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
    ];