import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { AbstractRepository } from "./abstract.repo";
import { IShareClass } from "@models/shareClass";

export class ShareClassRepo extends AbstractRepository<IShareClass> {
    constructor(client: DocumentClient, tableName: string) {
        super(client, tableName);
    }   
}