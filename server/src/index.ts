import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import Express from "express";
import { buildSchema } from "type-graphql"
import { createConnection } from "typeorm";
import {RegisterResolver} from "./modules/user/Register";
import cors from "cors";
import { LoginResolver } from "./modules/user/login";
import { LogoutResolver } from "./modules/user/logout";
import { CreatepostResolver } from "./modules/user/CreatePost";
import { EditpostResolver } from "./modules/user/EditPost";
import { DeletepostResolver } from "./modules/user/DeletePost";
import { QueryResolver } from "./modules/user/Queries";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 4000 ;
const ormconfig = require("./ormconfig");

const main = async () =>{

    const app =Express();

    app.use(cookieParser());

    await createConnection(ormconfig);
    const schema = await buildSchema({
        resolvers: [RegisterResolver,LoginResolver,LogoutResolver,
                   CreatepostResolver,EditpostResolver,DeletepostResolver,
                   QueryResolver],
      });

  
    const apolloServer = new ApolloServer({

        schema,
        context : ({req,res}:any) => ({req,res})

    });

    app.use(
        cors({
            credentials:true,
            origin:'http://localhost:3000'
        }));

    apolloServer.applyMiddleware({app,cors:false});

    app.listen(PORT , () => {
        console.log(`Server started on port ${PORT}`);
    });

}

main();