export const stripeFunctions = {
    createSubscription: {
          handler: './src/functions/stripe/createSubscription.handler',
          events: [
            {
              http: {
                method: 'post',
                path: 'subscription',
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