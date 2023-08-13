import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { getLambda } from '@libs/baseLambda';
import { UserRepo } from '@repos/user.repo';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const client = new DocumentClient();
    const tableName = `${process.env.USER_TABLE}-${process.env.AWS_STAGE}`;
    const repo = new UserRepo(client, tableName);

    return getLambda(repo);
}