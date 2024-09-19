import { Request } from 'express';

export interface CustomRequest extends Request {
    token?: string;
    userid?: number;
    email?: string;
    first_name?: string;
    last_name?: string;
    organization_id?:number;
    role_id?: number;
}