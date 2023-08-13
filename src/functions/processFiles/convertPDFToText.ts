import { Context, S3Event } from "aws-lambda";
import { S3Loader } from "langchain/document_loaders/web/s3";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { PineConeService } from "@services/pinecone.service";

export const convertPDFToText = async (event: S3Event, context: Context) => {
    await Promise.all(event.Records.map(async (rec) => {
        const bucket = rec.s3.bucket.name;
        const key = rec.s3.object.key;

        const indexId = key.split("/")?.[0];

        const loader = new S3Loader({
            bucket: bucket,
            key: key, 
            unstructuredAPIURL: process.env.UNSTRUCTURED_API_URL,
            unstructuredAPIKey: process.env.UNSTRUCTURED_API_KEY
        });

        const doc = await loader.load();

        const splitter = new RecursiveCharacterTextSplitter({
            chunkSize: 4000,
            chunkOverlap: 0
        });

        const splitText = await splitter.splitDocuments(doc);

        const service = new PineConeService();

        await service.saveData(splitText, indexId);
    }));
}