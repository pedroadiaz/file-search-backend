import { APIGatewayProxyResult } from 'aws-lambda';
import { IRepository } from "@repos/interfaces/repository.interface";
import { formatJSONResponse } from '@libs/api-gateway';
import { BaseModel } from '@models/baseModel';
import { STATUS_CODES } from 'http';

export const createLambda = async<T extends BaseModel>(service: IRepository<T>, entity: T) : Promise<APIGatewayProxyResult> => {    
    console.log("entity base lambda: ", entity);

    const result = await service.saveEntity(entity);

    if (result) {
        return formatJSONResponse({
            message: "Entity successfully created"
        },
        201);
    } else {
        return formatJSONResponse({
            message: `There was an error inserting the entity.`,
        },
        500);
    }
}

export const getLambda = async<T extends BaseModel>(service: IRepository<T>) : Promise<APIGatewayProxyResult> => {
    const results = await service.getAllEntity();
    console.log("results: ", results);

    if (results) {
        return formatJSONResponse({
            data: results
        });
    } else {
        return formatJSONResponse({
            message: "There was a problem retrieving the results",
        });
    }
}

export const getByIdLambda = async<T extends BaseModel>(service: IRepository<T>, id: string) : Promise<APIGatewayProxyResult> => {
    const result = await service.getEntityById(id);
    console.log("result: ", result);

    if (result) {
        return formatJSONResponse({
            data: result
        });
    } else {
        return formatJSONResponse({
            message: "There was a problem retrieving the result",
        },
        404);
    }
}

export const getByForeginKeyIdLambda = async<T extends BaseModel>(service: IRepository<T>, foreignKeyId: string, foreignKeyName: string) : Promise<APIGatewayProxyResult> => {
    const result = await service.getByForeignKeyIdEntity(foreignKeyId, foreignKeyName);

    if (result) {
        return formatJSONResponse({
            data: result
        });
    } else {
        return formatJSONResponse({
            message: "There was a problem retrieving the result",
        },
        404);
    }
}

export const deleteByIdLambda = async<T extends BaseModel>(service: IRepository<T>, id: string) : Promise<APIGatewayProxyResult> => {
    const result = await service.deleteEntityById(id);

    if (result) {
        return formatJSONResponse({
            data: result
        });
    } else {
        return formatJSONResponse({
            message: "There was a problem retrieving the result",
        });
    }
}