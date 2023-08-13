import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { ClassRepo } from '@repos/class.repo';
import { getByForeginKeyIdLambda } from '@libs/baseLambda';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const userId = event.pathParameters.userId;
    const client = new DocumentClient();
    const tableName = `${process.env.CLASS_TABLE}+${process.env.AWS_STAGE}`;
    const repo = new ClassRepo(client, tableName);

    return getByForeginKeyIdLambda(repo, userId, "userId")
}