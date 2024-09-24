import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import avatarPic from '../../assets/Logo.svg';
import LoginSVG from '../../assets/LoginGraphic.svg';

import './Login.css';

export default function Login() {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameErr, setNameErr] = useState('');
  const [passErr, setPassErr] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');

  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleHouseChange = (event) => {
    setSelectedHouse(event.target.value);
  };

  async function user() {
    const res = await fetch(`https://backend.voteable.live/v1/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Student_ID: name,
        password: password,
        house: selectedHouse,
      }),
    });
    const data = await res.json();

    if (data.error === 'Invalid password') {
      setPassErr(data.error);
      return;
    }

    if (data.error === 'Invalid student ID, please try again') {
      setNameErr(data.error);
      return;
    }
    return data;
  }

  const login = async () => {
    if (!name || !password || !selectedGender || !selectedHouse) {
      return;
    }

    const data2 = await user();
    console.log(data2);
    if (data2.error) {
      return;
    }

    localStorage.setItem('Student_ID', name);
    localStorage.setItem('name', `${data2.user.name}`);
    localStorage.setItem('password', password);
    localStorage.setItem('gender', selectedGender);
    localStorage.setItem('class', data2.user.class);
    localStorage.setItem('house', selectedHouse);

    if (!nameErr || !passErr) {
      navigate('/account');
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
            placeholder="Student ID"
            className="joinInput"
            type="text"
            onChange={(event) => {
              setName(event.target.value);
              setNameErr('');
            }}
            onBlur={() => {
              if (!name) setNameErr('Please enter a valid ID');
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
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '15px',
          }}
        >
          <form
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: '0px',
            }}
          >
            <label style={{ marginRight: '20px', fontFamily: 'Kumbh Sans' }}>
              <input
                type="radio"
                value="male"
                checked={selectedGender === 'male'}
                onChange={handleGenderChange}
                style={{ accentColor: '#4600b6' }}
              />
              Male
            </label>
            <label style={{ fontFamily: 'Kumbh Sans' }}>
              <input
                type="radio"
                value="female"
                checked={selectedGender === 'female'}
                onChange={handleGenderChange}
                style={{ accentColor: '#4600b6' }}
              />
              Female
            </label>
          </form>
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '15px',
          }}
        >
          <select
            value={selectedHouse}
            onChange={handleHouseChange}
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              width: '100%',
              // marginBottom: '5px',
            }}
            className="joinInput"
          >
            <option value="">Select a house</option>
            <option value="HAWKS">HAWKS</option>
            <option value="FALCONS">FALCONS</option>
            <option value="EAGLES">EAGLES</option>
            <option value="KITES">KITES</option>
          </select>
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
