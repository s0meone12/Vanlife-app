import React, { useState, useEffect } from "react"
import { Link, useLoaderData } from "react-router-dom";
import { getHostVans } from '../../api';
import "./HostVans.css"
import { requireAuth } from "../../utils";

export async function loader({ request }){
    await requireAuth(request);
    return getHostVans()
}

export default function HostVans(){
    const hostVans = useLoaderData()

    // const [hostVans, setHostVans] = useState([])

    // useEffect(()=>{
    //     fetch('/api/host/vans')
    //     .then((res)=> res.json())
    //     .then((data)=> setHostVans(data.vans))
    //     .catch((err)=> console.log(err));

    // }, [])

    const vanData = hostVans.map((van)=>(
        <Link 
            to={`/host/vans/${van.id}`}
            key={van.id}
            className="host-van-link-wrapper"
        >
            <div className="host-van-single" key={van.id}>
                <img src={van.imageUrl} alt={`Photo of ${van.name}`}/>
                <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>{van.price}<span>/day</span></p>
                </div>
            </div>
        </Link>
    ))

    return(
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {
                    hostVans.length > 0 ? (
                        <section>
                            {vanData}
                        </section>
                    ): (
                        <div className="loader"></div>
                    )
                }
            </div>
        </section>
    )
};

