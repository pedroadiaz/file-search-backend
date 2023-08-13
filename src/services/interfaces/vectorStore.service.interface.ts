import { Document } from "langchain/dist/document";

export interface IVectorStoreService {
    createIndex(indexName: string): Promise<void>;
    saveData(docs: Document<Record<string, string>>[], indexId: string): Promise<void>;
}