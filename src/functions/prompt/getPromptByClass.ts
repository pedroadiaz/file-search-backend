import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { getByForeginKeyIdLambda } from '@libs/baseLambda';
import { PromptRepo } from '@repos/prompt.repo';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const classId = event.pathParameters.classId;
    const client = new DocumentClient();
    const tableName = `${process.env.PROMPT_TABLE}-${process.env.AWS_STAGE}`;
    const repo = new PromptRepo(client, tableName);

    return getByForeginKeyIdLambda(repo, classId, "classId")
}