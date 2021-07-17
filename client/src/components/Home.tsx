import React from "react";
import { useGetPostsQuery } from "../types/generated/generated";
import Navbar from "./Navbar";
import Loader from "./Loader";
const Home : React.FC = ()=>
{
    const { data, loading} = useGetPostsQuery();
    return(
           
            <div >
            <Navbar login={false} />
            <div className=" container p-3">
            <h4 className=" text-success m-2 p-2">ALL POSTS</h4>
            {
                loading? <Loader /> :
                (data?.posts.length ?
                    <div className="container">
                       {
                           data.posts.map((post)=>{
                               return(
                                   <div key={post.id} className="card m-2 p-2 text-start">
                                       <h2>{post.title}</h2>
                                       <h5 style={{float: "left"}}><span className="badge badge-lg bg-info rounded-pill">By : {post.by?.username}</span></h5>  
                                  </div>
                               )
                           })
                       }
                    </div>   
                   :
                  (<div className="container" style={{alignItems:"center"}}>
                     <div className="card p-3 m-3 text-center">
                         <h2 className="card-title p-1" >No Posts Available</h2>
                         <p  className="card-text lead"></p>      
                 </div>
                 </div>))   
            }
 
        </div>
    </div>   
        
    )

}
export default Home;