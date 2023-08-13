export const userFunctions = {
    createUser: {
          handler: './src/functions/user/createUser.handler',
          events: [
            {
              http: {
                method: 'post',
                path: 'users',
                cors: {
                  origin: "*",
                  headers: [
                    "Accept",
                    "Content-Type",
                    "Content-Length",
                    "Authorization"
                  ]
                }
              },
            },
          ]
        },
        getUsers: {
          handler: './src/functions/user/getUsers.handler',
          events: [
            {
              http: {
                method: 'get',
                path: 'users',
                cors: {
                  origin: "*",
                  headers: [
                    "Accept",
                    "Content-Type",
                    "Content-Length",
                    "Authorization"
                  ]
                }
              },
            },
          ]
        },
        getUserById: {
          handler: './src/functions/user/getUserById.handler',
          events: [
            {
              http: {
                method: 'get',
                path: 'users/{id}',
                cors: {
                  origin: "*",
                  headers: [
                    "Accept",
                    "Content-Type",
                    "Content-Length",
                    "Authorization"
                  ]
                }
              },
            },
          ]
        },
        getUserByEmail: {
          handler: './src/functions/user/getUserByEmail.handler',
          events: [
            {
              http: {
                method: 'get',
                path: 'users/email',
                cors: {
                  origin: "*",
                  headers: [
                    "Accept",
                    "Content-Type",
                    "Content-Length",
                    "Authorization"
                  ]
                }
              },
            },
          ]
        },
        deleteUserById: {
          handler: './src/functions/user/deleteById.handler',
          events: [
            {
              http: {
                method: 'delete',
                path: 'users/{id}',
                cors: {
                  origin: "*",
                  headers: [
                    "Accept",
                    "Content-Type",
                    "Content-Length",
                    "Authorization"
                  ]
                }
              },
            },
          ]
        },
  }