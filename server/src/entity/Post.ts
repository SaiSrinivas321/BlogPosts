import { Field ,ID,ObjectType } from "type-graphql";
import {Entity ,Column, BaseEntity, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from "typeorm";
import { User } from "./User";


@ObjectType()
@Entity()
export  class Post extends BaseEntity{

    @Field(()=>ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    title: string;

    @Field(()=>ID)
    @Column({nullable:true})
    userId:number
    @Field(()=> User,{nullable:true})
    @ManyToOne(()=>User,user=>user.posts)
    @JoinColumn({name:"userId"})
    by: User;

    


}