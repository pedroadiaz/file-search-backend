export const bookFunctions = {
    createBook: {
        handler: './src/functions/book/createBook.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: 'book',
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
    getBooksByClass: {
        handler: './src/functions/book/getBooksByClass.handler',
        events: [
            { 
                http: {
                    method: 'get',
                    path: 'book/{classId}',
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