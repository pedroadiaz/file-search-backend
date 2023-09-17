export const classFunctions = {
    createClass: {
        handler: './src/functions/class/createClass.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: 'class',
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
    getClassById: {
        handler: './src/functions/class/getClass.handler',
        events: [
             {
                http: {
                    method: 'get',
                    path: 'class/{id}',
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
    getClassByUserId: {
        handler: './src/functions/class/getClassesByUser.handler',
        events: [
             {
                http: {
                    method: 'get',
                    path: 'class/user/{userId}',
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
    deleteClassById: {
        handler: './src/functions/class/deleteClass.handler',
        events: [
             {
                http: {
                    method: 'delete',
                    path: 'class/{id}',
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
}