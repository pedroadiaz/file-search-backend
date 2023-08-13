import { PineconeStore } from "langchain/vectorstores/pinecone";
import { PineconeClient } from "@pinecone-database/pinecone";
import { IVectorStoreService } from "./interfaces/vectorStore.service.interface";
import { Document } from "langchain/dist/document";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";

export class PineConeService implements IVectorStoreService {
    async createIndex(indexName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async saveData(docs: Document<Record<string, string>>[], indexId: string): Promise<void> {
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