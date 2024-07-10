import React from "react"
import { useState, useRef } from "react";


function Signup(){
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [state, setState] = useState("idle");
  const emailInputRef = useRef();
  const passwordInputRef = useRef();


  const submitHandler= (event) =>{
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    console.log(enteredEmail, enteredPassword)

    if(isLoggedIn){
    }else{
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAWszJ6oojcJ0RqmpcOlLRUZ17T3z4z48U',
            {
                method:"POST",
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }

        ).then(res=>{
            console.log(res)
            if(res.ok){
                //....
            }
            else {
               return res.json().then((data)=>{
                    console.log(data);
                });
            }
        })
    }
  }



    return( 
        <div className="login-container">
            <h1>Create new account</h1>
            
            <form className="login-form" onSubmit={submitHandler}>
                <input 
                    id = "email"
                    type="email"
                    placeholder="Email address"
                    required
                    ref={emailInputRef}
                />

                <input
                    id="password"
                    type="password"
                    placeholder="Password"
                    required
                    ref={passwordInputRef}
                    
                />

                <button className="login-button" type="submit" disabled={state === "submitting"}>
                       Sign up 
                </button>
            </form>
            
        </div>
    )
}

export default Signup;