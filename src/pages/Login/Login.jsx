import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import avatarPic from '../../assets/Logo.svg';
import './Login.css';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  async function user() {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/v1/user`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        Student_ID: name,
        password,
        house: selectedHouse,
      }),
    });
    return res.json();
  }

  const login = async () => {
    if (!name) {
      setNameErr('Please enter a valid ID');
      return;
    }
    if (!password) {
      setPassErr('Please enter a valid password');
      return;
    }
    if (!selectedHouse) return;

    try {
      const data = await user();
      if (data.error === 'Invalid password') {
        setPassErr(data.error);
        return;
      }
      if (data.error === 'Invalid student ID, please try again') {
        setNameErr(data.error);
        return;
      }
      if (data.error) return;

      localStorage.setItem('Student_ID', name);
      localStorage.setItem('name', data.user.name);
      localStorage.setItem('password', password);
      localStorage.setItem('class', data.user.class);
      localStorage.setItem('house', selectedHouse);

      navigate('/account');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <img src={avatarPic} className="avPic" alt="Voteable" />
        <h2 className="heading">Welcome Back</h2>

        {/* Student ID field */}
        <div className="input-wrapper">
          <svg
            className="input-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="3" y="7" width="18" height="13" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
          <input
            name="username"
            value={name}
            placeholder="Student ID"
            className="joinInput"
            type="text"
            onChange={(e) => {
              setName(e.target.value);
              setNameErr('');
            }}
            onBlur={() => {
              if (!name) setNameErr('Please enter a valid ID');
            }}
          />
        </div>
        {nameErr && <p className="namep">{nameErr}</p>}

        {/* Password field */}
        <div className="input-wrapper" style={{ marginTop: '12px' }}>
          <svg
            className="input-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V7a4 4 0 0 1 8 0v4" />
          </svg>
          <input
            name="password"
            placeholder="Password"
            value={password}
            className="joinInput"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setPassErr('');
            }}
            onBlur={() => {
              if (!password) setPassErr('Please enter a valid password');
            }}
          />
        </div>
        {passErr && <p className="passp">{passErr}</p>}

        <div style={{ marginTop: '12px' }}>
          <select
            value={selectedHouse}
            onChange={(e) => setSelectedHouse(e.target.value)}
            className="joinInput"
          >
            <option value="">Select a house</option>
            <option value="HAWKS">HAWKS</option>
            <option value="FALCONS">FALCONS</option>
            <option value="EAGLES">EAGLES</option>
            <option value="KITES">KITES</option>
          </select>
        </div>

        <button className="button mt-20" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
}
