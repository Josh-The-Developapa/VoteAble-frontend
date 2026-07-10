import React, { useEffect } from 'react';
import Header from '../../components/Header/Header.jsx';
import Logo from '../../assets/Logo.svg';
import { NavLink, useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handleVoteNowClick = () => {
    if (localStorage.getItem('Student_ID') && localStorage.getItem('name')) {
      navigate('/polls');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="home-wrapper">
      <div className="home-left">
        <div className="hero-group">
          {/* Animated logo */}
          <div
            className="logo-wrap animate-fadeup"
            style={{ '--delay': '0ms' }}
          >
            <img src={Logo} alt="Voteable Logo" className="home-logo" />
          </div>

          {/* Headline */}
          <div
            className="hero-text animate-fadeup"
            style={{ '--delay': '240ms' }}
          >
            <h1 className="hero-title">
              Voting
              <br />
              Made
            </h1>
            <span className="hero-highlight">Simple.</span>
          </div>

          {/* CTA */}
          <button
            className="vote-now-btn animate-fadeup"
            style={{ '--delay': '500ms' }}
            onClick={handleVoteNowClick}
          >
            Vote Now
            <span className="btn-arrow" aria-hidden="true">
              →
            </span>
          </button>
        </div>
      </div>

      <div className="home-right">
        {/* Floating badge
        <div
          className="floating-badge animate-fadein"
          style={{ '--delay': '800ms' }}
        >
          <span className="badge-dot" />
          Live Election Active
        </div> */}
      </div>
    </div>
  );
}

export default Home;
