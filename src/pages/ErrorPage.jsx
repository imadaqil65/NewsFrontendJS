import React from 'react';
import { useLocation } from 'react-router-dom';

function Error() {
  const location = useLocation();
  const error = location.state?.error || 'An unknown error occurred';

  return (
    <div style={{ height: '45rem' }} className="min-vw-100 d-flex flex-column align-items-center justify-content-center">
      <h1>Error</h1>
      <h3 className='text-secondary'>
        {error}
      </h3>
      <a href="/" className="btn btn-secondary text-decoration-none">Return to home</a>
    </div>
  );
}

export default Error;
