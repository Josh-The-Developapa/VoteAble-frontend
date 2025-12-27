import React, { useContext } from 'react';
import './DropDown.css';
import { NavLink } from 'react-router-dom';
import Context from '../../Context/Context.jsx';
import Profile from '../../assets/Profile.svg';
import { useNavigate } from 'react-router-dom';
import { IoClose } from 'react-icons/io5'; // Add this import

const DropDown = () => {
  const ctx = useContext(Context);
  const navigate = useNavigate();

  const formatName = (name) => {
    if (!name) return '';
    const [firstName, ...lastNames] = name.split(' ');
    const formattedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const lastNamesInitials = lastNames.map((n) => n.charAt(0)).join('.');
    return `${formattedFirstName} ${lastNamesInitials}`;
  };

  const logout = () => {
    ['name', 'Student_ID', 'password', 'class', 'house'].forEach((item) =>
      localStorage.removeItem(item)
    );
    navigate('/login');
    window.location.reload();
  };

  const handleClose = () => {
    ctx.setIsDropVal(false);
  };

  return (
    <div>
      <div className="mobileNavOverlay" onClick={handleClose}></div>
      <div className="mobileNavDrawer">
        {/* Close Button */}
        <button
          className="drawerCloseBtn"
          onClick={handleClose}
          aria-label="Close menu"
        >
          <IoClose className="drawerCloseIcon" />
        </button>

        {localStorage.getItem('name') ? (
          <div className="drawerUserSection">
            <NavLink
              to="/account"
              className="drawerProfileLink"
              onClick={handleClose}
            >
              <img className="drawerAvatarImg" src={Profile} alt="Profile" />
              <h2 className="drawerWelcomeText">
                Welcome,
                <br />
                <span className="drawerUserNameHighlight">
                  {formatName(localStorage.getItem('name'))}
                </span>
              </h2>
            </NavLink>
          </div>
        ) : (
          <div className="drawerUserSectionLoggedOut">
            <div className="drawerProfilePlaceholder">
              <img className="drawerAvatarImg" src={Profile} alt="Profile" />
            </div>
          </div>
        )}

        <nav className="drawerNavLinksContainer">
          <NavLink to="/home" className="drawerNavBtn" onClick={handleClose}>
            Home
          </NavLink>

          {localStorage.getItem('name') && (
            <NavLink
              to="/account"
              className="drawerNavBtn"
              onClick={handleClose}
            >
              Account
            </NavLink>
          )}

          <NavLink to="/about" className="drawerNavBtn" onClick={handleClose}>
            About Us
          </NavLink>

          <NavLink to="/team" className="drawerNavBtn" onClick={handleClose}>
            Legacy Team
          </NavLink>
        </nav>

        <div className="drawerActionSection">
          {localStorage.getItem('name') ? (
            <button className="drawerNavBtn drawerLogoutBtn" onClick={logout}>
              Logout
            </button>
          ) : (
            <NavLink to="/login">
              <button
                className="drawerNavBtn drawerLoginBtn"
                onClick={handleClose}
              >
                Login
              </button>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropDown;
