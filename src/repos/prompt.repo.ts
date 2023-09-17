import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { AbstractRepository } from "./abstract.repo";
import { IPrompt } from "@models/prompt";

export class PromptRepo extends AbstractRepository<IPrompt> {
    constructor(client: DocumentClient, tableName: string) {
        super(client, tableName);
    }   
}