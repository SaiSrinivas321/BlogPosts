import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { useLoginUserMutation } from '../types/generated/generated';
import { Usercontext } from "../Usercontext";

const Login:React.FC =()=>{

    let {setId} =useContext(Usercontext);
    let history = useHistory();
    let [alogin,setalogin]=useState(false);
   
    const [loginUserMutation]=useLoginUserMutation();

    const handleLogin=(e:any)=>{
       
    e.preventDefault();
    let email = (document.getElementById("lemail") as HTMLInputElement).value;
    let password = (document.getElementById("lpassword") as HTMLInputElement).value;

    loginUserMutation({variables:{email,password}})
    .then(res=> {

        if(res.data?.login?.accessToken){
         setId(res.data?.login?.user.id);
         localStorage.setItem("uid",res.data?.login?.user.id)
         history.push("/Profile");  
        }
     }

    )
    .catch(error=>{
        setalogin(true);
        console.log(error.message);
      });
      
    }

    return(
      
        <div>
            <Navbar login={false} />
            <div className="container loginform mt-4 p-3">
            {
               alogin?(<div className="alert alert-danger login-alert text-center">
               Invalid Login
            </div>):null
            }
            <div className="card login-card">
                <div className="card-body">
                 <form>
                    <h3 className="text-center">Login</h3>
                    <br/>
                    <input type="text" className="form-control" required placeholder="Email" id="lemail"/>
                    <br/><br/>
                    <input type="password" className="form-control" required placeholder="password" id="lpassword"/>
                    <br/><br/>
                    <button className="btn btn-primary" onClick={handleLogin}>Login</button>
                    <br /><br />
                    <div>
                    New User?<Link className="text-primary" to="/Register">Register Here</Link>
                    </div>
                 </form>
                 </div>
                </div>
            </div>
        </div>
    )

}


export default Login;