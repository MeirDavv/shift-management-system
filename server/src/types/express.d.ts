import {Request} from 'express';

declare module 'express-serve-static-core' {
    interface Request {
        userid?: number;
        first_name?: string;
        last_name?: string;
        email?:string;
        role_id?:number;
    }
}