/**
 * src/Components/Account/Account.jsx
 * ---------------------------------------------------------------------------
 * Two changes from the original:
 *
 * 1. `/v1/myPolls` is now fetched via `apiFetch` (session cookie + tenant
 *    header), with no body — the backend identifies the caller from the
 *    session, exactly as in MyPolls.jsx.
 *
 * 2. The "have I voted on everything" check is fixed. The original did:
 *      poll.voted.some(name => myName.toLowerCase() === name.toLowerCase())
 *    which compared the logged-in student's NAME against a list of
 *    lowercased name strings. That breaks the moment two students share
 *    a name (a real risk once schools of a few hundred students are
 *    involved), and it's now structurally impossible anyway since
 *    `poll.voted` no longer contains name strings at all — it contains
 *    other students' ObjectIds, and the backend deliberately no longer
 *    sends that array to student clients (see controllers/controller.js
 *    `myPolls`). Instead, each poll in the response now carries a
 *    server-computed `votedByMe` boolean, which is what we check here.
 */

import React, { useState, useEffect, useRef } from 'react';
import './Account.css';
import { FiHome } from 'react-icons/fi';
import { RiGraduationCapLine } from 'react-icons/ri';
import { GoDotFill } from 'react-icons/go';
import { NavLink } from 'react-router-dom';
import Profile from '../../assets/Profile.svg';
import TeamPic from '../../assets/team-pic.png';
import BallotBox from '../../assets/BallotBox.png';
import { apiFetch } from '../../utils/api';

// Stagger delays (ms) for each card slot
const CARD_DELAYS = [0, 120, 240];

function Account() {
  const [voted, setVoted] = useState('Status Pending...');
  const [HAR, setHAR] = useState(false);
  const cardRefs = useRef([]);

  // ── Fetch poll / admin status ──────────────────────────────
  useEffect(() => {
    async function checkPolls() {
      try {
        const res = await apiFetch('/v1/myPolls', { method: 'POST' });
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();

        if (data.message === 'You have admin access') setHAR(true);

        const pollsArray = data.data || [];
        const hasVoted = pollsArray.length > 0 && pollsArray.every((poll) => poll.votedByMe);
        setVoted(hasVoted);
      } catch (error) {
        console.error('Error checking polls:', error);
        setVoted(false);
      }
    }

    checkPolls();
  }, []);

  // ── Entrance animations ────────────────────────────────────
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;

    const isMobile = window.innerWidth <= 1007;

    if (!isMobile) {
      // Desktop: stamp all cards visible immediately with stagger delays
      cards.forEach((card, i) => {
        card.style.setProperty('--card-delay', `${CARD_DELAYS[i]}ms`);
        // Small rAF so browser has painted the invisible state first
        requestAnimationFrame(() => {
          requestAnimationFrame(() => card.classList.add('card-visible'));
        });
      });
    } else {
      // Mobile/tablet: reveal each card as it enters the viewport
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.style.setProperty('--card-delay', '0ms');
              entry.target.classList.add('card-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 },
      );
      cards.forEach((card) => observer.observe(card));
      return () => observer.disconnect();
    }
  }, []);

  function formatName(name) {
    if (!name) return '';
    const nameParts = name.split(' ');
    let firstName = nameParts[0].toLowerCase().split('');
    firstName[0] = firstName[0].toUpperCase();
    firstName = firstName.join('');
    const lastNamesInitials = nameParts
      .slice(1)
      .map((n) => n.charAt(0))
      .join('.');
    return `${firstName} ${lastNamesInitials}`;
  }

  // Helper to assign card refs by index
  const setRef = (i) => (el) => {
    cardRefs.current[i] = el;
  };

  return (
    <div className="account-page">
      <div className="cards-container">
        {/* ── User Card ── */}
        <div className="user-card card" ref={setRef(0)}>
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
          {!HAR && (
            <div className="vote-status">
              <GoDotFill
                className={`status-dot ${voted === true ? 'voted' : 'not-voted'}`}
              />
              <p>{voted === true ? 'Voted' : 'Not Voted'}</p>
            </div>
          )}
        </div>

        {/* ── About Card ── */}
        <div
          className="about-card card"
          ref={setRef(1)}
          style={{ paddingBottom: '20px' }}
        >
          <img className="team-pic" src={TeamPic} alt="Team" />
          <h2>
            About Vote<span className="highlight">Able.</span>
          </h2>
          <p>Learn more about VoteAble and the team behind it.</p>
          <NavLink
            to="/about"
            className="account-buttons"
            style={{
              textAlign: 'center',
              width: '140px',
              margin: 'auto',
              marginTop: '15px',
            }}
          >
            About Us
          </NavLink>
          <NavLink
            to="/team"
            className="account-buttons"
            style={{
              textAlign: 'center',
              width: '180px',
              margin: 'auto',
              marginTop: '15px',
            }}
          >
            Legacy Team
          </NavLink>
        </div>

        {/* ── Vote / Results Card ── */}
        <div className="vote-now card" ref={setRef(2)}>
          <h2>{HAR ? 'Results' : 'Vote Now'}</h2>
          <p>
            {HAR
              ? 'Keep track of the elections results'
              : 'Cast your vote now!'}
          </p>
          <NavLink
            to="/polls"
            className="account-buttons"
            style={{
              textAlign: 'center',
              width: '143px',
              margin: 'auto',
              marginTop: '15px',
            }}
          >
            {HAR ? 'Results' : 'Vote Now'}
          </NavLink>
          {HAR && (
            <NavLink
              to="/create-poll"
              className="account-buttons"
              style={{ textAlign: 'center', margin: 'auto', marginTop: '15px' }}
            >
              Create Polls
            </NavLink>
          )}
          <img className="vote-now-pic" src={BallotBox} alt="Ballot Box" />
        </div>
      </div>
    </div>
  );
}

export default Account;
