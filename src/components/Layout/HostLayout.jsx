import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Layout.css'


function HostLayout() {
  return (
    <>
    <nav className='host-nav'>
    <NavLink className={({isActive})=> isActive ? "active-styles" : ""} to='/host' end>Dashboard</NavLink>
    <NavLink className={({isActive})=> isActive ? "active-styles" : ""} to='/host/reviews'>Reviews</NavLink>
    <NavLink className={({isActive})=> isActive ? "active-styles" : ""} to='/host/vans'>Vans</NavLink>
    <NavLink className={({isActive})=> isActive ? "active-styles" : ""} to='/host/income'>Income</NavLink>
    </nav>
    <Outlet/>
    </>
  )
}

export default HostLayout