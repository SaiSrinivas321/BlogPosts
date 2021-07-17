import { Field, ID, ObjectType } from "type-graphql";
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn} from "typeorm";
import { Post } from "./Post";


@ObjectType()
@Entity()
export  class User extends BaseEntity{

    @Field(()=> ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    username: string;

    @Field()
    @Column("text" , {unique : true})
    email: string;

    @Column()
    password: string;


    @Field(()=> [Post],{nullable:true})
    @OneToMany(()=> Post , post=> post.by)
    @JoinColumn({name:"postId"})
    posts: Post[]

}