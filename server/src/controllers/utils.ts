import bcrypt from 'bcrypt';

export const isPasswordMatch = (loginPassword:string, userPassword:string ):Promise<boolean> => {
    return bcrypt.compare(loginPassword,userPassword);
}

export const hashPassword = async(password:string):Promise<string> =>{
    console.log(password);
    return bcrypt.hash(password,10);
}