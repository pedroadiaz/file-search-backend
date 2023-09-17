export const promptFunctions = {
    createPrompt: {
        handler: './src/functions/prompt/createPrompt.handler',
        events: [
            {
                http: {
                    method: 'post',
                    path: 'prompt',
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
    getPromptByClass: {
        handler: './src/functions/prompt/getPromptByClass.handler',
        events: [
            { 
                http: {
                    method: 'get',
                    path: 'prompt/{classId}',
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