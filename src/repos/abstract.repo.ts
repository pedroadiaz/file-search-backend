import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { IRepository } from './interfaces/repository.interface';
import { BaseModel } from '@models/baseModel';

export abstract class AbstractRepository<T extends BaseModel> implements IRepository<T> {
    
    constructor(protected client: DocumentClient, protected tableName: string) {
    }

    async saveEntity(entity: T): Promise<boolean> {
        const params: DocumentClient.PutItemInput = {
            TableName: this.tableName,
            Item: entity
        };

        try {
            const response = await this.client.put(params).promise();
            
            if (response.$response.error) {
                console.error(response.$response.error);
                return false;
            }
            
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }
    
    async getAllEntity(): Promise<T[]> {
        const params: DocumentClient.ScanInput = {
            TableName: this.tableName,
          };

          try {
            const response = await this.client.scan(params).promise();

            if (response.$response.error) {
                console.error(response.$response.error);
                return null;
            } else {
                return response.Items as T[];
            }
          } catch (error) {
            console.error(error);
            return null;
        }
    }
    
    async getEntityById(id: string): Promise<T> {
        const params: DocumentClient.GetItemInput = {
            TableName: this.tableName,
            Key: { id: id }
        };

        try {
            const response = await this.client.get(params).promise();
    
            if (response.$response.error) {
                console.error(response.$response.error);
                return null;
            } else {
                return response.Item as T;
            }
        } catch (error) {
          console.error(error);
          return null;
        }
    }
    
    async getByForeignKeyIdEntity(foreignKeyId: string, foreignKeyName: string): Promise<T[]> {
        const propertyName = `:${foreignKeyName}`
        const params: DocumentClient.QueryInput = {
            TableName: this.tableName,
            IndexName: `${this.tableName}-${foreignKeyName}-index`,
            KeyConditionExpression: `${foreignKeyName} = ${propertyName}`,
            ExpressionAttributeValues: { [`${propertyName}`]: foreignKeyId }
        };

        try {
            const response = await this.client.query(params).promise();
    
            if (response.$response.error) {
                console.error(response.$response.error);
                return null;
            } else {
                return response.Items as T[];
            }
        } catch (error) {
          console.error(error);
          return null;
        }
    }
        
    async deleteEntityById(id: string): Promise<boolean> {
        const params: DocumentClient.DeleteItemInput = {
            TableName: this.tableName,
            Key: { id: id }
        };

        try {
            const response = await this.client.delete(params).promise();
    
            if (response.$response.error) {
                console.error(response.$response.error);
                return false;
            } else {
                return true;
            }
        } catch (error) {
          console.error(error);
          return false;
        }
    }

}