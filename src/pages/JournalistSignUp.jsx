import React, { useState, useEffect } from 'react';
import styles from './pageStyle/Signup.module.css';
import Form from '../components/SignUpForm/Form';
import UsersAPI from '../apis/UsersAPI';

const JournalistSignUp = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setError(null);
    setSuccess(null);
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
      UsersAPI.postJournalist(formData)
      .then(response => console.log('User ID:', response));
      setSuccess('User created successfully!');
    } catch (err) {
      setError('Error creating user');
      console.error(err);
    }
  };

  return (
    <div className='mt-5 pt-5'>
      <div className="col-md-9 col-lg-8 mx-auto p-5 rounded" style={{ backgroundColor: '#eee' }}>
        <Form 
          styles={styles} 
          formData={formData}
          error={error}
          success={success}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          title="Journalist Sign Up"
        />
      </div>
    </div>
  );
};

export default JournalistSignUp;
