import { Arg, Mutation, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";


@Resolver()
export class RegisterResolver {

  @Mutation( () => User)
  async register(
      @Arg("username") username:string,
      @Arg("email") email:string,
      @Arg("password") password:string,
     
      
  ) : Promise <User>{

    const encryptedPassword = await bcrypt.hash(password,12);
    const user = await User.create({
        username,
        email,
        password:encryptedPassword,
    
    }).save()
    return user;
  }

}