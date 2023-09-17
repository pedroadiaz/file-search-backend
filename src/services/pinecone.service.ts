import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient, CreateRequest } from "@pinecone-database/pinecone";
import { IVectorStoreService } from "./interfaces/vectorStore.service.interface";
import { Document } from "langchain/dist/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export class PineConeService implements IVectorStoreService {
    constructor() {
    }
    async createIndex(indexName: string): Promise<void> {
        console.log("HERE!!!!!");
        const client = new PineconeClient();
        await client.init({
            apiKey: process.env.PINECONE_AI_API_KEY,
            environment: process.env.PINECONE_ENVIRONMENT
        });

        const params: CreateRequest = {
            name: indexName,
            dimension: 1536,
            metric: "cosine",
            podType: "p1"
        };
        await client.createIndex({
            createRequest: params
        });
    }

    async saveData(docs: Document<Record<string, string>>[], indexId: string): Promise<void> {
        console.log("HERE 2!!!!!");
        const client = new PineconeClient();
        await client.init({
            apiKey: process.env.PINECONE_AI_API_KEY,
            environment: process.env.PINECONE_ENVIRONMENT
        });
        const index = client.Index(indexId);

        await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
            pineconeIndex: index
        });
    }
}