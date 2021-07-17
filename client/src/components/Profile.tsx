import React, { useContext ,useState} from "react";
import { GET_POSTS, PROFILE } from "../Queries.graphql";
import { useCreatePostMutation, useDeletePostMutation, useEditPostMutation, useGetProfileQuery} from "../types/generated/generated";
import { Usercontext } from "../Usercontext";
import Navbar from "./Navbar";
import Loader from "./Loader";
import { Fragment } from "react";


const Profile:React.FC = ()=>{
  
    const [update,setUpdate]=useState(false);
    const [postid,setPostId]=useState("");
    const { id } =useContext(Usercontext);

    const { data, loading} = useGetProfileQuery({
        variables:{
            userid : id
        }
    });

    const posts=data?.profile?.posts;

    const [CreatePostMutation]=useCreatePostMutation({});
    const [DeletePostMutation]=useDeletePostMutation({});
    const [UpdatePostMutation]=useEditPostMutation({});
  
   
    
    const CreatePost=(e:any)=>{

        let post =  (document.getElementById("post") as HTMLInputElement).value;

        CreatePostMutation({
            variables:{
                id,
                post:post
            },refetchQueries:[{query:PROFILE,variables:{userid:id}},{query:GET_POSTS}]
        },);
        e.preventDefault();
        (document.getElementById("post") as HTMLInputElement).value="";
    }

    const DeletePost =(postid:any)=>{

        DeletePostMutation({
            variables:{
                postid,
                userid:id
            },refetchQueries:[{query:PROFILE,variables:{userid:id}},{query:GET_POSTS}]
        },)
    }

    const UpdatePost=()=>{

        UpdatePostMutation({
          variables:{
              postid,
              userid:id,
              post:(document.getElementById("post") as HTMLInputElement).value

          },refetchQueries:[{query:PROFILE,variables:{userid:id}},{query:GET_POSTS}]
        });

        (document.getElementById("post") as HTMLInputElement).value="";
        setUpdate(false);
    }

    return(
      <Fragment>
          {loading ? (<Loader />) : ( (data && data.profile) ? (
      <div>
        <Navbar login={true}/>  
       <div className="card usercard float-start p-2">
           <h2 className="card-title text-danger">Hello {data?.profile!.username}!</h2>
       </div>
        <div className=" text-center p-2 container p-3">
        <form>
            <ul style={{height:40}}>
            <input type="text" placeholder="Post" className="form-control" id="post"/><br/>&emsp;
            {
                update ? <button className="btn btn-success" style={{width:200} }
                onClick={UpdatePost}>Update Post</button>:(<button className="btn btn-primary" style={{width:200} }
            onClick={CreatePost}>Create Post</button>)
            }
            </ul>
        </form> 
        {
        loading?
           ( <Loader />):
            (posts?.length ?
                <div className="container">
                   {
                       posts?.map((post)=>{
                           return(
        
                               <div key={post.id} className="card m-2 p-2 text-start">
                                   <h2>{post.title}</h2>  
                                   <span className="text-end icon-group">
                                       <button className="btn btn-success icon"
                                       onClick={()=>{
                                           (document.getElementById("post") as HTMLInputElement).value=post.title
                                           setPostId(post.id)
                                           setUpdate(true);
                                       }}><i className="fas fa-edit fa-1x"></i></button>
                                       <button className="btn btn-danger icon"
                                       onClick={()=>{DeletePost(post.id)}}><i className="fas fa-trash fa-1x"></i></button>
                                       </span> 
                                    </div> 

                           )
                       })
                   }
                </div>   
               :
              (<div className="container" style={{alignItems:"center"}}>
                 <div className="card p-3 m-3 text-center">
                     <h2 className="card-title p-1" >No Posts Posted Yet</h2>
                 </div>
             </div>))   
        }

    </div>
</div>) : (<div className="container" style={{alignItems:"center"}}>
                     <div className="card p-3 m-5 text-center">
                         <h2 className="card-title p-1 text-danger" >Session Expired</h2>     
                     </div>
        </div>) )}
      </Fragment>
    )
}


export default Profile;