import React, { useContext } from 'react';
import './DropDown.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Context from '../../Context/Context.jsx';
import Profile from '../../assets/Profile.svg';
import Logo from '../../assets/Logo.svg';
import HeaderText from '../../assets/Header Text.svg';
import { IoClose } from 'react-icons/io5';
import { MdOutlineAccountCircle } from 'react-icons/md';

const DropDown = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();

  const formatName = (name) => {
    if (!name) return '';
    const [first, ...rest] = name.split(' ');
    const firstName =
      first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
    const initials = rest.map((n) => n.charAt(0)).join('.');
    return `${firstName}${initials ? ' ' + initials : ''}`;
  };

  const logout = () => {
    ['name', 'Student_ID', 'password', 'class', 'house'].forEach((key) =>
      localStorage.removeItem(key),
    );
    ctx.setIsDropVal(false);
    navigate('/login');
    window.location.reload();
  };

  const handleClose = () => ctx.setIsDropVal(false);
  const isLoggedIn = Boolean(localStorage.getItem('name'));

  return (
    <>
      <div className="mobileNavOverlay" onClick={handleClose} />

      <div className="mobileNavDrawer">
        {/* Close */}
        <button
          className="drawerCloseBtn"
          onClick={handleClose}
          aria-label="Close menu"
        >
          <IoClose className="drawerCloseIcon" />
        </button>

        {/* Brand strip */}
        <div className="drawerBrandStrip">
          <img src={Logo} alt="VoteAble" className="drawerBrandLogo" />
          <img src={HeaderText} alt="VoteAble" className="drawerBrandText" />
        </div>

        {/* User section */}
        {isLoggedIn ? (
          <div className="drawerUserSection">
            <NavLink
              to="/account"
              className="drawerProfileLink"
              onClick={handleClose}
            >
              <MdOutlineAccountCircle
                style={{
                  height: 46,
                  width: 46,
                  color: '#27003c',
                  opacity: 0.7,
                }}
              />
              <div className="drawerUserInfo">
                <p className="drawerWelcomeLabel">Logged in as</p>
                <p className="drawerUserNameHighlight">
                  {formatName(localStorage.getItem('name'))}
                </p>
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="drawerUserSectionLoggedOut">
            <div className="drawerGuestBadge">
              <img src={Profile} alt="Guest" className="drawerGuestIcon" />
              <p className="drawerGuestLabel">Not logged in</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="drawerNavLinksContainer">
          <NavLink to="/home" className="drawerNavBtn" onClick={handleClose}>
            Home
          </NavLink>

          {isLoggedIn && (
            <NavLink
              to="/account"
              className="drawerNavBtn"
              onClick={handleClose}
            >
              My Account
            </NavLink>
          )}

          <NavLink to="/about" className="drawerNavBtn" onClick={handleClose}>
            About Us
          </NavLink>

          <NavLink to="/team" className="drawerNavBtn" onClick={handleClose}>
            Legacy Team
          </NavLink>
        </nav>

        {/* Action footer */}
        <div className="drawerActionSection">
          {isLoggedIn ? (
            <button className="drawerLogoutBtn" onClick={logout}>
              Log Out
            </button>
          ) : (
            <NavLink
              to="/login"
              className="drawerLoginBtn"
              onClick={handleClose}
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </>
  );
};

export default DropDown;
