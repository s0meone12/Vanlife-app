import React from 'react'
import { useRouteError } from 'react-router-dom';

function Error() {
   const error = useRouteError();
   let errorMessage = 'An unknown error occured';

   try{
    const errData = JSON.parse(error.data);
    errorMessage = errData.message;
    
   } catch(err){
      
   }

  return (
   <>
    <h1>Something went wrong</h1>
    <p>{errorMessage}</p>
   </>
  )
}

export default Error;