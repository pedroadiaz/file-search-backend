import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createLambda } from '@libs/baseLambda';
import { IPrompt } from '@models/prompt';
import { PromptRepo } from '@repos/prompt.repo';


export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const classObject = JSON.parse(event.body) as IPrompt;
    const client = new DocumentClient();
    const tableName = `${process.env.PROMPT_TABLE}-${process.env.AWS_STAGE}`;
    const repo = new PromptRepo(client, tableName);

    const result = await createLambda(repo, classObject);

    return result;
}