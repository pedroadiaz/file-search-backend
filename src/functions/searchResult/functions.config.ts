export const searchResultsFunctions = {
    createSearchResult: {
        handler: './src/functions/searchResult/createSearchResult.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: 'searchResult',
                    cors: {
                      origin: "*",
                      headers: [
                        "Accept",
                        "Content-Type",
                        "Content-Length",
                        "Authorization"
                      ]
                    }
                }
            }
        ]
    },
    getSearchResultsByPrompt: {
        handler: './src/functions/searchResult/getSearchResultsByPrompt.handler',
        events: [
            { 
                http: {
                    method: 'get',
                    path: 'searchResult/{promptId}',
                    cors: {
                      origin: "*",
                      headers: [
                        "Accept",
                        "Content-Type",
                        "Content-Length",
                        "Authorization"
                      ]
                    }
                }
            }
        ]
    }
}