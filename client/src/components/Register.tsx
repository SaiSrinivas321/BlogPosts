import React from "react";
import { useHistory } from "react-router";
import { useRegisterUserMutation } from '../types/generated/generated';
import Navbar from "./Navbar";

const Register : React.FC = ()=>
{
    const history = useHistory();
    const [registerUserMutation]=useRegisterUserMutation();

    const clearInputs=()=>{
        const fields = ["username","email","password"];
    fields.forEach(
        (field)=>{
        (document.getElementById(field) as HTMLInputElement).value = '';
        }
    );
    }
    const handleSubmit =()=>{

    let username =  (document.getElementById("username") as HTMLInputElement).value;
    let email = (document.getElementById("email") as HTMLInputElement).value;
    let password = (document.getElementById("password") as HTMLInputElement).value;
    registerUserMutation({variables:{username,email,password}}).catch(error=>{
      console.log(error.message);
    });
    clearInputs();
    alert("Registration Successful");
    history.push("/");
    
    
  }
    return(
            <div>
                <Navbar login={false}/>
                <div className="container loginform mt-4 p-3">
                <div className="card login-card">
                 <div className="card-body">
                 <form onSubmit={handleSubmit}>
                    <h3 className="text-center">Registration Form </h3>
                    <br/>
                    <input type="text" className="form-control" required placeholder="username" id="username"/>
                    <br/><br/>
                    <input type="text" className="form-control" required placeholder="Email" id="email"/>
                    <br/><br/>
                    <input type="password" className="form-control" required placeholder="password" id="password"/>
                    <br/><br/>
                    <button className="btn btn-primary">Register</button>

                </form>
                 </div> 
                </div>
                </div>
            </div>
        
    )

}

export default Register;