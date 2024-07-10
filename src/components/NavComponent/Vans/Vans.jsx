import React, { Suspense } from 'react'
import { useState, useEffect } from 'react'
import { Link, useSearchParams, useLoaderData, defer, Await } from 'react-router-dom'
import { getVans } from '../../../api'
import './Vans.css'

export async function loader() {
  return defer({vans: getVans() })
}

export default function Vans() {
  // const [vanData, setVanData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams();
  const vanPromise = useLoaderData();

  const typeFilter = searchParams.get("type")

  // useEffect(()=>{
  //    async function loadVans(){
  //     setIsLoading(true)
  //     try {
  //       const data = await getVans();
  //       setVanData(data);
  //     } catch(err) {
  //       console.log(err)
  //       setError(err);
    
  //     } finally{
  //       setIsLoading(false);
  //     }
     
  //   }

  //   loadVans();
  // }, [])


  const handleFilterChange = (key, value)=>{
      setSearchParams( prevParams =>{
        if(value === null){
            prevParams.delete(key);
        }
        else {
          prevParams.set(key, value);
        }

        return prevParams;
      })
  }


  function renderVanElements (vanData){
      const currVanData = typeFilter ? vanData.filter((van)=> van.type.toLowerCase() === typeFilter) : vanData;

      const vanElements = currVanData && currVanData.length > 0 ? currVanData.map((prevVan)=>(
        <div key={prevVan.id} className='van-title'>
          <Link to={`${prevVan.id}`} state={{ search: `?${searchParams.toString()}`, type: typeFilter}}>
          <img src={prevVan.imageUrl}></img>  
          <div className='van-info'>
              <h3>{prevVan.name}</h3>
              <p>${prevVan.price}<span>/day</span></p>
              <i className={`van-type ${prevVan.type} selected`}>{prevVan.type}</i>
          </div>
          </Link>
        </div>
      )) : <p>Loading vans...</p>
    
      return(
        <>
          <div className='van-list-filter-buttons'>
              <button className={`van-type simple ${typeFilter ==="simple" ? "selected " : null}`} onClick={()=> handleFilterChange("type", "simple")}>simple</button>
              <button className={`van-type rugged ${typeFilter ==="rugged" ? "selected " : null}`} onClick={()=> handleFilterChange("type", "rugged")}>rugged</button>
              <button className={`van-type luxury ${typeFilter ==="luxury" ? "selected " : null}`} onClick={()=> handleFilterChange("type", "luxury")}>luxury</button>
              { typeFilter ? (<button className='van-type clear-filters' onClick={()=> handleFilterChange("type", null)}>clear filter</button>) : null}
          </div>
              <div className='van-list'>
                  {vanElements}
              </div>
        </>
      );
  };


  return (
  <div className='van-list-container'>
    <h1>Explore our van options</h1>
    <Suspense fallback={<h1>Loading vans...</h1>}>
    <Await resolve={ vanPromise.vans }>
        { renderVanElements }
    </Await> 
    </Suspense>
    </div>
  )
}
