import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { IUser } from '@models/user';
import { AbstractRepository } from "./abstract.repo";


export class UserRepo extends AbstractRepository<IUser> {
    constructor(client: DocumentClient, tableName: string) {
        super(client, tableName);
    }   
}