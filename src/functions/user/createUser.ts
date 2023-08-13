import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { UserRepo } from '@repos/user.repo';
import { IUser } from '@models/user';
import { createLambda } from '@libs/baseLambda';


export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const user = JSON.parse(event.body) as IUser;
    const client = new DocumentClient();
    const tableName = `${process.env.USER_TABLE}-${process.env.AWS_STAGE}`;
    const repo = new UserRepo(client, tableName);

    return createLambda(repo, user);
}