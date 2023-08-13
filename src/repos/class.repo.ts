import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { AbstractRepository } from "./abstract.repo";
import { IClass } from "@models/class";

export class ClassRepo extends AbstractRepository<IClass> {
    constructor(client: DocumentClient, tableName: string) {
        super(client, tableName);
    }   
}