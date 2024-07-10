import React from 'react'
import { requireAuth } from '../../utils';
import { BsStarFill } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import "./Dashboard.css"
import { getHostVans } from '../../api';

export async function loader({ request }){
  await requireAuth(request);
  return getHostVans()
}

export default function Dashboard() {
  const [hostVans, setHostVans] = useState([]);

  useEffect(()=>{
    fetch('/api/host/vans')
    .then(res=> res.json())
    .then((data)=> setHostVans(data.vans))
  }, [])


function renderVanEl(){
  const vanData = hostVans.map((van)=>(
    <div className="host-van-single" key={van.id}>
        <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
          <div className="host-van-info">
              <h3>{van.name}</h3>
              <p>${van.price}/day</p>
          </div>
      <div className='host-van-edit'>
      <Link to={`vans/${van.id}`}>Edit</Link>
      </div>
    </div>
  ))
  return (
    <div className="host-vans-list">
        <section>{vanData}</section>
    </div>
)
}
  return (
         <>  
            <section className="host-dashboard-earnings">
                <div className="info">
                    <h1>Welcome!</h1>
                    <p>Income last <span>30 days</span></p>
                    <h2>$2,260</h2>
                </div>
                <Link to="income">Details</Link>
            </section>
            <section className="host-dashboard-reviews">
                <h2>Review score</h2>
                <BsStarFill className="star" />
                <p>
                    <span>5.0</span>/5
                </p>
                <Link to="reviews">Details</Link>
            </section>
            <section className="host-dashboard-vans">
                <div className="top">
                    <h2>Your listed vans</h2>
                    <Link to="/vans">View all</Link>
                </div>
                    {renderVanEl()}
            </section>
          </>
  )
}

