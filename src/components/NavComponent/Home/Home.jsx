import React from 'react'
import { Link } from 'react-router-dom'
import './Home.css';

function Home() {
  return (
    <div className='home-container'>
      <h1>You got the travel plans, we got the travel vans.</h1>
      <p>Add adventure to your life by joining the #vanlife moment. Rent the perfect van to make your perfect road trip.</p>
      <Link className ="home-container-link" to='vans'>Find your van</Link>
    </div>

  )
}

export default Home