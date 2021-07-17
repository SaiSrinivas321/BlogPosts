import { Ctx, Mutation, Resolver } from "type-graphql";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class LogoutResolver{

    @Mutation(() => Boolean)
    async logout(@Ctx() {res} : MyContext ) : Promise<Boolean> {

        res.clearCookie("jid")

        return true;
    }

}