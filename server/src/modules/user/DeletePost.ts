import { Post } from "../../entity/Post";
import {  Arg,Resolver,ID, Mutation, UseMiddleware} from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../../Middleware/isAuth";

@Resolver()
export class DeletepostResolver {

  @Mutation( () => Boolean , {nullable : true})
  @UseMiddleware(isAuth)
  async Deletepost(
    @Arg("userid",()=>ID) userid: number,
    @Arg("postid",()=>ID) postid: number, 
  ) : Promise <Boolean | null>{

    const user = await User.findOne(userid,{relations: ["posts"]});
    const post = await Post.findOne(postid)
    if(user){
        await Post.delete({id:post?.id});
        return true;
       }
  
    return false;
  }
}