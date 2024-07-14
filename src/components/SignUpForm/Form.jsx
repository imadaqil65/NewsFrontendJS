import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'react-icons-kit'
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

const Form = ({  
  formData, 
  error, 
  success, 
  handleChange, 
  handleSubmit, 
  title 
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form onSubmit={handleSubmit} style={{ backgroundColor: '#eee' }}>
      <h3 className="fw-bold mb-4">{title}</h3>
      <div className="form-floating mb-3">
        <input
          type="email"
          className="form-control"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="email">Email address</label>
      </div>
      <div className="form-floating mb-3">
        <input
          type="text"
          className="form-control"
          id="name"
          value={formData.name}
          onChange={handleChange}
        />
        <label htmlFor="name">Preferred Name</label>
      </div>
      <div className="form-floating mb-3" style={{ position: 'relative' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          className="form-control"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <button
          type="button"
          onClick={togglePasswordVisibility}
          style={{
            position: 'absolute',
            right: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            border: 'none',
            background: 'none'
          }}
        >
          <Icon icon={showPassword ? eye : eyeOff} />
        </button>
      </div>

      <div className="d-grid">
        <button className="btn btn-lg btn-primary btn-login fw-bold mb-2" type="submit">Sign Up</button>
        <div className="text-center">
          <NavLink className="text-decoration-none" to="/Login">Already Have an Account? Login!</NavLink>
        </div>
      </div>

      {error && <div className="alert alert-danger mt-3" style={{textAlign:"center"}}>{error}</div>}
      {success && <div className="alert alert-success mt-3" style={{textAlign:"center"}}>{success}</div>}
    </form>
  );
};

export default Form;




