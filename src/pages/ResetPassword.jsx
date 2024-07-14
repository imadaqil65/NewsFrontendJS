import React, { useState } from 'react';
import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye';
import UsersAPI from '../apis/UsersAPI';

function ResetPassword() {
    const [success, setSuccess] = useState(null);
    const [fail, setFail] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleReset = (e) => {
        e.preventDefault();
        if (email && password) {
          UsersAPI.resetPassword({ email, password })
            .then((success) => {
              if (success) {
                console.log('Successfully reset password');
                setSuccess('Password successfully reset');
                setFail(null);
                setPassword(''); // Reset the password field
              } else {
                setFail('Failed to reset password');
                setSuccess(null);
              }
            })
            .catch((err) => {
              setFail('Failed to reset password');
              setSuccess(null);
              console.error(err);
            });
        } else {
          setFail('Please enter both email and password');
          setSuccess(null);
        }
      };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };

  return (
    <div className="container-fluid ps-md-0 py-5 min-w-50">
    <div className="container align-items-center p-5" style={{ width: '30rem', height: '20rem' }}>
      <form onSubmit={handleReset} className='p-5 rounded' style={{ backgroundColor: '#eee' }}>
        <h3 className="fw-bold mb-4">Reset Password</h3>
        <div className="form-floating mb-3">
          <input
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
            type={showPassword ? "text" : "password"}
            className="form-control col-xs-2"
            id="floatingPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label htmlFor="floatingPassword">New Password</label>
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
          <button className="btn btn-lg btn-primary btn-login fw-bold mb-2" type="submit">Reset</button>
          {fail && <div className="alert alert-danger mt-3" style={{textAlign:"center"}}>{fail}</div>}
          {success && <div className="alert alert-success mt-3" style={{textAlign:"center"}}>{success}</div>}
          <div className="text-center">
          </div>
        </div>
      </form>
    </div>
  </div>
  )
}

export default ResetPassword