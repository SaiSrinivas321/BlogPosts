import {Link, useHistory} from "react-router-dom";
import { useLogoutUserMutation } from "../types/generated/generated";

const Navbar= ({login}:any)=>
{
    const [LogoutUserMutation]=useLogoutUserMutation();
    const history = useHistory();
    const handlelogout=async ()=>{

        await LogoutUserMutation().catch(err => console.log(err));
        localStorage.removeItem("uid");
        history.replace("/");
    }

    return(

        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
            <Link  className="navbar-brand" to="/"><h1 className="p-2">Blog Posts</h1></Link>
            <button className="navbar-toggler" type="button" 
            data-bs-toggle="collapse" data-bs-target="#navbarToggler" aria-controls="navbarToggler" aria-expanded="false" aria-label="Toggle navigation">
            <span className=" navbar-toggler-icon p-1" style={{color:"blue"}}><i className="fas fa-bars"></i></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarToggler">
                <ul className="navbar-nav me-auto">
                <li className="nav-item"
                ><h4 className="p-2 mt-2"><Link to="/" className="nav-link">Home</Link></h4>
                </li>  
               { 
                 !login?(
                  <li className="nav-item"><h4 className="p-2 mt-2"><Link to={!localStorage.getItem("uid")?"/Login":"/Profile"} className="nav-link">Login/Register</Link></h4></li>
                ):<li className="nav-item logout"><h4 onClick={handlelogout} className="p-2 mt-3 nav-link">Logout</h4></li>
                }
                </ul>  
            </div>


            </div>
        </nav>    
        
    )

}

export default Navbar;