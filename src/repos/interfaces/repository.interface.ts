import { BaseModel } from "@models/baseModel";

export interface IRepository<T extends BaseModel> {
    saveEntity(entity: T) : Promise<boolean>;
    getAllEntity() : Promise<T[]>;
    getByForeignKeyIdEntity(foreignKeyId: string, foreignKeyName: string) : Promise<T[]>;
    getEntityById(id: string): Promise<T>;
    deleteEntityById(id: string): Promise<boolean>;
}