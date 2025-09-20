import React, { useState, useEffect } from 'react';
import './Account.css';
import { FiHome } from 'react-icons/fi';
import { RiGraduationCapLine } from 'react-icons/ri';
import { GoDotFill } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import Profile from '../../assets/Profile.svg';
import TeamPic from '../../assets/team-pic.png';
import BallotBox from '../../assets/BallotBox.png';
import AccountSVG from '../../assets/Account.svg';

function Account() {
  const [voted, setVoted] = useState('Status Pending...');
  const [HAR, setHAR] = useState(false);

  useEffect(() => {
    const hasVoted = (async function checkPolls() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/v1/myPolls`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Student_ID: localStorage.getItem('Student_ID'),
              password: localStorage.getItem('password'),
            }),
          }
        );

        if (!res.ok) {
          throw new Error('Failed to fetch');
        }

        const data = await res.json();

        if (data.message == 'You have admin access') {
          setHAR(true);
        }

        const pollsArray = data.data;

        const hasVoted = pollsArray.every((poll) =>
          poll.voted.some(
            (name) =>
              localStorage.getItem('name').toLowerCase() === name.toLowerCase()
          )
        );
        setVoted(hasVoted);
        return false;
      } catch (error) {
        console.error('Error checking polls:', error);
        return false; // Return false if there is an error
      }
    })();

    setVoted(hasVoted);
  }, []);

  function formatName(name) {
    if (!name) return '';
    let nameParts = name.split(' ');
    let firstName = nameParts[0].toLowerCase();
    firstName = firstName.split('');
    firstName[0] = firstName[0].toUpperCase();
    firstName = firstName.join('');
    let lastNamesInitials = nameParts
      .slice(1)
      .map((n) => n.charAt(0))
      .join('.');
    return `${firstName} ${lastNamesInitials}`;
  }

  return (
    <div className="account-page">
      <div className="cards-container">
        <div className="user-card card">
          <img className="profile-pic" src={Profile} alt="Profile" />
          <h2>{formatName(localStorage.getItem('name'))}</h2>
          <div className="user-info">
            <div className="info-item">
              <RiGraduationCapLine />
              <p>{localStorage.getItem('class')}</p>
            </div>
            <div className="info-item">
              <FiHome />
              <p>{localStorage.getItem('house')}</p>
            </div>
          </div>
          <div className="vote-status">
            {!HAR ? (
              <div className="vote-status">
                {' '}
                <GoDotFill
                  className={`status-dot ${
                    voted === true ? 'voted' : 'not-voted'
                  }`}
                />
                <p>{voted === true ? 'Voted' : 'Not Voted'}</p>{' '}
              </div>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="about-card card">
          <img className="team-pic" src={TeamPic} alt="Team" />
          <h2>
            About Vote<span className="highlight">Able.</span>
          </h2>
          <p>Learn more about VoteAble and the team behind it.</p>
          <NavLink
            to="/about"
            className="account-buttons"
            style={{
              backgroundColor: '#000000',
              textAlign: 'center',
              width: '140px',
              margin: 'auto',
              marginTop: '15px',
              fontWeight: 450,
            }}
          >
            About Us
          </NavLink>
        </div>

        <div className="vote-now card">
          <h2> {HAR ? 'Results' : 'Vote Now'}</h2>
          <p>
            {HAR
              ? 'Keep track of the elections results'
              : 'Cast your vote now!'}
          </p>
          <NavLink
            to="/polls"
            className="account-buttons"
            style={{
              backgroundColor: '#000000',
              textAlign: 'center',
              width: '143px',
              margin: 'auto',
              marginTop: '15px',
              fontWeight: 450,
              background:
                'linear-gradient(to right, #312783 0%, #1C164A 33%, #0B091D 67%, #4A2342 100%)',
            }}
          >
            {!HAR ? 'Vote Now' : 'Results'}
          </NavLink>

          <NavLink
            to="/create-poll"
            className="account-buttons"
            style={{
              backgroundColor: '#000000',
              textAlign: 'center',
              // width: '190px',
              margin: 'auto',
              marginTop: '15px',
              fontWeight: 450,
              background:
                'linear-gradient(to right, #312783 0%, #1C164A 33%, #0B091D 67%, #4A2342 100%)',
            }}
          >
            Create Polls
          </NavLink>
          <img className="vote-now-pic" src={BallotBox} alt="Ballot Box" />
        </div>
      </div>
      <img src={AccountSVG} alt="Background SVG" className="background-svg" />
    </div>
  );
}

export default Account;
