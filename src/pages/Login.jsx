import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import AuthAPI from '../apis/AuthAPI';
import TokenManager from '../apis/TokenManager';
import LoginForm from '../components/LoginForm/Form';

function Login() {
  const [claims, setClaims] = useState(TokenManager.getClaims());
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (email, password) => {
    setError(null);
    AuthAPI.login(email, password)
      .then(claims => {
        setClaims(claims);
        const from = location.state?.from?.pathname || '/';
        navigate(from); // Redirect to previous page or home if none
        window.location.reload(); // Refresh the page to update the header
      })
      .catch(error => setError(`Login failed!`))
      .catch(error => console.error(error));
  };

  return (
    <section>
      <LoginForm onLogin={handleLogin} error={error} />
    </section>
  );
}

export default Login;
