import React from 'react'
import { useOutletContext } from 'react-router-dom'
import "./HostVanNav.css"


function Pricing() {
  const { hostVanDetail } = useOutletContext();
  return (
    <h3 className='host-van-price'>${hostVanDetail.price}<span>/day</span></h3>
  )
}

export default Pricing