import React, { useState } from 'react';
import styles from './pageStyle/Signup.module.css';
import Form from '../components/SignUpForm/Form';
import UsersAPI from '../apis/UsersAPI';

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      UsersAPI.postUsers(formData)
      .then(response => console.log('User ID:', response));
      setSuccess('User created successfully!');
    } catch (err) {
      setError('Failed to make an account');
      console.error(err);
    }
  };

  return (
    <div className="container-fluid ps-md-0">
      <div className="row g-0">
        <img src='./assets/signup-bg.jpg' className={`${styles.bgImage} d-none d-md-flex col-md-4 col-lg-6`} alt="Sign Up Background"/>
        <div className="col-md-8 col-lg-6">
          <div className={`${styles.login} d-flex align-items-center py-5`}>
            <div className="container">
              <div className="row">
                <div className="col-md-9 col-lg-8 mx-auto p-5 rounded" style={{ backgroundColor: '#eee' }}>
                  <Form 
                    styles={styles} 
                    formData={formData}
                    error={error}
                    success={success}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    title="Sign Up for an Account"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;


