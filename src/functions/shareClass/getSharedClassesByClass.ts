import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { getByForeginKeyIdLambda } from '@libs/baseLambda';
import { ShareClassRepo } from '@repos/shareClass.repo';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const classId = event.pathParameters.classId;
    const client = new DocumentClient();
    const tableName = `${process.env.SHARE_CLASS_TABLE}-${process.env.AWS_STAGE}`;
    const repo = new ShareClassRepo(client, tableName);

    return getByForeginKeyIdLambda(repo, classId, "classId")
}