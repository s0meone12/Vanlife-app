import React from "react";
import { Link, useParams, useLocation, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVan } from "../../api";
import "./VanDetail.css"
import { requireAuth } from "../../utils";

export async function loader({ params, request }){
    await requireAuth(request)
    return getVan(params.id);
}

function VanDetail(){
    const location = useLocation();
    // const params = useParams()
    // const [van, setVan] = useState([]);

    // useEffect(()=>{
    //     fetch(`/api/vans/${params.id}`)
    //     .then((res)=> res.json())
    //     .then((data)=> setVan(data.vans))
    //     .catch((err)=> console.log(err));
    // }, [params.id])


    const van = useLoaderData();

    const search = location.state?.search || ""
    const type = location.state?.type || "all"

    return (
        <div className="van-detail-container">
        <Link to={`..${search}`} relative='path' className='back-button'>&larr; <span>Back to {type} vans</span></Link>
        { van ? (
            <div className="van-detail">
                <img src={van.imageUrl}></img>
                <i className={`van-type ${van.type}`}>{van.type}</i>
                <h2>{van.name}</h2>
                <p className="van-price"><span>${van.price}</span>/day</p>
                <p>{van.description}</p>
                <button className="link-button">Rent this van</button>
            </div>
            ) : <h2>Loading...</h2>
            }
        </div>
    );
};

export default VanDetail;