import React from 'react'

function page({ params }) {
  const { id } = params;
  
  return (
    <div className='text-white'>
      <h1>Project Details</h1>
      <p>Project ID: {id}</p>
    </div>
  )
}

export default page
