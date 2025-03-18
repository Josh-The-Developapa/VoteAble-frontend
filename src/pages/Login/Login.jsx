import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginSVG from '../../assets/LoginGraphic.svg';
import avatarPic from '../../assets/Logo.svg';

import './Login.css';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const navigate = useNavigate();

  async function user() {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    const data = await res.json();

    if (data.error === 'Invalid password') {
      setPassErr(data.error);
      return;
    }
    if (data.error === 'Invalid name, please try again') {
      setNameErr(data.error);
      return;
    }
    return data;
  }

  const login = async () => {
    if (!name) {
      console.log('Missing field: Name');
      setNameErr('Please enter a valid name');
      return;
    }
    if (!password) {
      console.log('Missing field: Password');
      setPassErr('Please enter a valid password');
      return;
    }

    try {
      const user_data = await user();
      console.log('User data:', user_data);

      if (user_data.error) {
        console.error('Error from user function:', user_data.error);
        return;
      }

      localStorage.setItem('name', name);
      localStorage.setItem('password', password);

      if (!nameErr && !passErr) {
        navigate('/account');
      } else {
        console.error('Errors:', { nameErr, passErr });
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <img src={avatarPic} className="avPic" alt="VoteAble" />
        <h2 className="heading">Login</h2>
        <div>
          <input
            name="username"
            style={{ fontSize: '17px' }}
            value={name}
            placeholder="Name" // Updated placeholder
            className="joinInput"
            type="text"
            onChange={(event) => {
              setName(event.target.value);
              setNameErr('');
            }}
            onBlur={() => {
              if (!name) setNameErr('Please enter a valid name');
            }}
          />
          {nameErr && (
            <p className="namep" style={{ fontFamily: 'Kumbh Sans' }}>
              {nameErr}
            </p>
          )}
        </div>
        <div>
          <input
            style={{ fontSize: '17px' }}
            name="password"
            placeholder="Password"
            value={password}
            className="joinInput mt-20"
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
              setPassErr('');
            }}
            onBlur={() => {
              if (!password) setPassErr('Please enter a valid password');
            }}
          />
          {passErr && (
            <p className="passp" style={{ fontFamily: 'Kumbh Sans' }}>
              {passErr}
            </p>
          )}
        </div>
        <button
          className={'button mt-20'}
          onClick={login}
          style={{
            paddingTop: '15px',
            paddingBottom: '15px',
            backgroundImage:
              'linear-gradient(90deg,#5c0096,#17005c, rgb(96, 0, 81))',
            fontFamily: 'Kumbh Sans',
          }}
        >
          <p style={{ fontSize: '20px', fontFamily: 'Kumbh Sans', margin: 0 }}>
            Login
          </p>
        </button>
      </div>
      <img src={LoginSVG} className="login-svg" />
    </div>
  );
}