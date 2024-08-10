import React, { useEffect } from 'react';
import Header from '../../components/Header/Header.jsx';
import HomepageSVG from '../../assets/Blocks.svg';
import Logo from '../../assets/Logo.svg';
import CookieConsent from 'react-cookie-consent';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handleVoteNowClick = () => {
    if (
      localStorage.getItem('Student_ID') &&
      localStorage.getItem('name') &&
      localStorage.getItem('password') &&
      localStorage.getItem('gender')
    ) {
      navigate('/polls');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="flex-bg">
      <div className="content">
        <img src={Logo} alt="header" className="logo" />
        <h1 className="title">
          Voting <br />
          Made <br />
          <p className="highlight">Simple.</p>
        </h1>
        <button className="vote-now-btn" onClick={handleVoteNowClick}>
          Vote Now
        </button>
      </div>
      <img
        src={HomepageSVG}
        className="homepage-svg"
        alt="Homepage background"
      />
      {/* <CookieConsent
        location="bottom"
        buttonText="I Accept"
        cookieName="Cookie-consent"
        style={{ background: '#2B373B' }}
        buttonStyle={{
          color: '#4e503b',
          fontSize: '13px',
          borderRadius: '10px',
        }}
        declineButtonStyle={{ borderRadius: '10px' }}
        enableDeclineButton
        expires={10}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent> */}
    </div>
  );
}

export default Home;
