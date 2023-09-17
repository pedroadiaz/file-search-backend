import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { AbstractRepository } from "./abstract.repo";
import { IBook } from "@models/book";

export class BookRepo extends AbstractRepository<IBook> {
    constructor(client: DocumentClient, tableName: string) {
        super(client, tableName);
    }   
}