import {verify} from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import { User } from "../entity/User";
import { MyContext } from "../types/MyContext";

export const isAuth:MiddlewareFn<MyContext> = async ({context},next)=>{

   
    if (context.req.cookies.jid) {

       
        const token = context.req.cookies.jid;

        const decoded = verify(token,process.env.ACCESS_TOKEN_SECRET!) as any
       console.log(decoded.password)
        const user = await User.findOne({ where: { id: decoded.userId, password: decoded.password } })
        console.log(user)
        if (user) {
           
            context.req.headers.userId = (user.id).toString()
            return next();
        } else throw new Error("Invalid Credentials");
    } else throw new Error("Login/Register to Continue")

}