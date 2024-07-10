import React from 'react'
import { Link, useParams, Outlet, NavLink, useLoaderData } from 'react-router-dom'
import { getVan } from '../../../api'
import { useState, useEffect } from 'react'
import { requireAuth } from '../../../utils'
import "./HostVansDetail.css"

export async function loader({ params, request }){
    await requireAuth(request);
    return getVan(params.id);
}


function HostVansDetail() {

    const hostVanDetail = useLoaderData();

    // const params = useParams();
    // const [hostVanDetail, setHostVanDetail] = useState([]);

   

    // useEffect(()=> {
    //     fetch(`/api/host/vans/${params.id}`)
    //     .then((res)=> res.json())
    //     .then((data)=> setHostVanDetail(data.vans))
    //     .catch((err)=> console.log(err));

    // }, [])

    // if(!hostVanDetail){
    //     return <h1>...Loading</h1>
    // }

  return (
    <section>
        <Link to='..' relative='path' className='back-button'>&larr; <span>Back to all Vans</span></Link>

            <div className="host-van-detail-layout-container">
                <div className="host-van-detail">
                    <img src={hostVanDetail.imageUrl} />
                    <div className="host-van-detail-info-text">
                        <i
                            className={`van-type van-type-${hostVanDetail.type}`}
                        >
                            {hostVanDetail.type}
                        </i>
                        <h3>{hostVanDetail.name}</h3>
                        <h4>${hostVanDetail.price}/day</h4>
                    </div>
                </div>

                <nav className='host-van-detail-nav'>
                    <NavLink className={({isActive})=> isActive ? "active-styles" : null } to='.' end>Details</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active-styles" : null } to='pricing'>Pricing</NavLink>
                    <NavLink className={({isActive})=> isActive ? "active-styles" : null } to='photos'>Photos</NavLink>
                </nav>

                <Outlet context={{ hostVanDetail }}/>
            </div>
        </section>
  )
}

export default HostVansDetail