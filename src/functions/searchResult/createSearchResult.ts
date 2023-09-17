import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createLambda } from '@libs/baseLambda';
import { ISearchResult } from '@models/searchResult';
import { SearchResultRepo } from '@repos/searchResult.repo';


export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const classObject = JSON.parse(event.body) as ISearchResult;
    const client = new DocumentClient();
    const tableName = `${process.env.SEARCH_RESULT_TABLE}-${process.env.AWS_STAGE}`;
    const repo = new SearchResultRepo(client, tableName);

    const result = await createLambda(repo, classObject);

    return result;
}