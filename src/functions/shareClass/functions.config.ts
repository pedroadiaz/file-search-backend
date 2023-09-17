export const sharedClassFunctions = {
    createSharedClass: {
        handler: './src/functions/shareClass/createShareClass.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: 'sharedClass',
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
    getSharedClassesByClass: {
        handler: './src/functions/shareClass/getSharedClassesByClass.handler',
        events: [
            { 
                http: {
                    method: 'get',
                    path: 'sharedClass/{classId}',
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