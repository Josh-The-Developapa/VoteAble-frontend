import React, { useContext } from 'react';
import './DropDown.css';
import { NavLink } from 'react-router-dom';
import Context from '../../Context/Context.jsx';
import { MdOutlineAccountCircle } from 'react-icons/md';
import Profile from '../../assets/Profile.svg';

const DropDown = () => {
  const ctx = useContext(Context);

  const formatName = (name) => {
    if (!name) return '';
    const [firstName, ...lastNames] = name.split(' ');
    const formattedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
    const lastNamesInitials = lastNames.map((n) => n.charAt(0)).join('.');
    return `${formattedFirstName} ${lastNamesInitials}`;
  };

  const logout = () => {
    ['name', 'gender', 'Student_ID', 'password', 'class', 'house'].forEach(
      (item) => localStorage.removeItem(item)
    );
    window.location.reload();
  };

  const handleClose = () => {
    ctx.setIsDropVal(false);
  };

  return (
    <div>
      <div className="tsBG" onClick={handleClose}></div>
      <div className="dropdown">
        {localStorage.getItem('name') ? (
          <div>
            {' '}
            <div className="user-info">
              <NavLink to="/account" className="nav-link">
                <img className="dropDownAvatarImage" src={Profile} />
                <h2 style={{ textAlign: 'center', fontFamily: 'Kumbh Sans' }}>
                  Welcome,
                  <br />
                  <span
                    className="highlight"
                    style={{ fontFamily: 'Kumbh Sans' }}
                  >
                    {formatName(localStorage.getItem('name'))}
                  </span>
                </h2>
              </NavLink>
            </div>
          </div>
        ) : (
          <NavLink to="/login">
            <button className="dropDownPollLink" onClick={handleClose}>
              Login
            </button>
          </NavLink>
        )}
        <NavLink to="/home" className="dropDownPollLink" onClick={handleClose}>
          Home
        </NavLink>
        {localStorage.getItem('name') ? (
          <NavLink
            to="/account"
            className="dropDownPollLink"
            onClick={handleClose}
          >
            Account
          </NavLink>
        ) : (
          ''
        )}
        <NavLink to="/about" className="dropDownPollLink" onClick={handleClose}>
          About Us
        </NavLink>
        {localStorage.getItem('name') && (
          <button className="dropDownPollLink logout" onClick={logout}>
            Logout
          </button>
        )}
      </div>
    </div>
  );
};

export default DropDown;
