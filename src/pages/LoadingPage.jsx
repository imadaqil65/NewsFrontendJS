import React from 'react'
import 'ldrs/trio'

function LoadingPage() {
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{minHeight:"45rem"}}>
      <l-trio size="60" color="#c4c8cf"></l-trio>
      <h5 className='text-secondary mt-3'>Loading . . .</h5>
    </div>
  )
}

export default LoadingPage