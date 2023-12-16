import { useState } from "react";

const Auth = () => {
    const [auth, setAuth] = useState(true)

    const changeState = () => {
        setAuth(!auth)
    }

    return ( 
        <div className="authentication">

            <div className="form">
                {auth === true ? <h1>Login</h1>: <h1>Register</h1> }
                <div className="auth-select">
                    <div className={auth ? "selected" : ""} onClick={changeState}>Login</div>
                    <div className={auth === false ? "selected" : ""} onClick={changeState}>Register</div>
                </div>
                <form action="">
                    
                    {auth ? 
                    <> 
                    <input type="email" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    </>
                    :
                    <>
                    <input type="email" placeholder="Email"/>
                    <div className="name">
                        <input type="text" placeholder="Name"/>
                        <input type="text" placeholder="Surname"/>
                    </div>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm Password"/>

                    </>
                    }
                        
                </form>
                {auth ? <button className="form-btn">Login</button>
                : <button className="form-btn">Register</button>
                 }
                
            </div>

        </div>
     );
}
 
export default Auth;