import {Request, Response, NextFunction} from 'express';

const verifyAPIkey = (req:Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-api-key'];

    if (apiKey === process.env.AI_API_KEY){
        next(); // API is valid, procceed with request
    } else{
        res.status(403).json({meessage: 'Forbidden: Invalid API key'});
    }
}

export default verifyAPIkey;