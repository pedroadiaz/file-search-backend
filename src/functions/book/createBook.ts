import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { createLambda } from '@libs/baseLambda';
import { IBook } from '@models/book';
import { BookRepo } from '@repos/book.repo';


export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const classObject = JSON.parse(event.body) as IBook;
    const client = new DocumentClient();
    const tableName = `${process.env.BOOK_TABLE}-${process.env.AWS_STAGE}`;
    const repo = new BookRepo(client, tableName);

    const result = await createLambda(repo, classObject);

    return result;
}