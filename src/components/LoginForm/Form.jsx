import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';

function Form({ onLogin, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(email, password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container-fluid ps-md-0 py-5 min-w-50">
      <div className="container align-items-center p-5" style={{ width: '30rem', height: '20rem' }}>
        <form onSubmit={handleSubmit} className='p-5 rounded' style={{ backgroundColor: '#eee' }}>
          <h3 className="fw-bold mb-4">Welcome back!</h3>
          <div className="form-floating mb-3">
            <input
              data-testid="action-email"
              type="email"
              className="form-control col-xs-2"
              id="floatingInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="floatingInput">Email Address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              data-testid="action-password"
              type={showPassword ? "text" : "password"}
              className="form-control col-xs-2"
              id="floatingPassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="floatingPassword">Password</label>
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
            <NavLink className="text-decoration-none" to="/reset">Forgot Password?</NavLink>
          </div>
          <div className="d-grid">
            <button data-testid="action-login" className="btn btn-lg btn-primary btn-login fw-bold mb-2" type="submit">Log in</button>
            {error && <div className="alert alert-danger mt-3" style={{textAlign:"center", transition:0.5}}>{error}</div>}
            <div className="text-center">
              <NavLink className="small text-decoration-none" to="/Signup">Don't Have an Account? Sign Up!</NavLink>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
