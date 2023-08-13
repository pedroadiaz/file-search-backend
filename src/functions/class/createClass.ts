import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { IClass } from '@models/class';
import { createLambda } from '@libs/baseLambda';
import { ClassRepo } from '@repos/class.repo';
import { PineConeService } from '@services/pinecone.service';


export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const classObject = JSON.parse(event.body) as IClass;
    const client = new DocumentClient();
    const tableName = `${process.env.CLASS_TABLE}+${process.env.AWS_STAGE}`;
    const repo = new ClassRepo(client, tableName);

    const result = await createLambda(repo, classObject);
    const service = new PineConeService();
    await service.createIndex(classObject.id)

    return result;
}