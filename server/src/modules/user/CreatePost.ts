import { Post } from "../../entity/Post";
import {  Arg, Resolver,ID, Mutation,Query, UseMiddleware} from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../../Middleware/isAuth";

@Resolver()
export class CreatepostResolver {


  @Query( () => User, {nullable:true})
  @UseMiddleware(isAuth)
  async test(
    @Arg("id",()=> ID) id: number,
  ): Promise< User | null> {
    
       const user = await User.findOne(id);
       console.log(user);
       
        return user!;
      
       
  }

  @Mutation( () => Boolean , {nullable : true})
  @UseMiddleware(isAuth)
  async Createpost(
    @Arg("id",()=>ID) id: number,
    @Arg("post") title: string,  
  ) : Promise <Boolean | null>{

    const user = await User.findOne(id,{relations: ["posts"]});
    if(user){
      
        await Post.create({title : title, by:user}).save();
        
        return true;
       }
    return false;
  }

    


}