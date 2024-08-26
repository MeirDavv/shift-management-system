import { Request, Response } from 'express';
import tokenModel from '../models/tokenModel';

const getJwtForEmployee = async (req:Request, res: Response) =>{
    const {employee_id} = req.params;
    const requestingUserId = req.userid;

    if (parseInt(employee_id,10) !== requestingUserId){
        return res.status(403).json({message:'Forbidden. You do not have access to this token.'})
    }

    try{
        const tokenData = await tokenModel.getTokenByEmployeeId(requestingUserId);

        if(tokenData){
            res.status(200).json({accessToken:tokenData.access_token, refreshToken: tokenData.refresh_token});
        }else{
            res.status(404).json({ message: 'No token found for this employee.' });
        }
    } catch (error) {
        console.error('Error retrieving JWT:', error);
        res.status(500).json({ message: 'Internal server error' });
    }

}

export default {getJwtForEmployee};