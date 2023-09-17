import { BaseModel } from "./baseModel";
import { IBook } from "./book";
import { IShareClass } from "./shareClass";

export interface IClass extends BaseModel {
    className: string
    userId: string;
    books?: IBook[];
    shared?: IShareClass[];
}