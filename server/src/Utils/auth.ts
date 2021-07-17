import { sign } from "jsonwebtoken";
import { User } from "../entity/User";

export const createAcessToken = (user : User) =>{
     
    return sign({userId : user.id, password : user.password},process.env.ACCESS_TOKEN_SECRET!,{expiresIn:"15m"});

}

