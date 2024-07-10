import React from "react"
import { Link, NavLink } from "react-router-dom";
import  imageUrl from "/src/assets/avatar-icon.png"
import "./Header.css"

function Header(){

    const removeStorage = () =>{
        localStorage.removeItem("loggedIn");
    }


    return(
    <>
        <header>
            <Link className ='site-logo' to='/'>#vanlife</Link>
        <nav>
            <NavLink className={({isActive})=> isActive ? "active-link" : ""} to='/host'>Host</NavLink>
            <NavLink className={({isActive})=> isActive ? "active-link" : ""} to='/about'>About</NavLink>
            <NavLink className={({isActive})=> isActive ? "active-link" : ""} to='/vans'>Vans</NavLink>
            <Link to='/login' className="login-link"><img src={imageUrl} className="login-icon"/></Link>
            <button onClick={removeStorage}><img src="/src/assets/logout.png" className="logout-icon"></img></button> 
        </nav>
       
      </header>
    </>
    );
}

export default Header;