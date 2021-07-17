import { Arg, Ctx, Field,  Mutation,ObjectType,Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";
import { createAcessToken } from "../../Utils/auth";

@ObjectType()
class LoginResponse {
  @Field()
  accessToken : string

  @Field()
  user : User
}

@Resolver()
export class LoginResolver {

  @Mutation( () => LoginResponse , {nullable : true})
  async login(
      @Arg("email") email:string,
      @Arg("password") password:string,

      @Ctx() ctx : MyContext
      
  ) : Promise <LoginResponse | null >{

    const user = await User.findOne({where : {email},});

    if(!user){
     
      throw new Error("User not found!!");
    };
   
    const valid = await  bcrypt.compare(password,user.password);

    if(!valid){
      throw new Error("Invalid password");
    };
     ctx.res.cookie("jid",createAcessToken(user))
     return {
      accessToken : createAcessToken(user),
      user
    };
  }

}