import { Arg, ID, Query, Resolver, UseMiddleware } from "type-graphql";
import { User } from "../../entity/User";
import { Post } from "../../entity/Post";
import { isAuth } from "../../Middleware/isAuth";

@Resolver()
export class QueryResolver {


  @Query(() => User)
    async user(
        @Arg("id") id:string
    ): Promise < User | undefined > {
    
      return await User.findOne(id,{relations:["posts"]}) ;
    }
 
    @Query( () => [User])
    async users( 
    ): Promise <User[] | undefined > {
      return await User.find({relations: ["posts"]});
    }


    @Query( () => [Post])
    async posts( 
    ): Promise <Post[] | undefined > {
      return await Post.find({relations: ["by"]});
    }

    @Query( () => User , {nullable : true})
    @UseMiddleware(isAuth)
    async profile(
      @Arg("userid",()=>ID) userid: number,   
    ) : Promise <User | null>{

      const user = await User.findOne(userid,{relations: ["posts"]});
      if(user){
          return user;
      }

    return null;
  }



}