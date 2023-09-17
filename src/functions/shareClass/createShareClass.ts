import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createLambda } from '@libs/baseLambda';
import { IShareClass } from '@models/shareClass';
import { ShareClassRepo } from '@repos/shareClass.repo';


export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const classObject = JSON.parse(event.body) as IShareClass;
    const client = new DocumentClient();
    const tableName = `${process.env.SHARE_CLASS_TABLE}-${process.env.AWS_STAGE}`;
    const repo = new ShareClassRepo(client, tableName);

    const result = await createLambda(repo, classObject);

    return result;
}