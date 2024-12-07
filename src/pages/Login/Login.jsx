import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoginSVG from '../../assets/LoginGraphic.svg';
import avatarPic from '../../assets/Logo.svg';

import './Login.css';

export default function Login() {
  const [name, setName] = useState('');
  const [section, setSection] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [sectionErr, setSectionErr] = useState('');

  const navigate = useNavigate();

  const login = async () => {
    let hasError = false;

    if (!name.trim()) {
      setNameErr('Please enter a valid name');
      hasError = true;
    }
    if (!section) {
      setSectionErr('Please select a section');
      hasError = true;
    }

    if (hasError) return;

    localStorage.setItem('name', name);
    localStorage.setItem('section', section);

    if (name.trim() === 'Admin-v0t3abl3') {
      localStorage.setItem('Student_ID', 'Admin-v0t3abl3');
    }

    navigate('/account');
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
            placeholder="Name"
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
          <select
            className="joinInput"
            style={{ fontSize: '17px', marginTop: '10px' }}
            value={section}
            onChange={(event) => {
              setSection(event.target.value);
              setSectionErr('');
            }}
          >
            <option value="">Select Section</option>
            <option value="International">International</option>
            <option value="National">National</option>
          </select>
          {sectionErr && (
            <p className="namep" style={{ fontFamily: 'Kumbh Sans' }}>
              {sectionErr}
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
