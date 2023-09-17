import { APIGatewayProxyEvent, APIGatewayProxyResult, Context } from 'aws-lambda';
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { getByIdLambda } from '@libs/baseLambda';
import { ClassRepo } from '@repos/class.repo';
import { BookRepo } from '@repos/book.repo';
import { ShareClassRepo } from '@repos/shareClass.repo';
import { formatJSONResponse } from '@libs/api-gateway';

export const handler = async(event: APIGatewayProxyEvent, context: Context) : Promise<APIGatewayProxyResult> => {
    const id = event.pathParameters.id;
    const client = new DocumentClient();
    const tableName = `${process.env.CLASS_TABLE}-${process.env.AWS_STAGE}`;
    const booksTableName = `${process.env.BOOK_TABLE}-${process.env.AWS_STAGE}`;
    const sharedClassTableName = `${process.env.SHARE_CLASS_TABLE}-${process.env.AWS_STAGE}`;
    const repo = new ClassRepo(client, tableName);
    const bookRepo = new BookRepo(client, tableName);
    const sharedClassRepo = new ShareClassRepo(client, tableName);

    const subject = await repo.getEntityById(id);

    
    if (subject) {
        subject.books = await bookRepo.getByForeignKeyIdEntity(id, "classId");
        subject.shared = await sharedClassRepo.getByForeignKeyIdEntity(id, "classId");
        return formatJSONResponse({
            data: subject
        });
    } else {
        return formatJSONResponse({
            message: "There was a problem retrieving the result",
        },
        404);
    }
}