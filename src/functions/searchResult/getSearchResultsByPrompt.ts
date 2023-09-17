import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { getByForeginKeyIdLambda } from '@libs/baseLambda';
import { SearchResultRepo } from '@repos/searchResult.repo';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const promptId = event.pathParameters.promptId;
    const client = new DocumentClient();
    const tableName = `${process.env.SEARCH_RESULT_TABLE}-${process.env.AWS_STAGE}`;
    const repo = new SearchResultRepo(client, tableName);

    return getByForeginKeyIdLambda(repo, promptId, "promptId")
}