import React, { useState, useContext, useCallback, Suspense } from 'react';
import { FiMenu } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import Context from '../../Context/Context.jsx';
import HeaderText from '../../assets/Header Text.svg';
import Logo from '../../assets/Logo.svg';
import LazyDropDown from '../Drop-down/DropDown.jsx';
import { MdOutlineAccountCircle } from 'react-icons/md';
import './Header.css';

const Header = React.memo(function Header(props) {
  const ctx = useContext(Context);
  const navigate = useNavigate();

  function formatName(name) {
    if (!name) return '';
    const [first, ...rest] = name.split(' ');
    const firstName =
      first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
    const initials = rest.map((n) => n.charAt(0)).join('.');
    return `${firstName}${initials ? ' ' + initials : ''}`;
  }

  const logout = useCallback(() => {
    localStorage.clear();
    navigate('/login');
  }, [navigate]);

  const isLoggedIn = Boolean(localStorage.getItem('name'));

  return (
    <>
      <Suspense fallback={null}>
        {ctx.isDrop && <LazyDropDown message={props.message} />}
      </Suspense>

      <header className="headerContainer">
        {/* Left: Logo + Hamburger */}
        <div className="menuWrapper">
          <div className="logoWrapper">
            <NavLink to="/home" className="logoLink">
              <img src={Logo} alt="VoteAble logo" className="logoImage" />
              <img
                src={HeaderText}
                alt="VoteAble"
                className="headerTextImage"
              />
            </NavLink>
          </div>

          <div className="menu-icon-div">
            <FiMenu
              className="menuIcon"
              size={24}
              onClick={() => ctx.setIsDropVal(true)}
              aria-label="Open menu"
            />
          </div>
        </div>

        {/* Right: Nav */}
        <nav className="headerNav">
          {!isLoggedIn && (
            <>
              <NavLink to="/about" className="pollLink">
                About Us
              </NavLink>
              <NavLink to="/team" className="pollLink">
                Legacy Team
              </NavLink>
              <NavLink to="/login" className="pollLinkPrimary">
                Login
              </NavLink>
            </>
          )}

          {isLoggedIn && (
            <>
              <div
                className="profileWrapper"
                title="View profile"
                onClick={() => navigate('/account')}
              >
                <MdOutlineAccountCircle className="avatarImage" />
                <p className="profileName">
                  {formatName(localStorage.getItem('name'))}
                </p>
              </div>
              <button className="logoutBtn" onClick={logout}>
                Log Out
              </button>
            </>
          )}
        </nav>
      </header>
    </>
  );
});

export default Header;
