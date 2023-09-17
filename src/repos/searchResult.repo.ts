import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { AbstractRepository } from "./abstract.repo";
import { ISearchResult } from "@models/searchResult";

export class SearchResultRepo extends AbstractRepository<ISearchResult> {
    constructor(client: DocumentClient, tableName: string) {
        super(client, tableName);
    }   
}