import React from 'react'
import { useOutletContext } from 'react-router-dom'
import "./HostVanNav.css"

function Photos() {
  const { hostVanDetail }= useOutletContext();

  return (
      <img src={hostVanDetail.imageUrl} className='host-van-detail-image'></img>
  )
}

export default Photos