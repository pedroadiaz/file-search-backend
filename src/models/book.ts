import { BaseModel } from "./baseModel";

export interface IBook extends BaseModel {
    bookName: string;
    classId: string;
}