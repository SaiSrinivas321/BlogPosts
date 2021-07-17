import { Post } from "../../entity/Post";
import {  Arg, Resolver,ID, Mutation, UseMiddleware} from "type-graphql";
import { User } from "../../entity/User";
import { isAuth } from "../../Middleware/isAuth";

@Resolver()
export class EditpostResolver {

 
  @Mutation( () => Boolean , {nullable : true})
  @UseMiddleware(isAuth)
  async Editpost(
    @Arg("userid",()=>ID) userid: number,
    @Arg("postid",()=>ID) postid: number,
    @Arg("post") title: string     
  ) : Promise <Boolean | null>{

    const user = await User.findOne(userid,{relations: ["posts"]});
    const post = await Post.findOne(postid)
    if(user && post){
        await Post.update({id:post!.id},{title})
        
        return true;
    }

    return false;
  }
}