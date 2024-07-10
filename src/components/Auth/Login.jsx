import React from "react"
import { useState } from "react";
import { useLoaderData, useNavigate, Form, useActionData, useNavigation, Link } from "react-router-dom";
import { redirect } from "@remix-run/react";
import { loginUser } from "../../api";
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
import "./Login.css"


export function loader({request}){
    return new URL(request.url).searchParams.get("message");
}

export async function action({ request }){
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");
    const pathname = new URL(request.url).searchParams.get("redirectTo") || "/host";
    const errors = {};

 
    if (typeof email !== "string" || !email.includes("@")) {
        errors.email = "That doesn't look like an email address";
    }

    if (typeof password !== "string" || password.length < 6) {
        errors.password = "Password must be > 6 characters";
    }

    if (Object.keys(errors).length) {
        return errors;
    }

    try{
        const user = await loginUser({ email, password });
        localStorage.setItem("loggedIn", true)
        let res = redirect(pathname)
        res.body = true;
        return res;

    }catch(err){
        return err.message;
    }
}


function Login(){
    const [loginFormData, setLoginFormData] = useState({email: "", password: ""});
    // const [status, setStatus] = useState("idle");
    const [error, setError] = useState(null);
    const [token, setToken] = useState(""); 
    const message = useLoaderData();
    const errMessage = useActionData();
    // const navigate = useNavigate();

    const navigation = useNavigation();

    function handleSubmit(e){
        e.preventDefault();
        setStatus("submitting")
        setError(null);
        loginUser(loginFormData)
        .then((data)=> {
            setToken(data.token)
        })
        .catch((err)=> {
            setError(err.message);
            
        })
        .finally(()=> setStatus("idle"))

        setLoginFormData({email:"", password:""})
    }

    // function handleChange(e){
    //     const {name, value} = e.target;

    //     setLoginFormData((prevData)=>({
    //         ...prevData,
    //         [name]: value,
    //     }))
    // }

    return( 
        <div className="login-container">
            <h1>Sign in to your account</h1>
            {message && <h3>{message}</h3>}
            {errMessage ? <h3>{errMessage}</h3> : null }
            <Form method="post" className="login-form" replace>
                <input 
                    name="email"
                    //onChange={handleChange}
                    type="email"
                    placeholder="Email address"
                    //value={loginFormData.email}
                />

                <input
                    name="password"
                    //onChange={handleChange}
                    type="password"
                    placeholder="Password"
                    //value={loginFormData.password}
                />

                <button className="login-button" type="submit" disabled={navigation.state === "submitting"}>
                    {navigation.state === "submitting" ? "Logging in..." : "Log in"}    
                </button>
            </Form>
            <span>Dont have an account?<Link to="/signup"> Sign up</Link></span>
        </div>
    )
}

export default Login;