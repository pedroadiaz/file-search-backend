import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { getByIdLambda } from '@libs/baseLambda';
import { ClassRepo } from '@repos/class.repo';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const client = new DocumentClient();
    const tableName = `${process.env.CLASS_TABLE}+${process.env.AWS_STAGE}`;
    const repo = new ClassRepo(client, tableName);

    return getByIdLambda(repo, id);
}