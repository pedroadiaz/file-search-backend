export const processFilesFunctions = {
    convertPDFToText: {
        handler: './src/functions/processFiles/convertPDFToText.handler',
        events: [
            { 
                s3: {
                    bucket: "file-search-bucket",
                    event: "s3:ObjectCreated:*",
                    rules: [
                        {
                            suffix: ".pdf"
                        }
                    ]
                }
            }
        ]
    }
}