import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  Suspense,
} from 'react';
import { FiMenu } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import Context from '../../Context/Context.jsx';
import { useNavigate } from 'react-router-dom';
import HeaderText from '../../assets/Header Text.svg';
import Logo from '../../assets/Logo.svg';
import LazyDropDown from '../Drop-down/DropDown.jsx'; // Assuming LazyDropDown is correctly imported
import { MdOutlineAccountCircle } from 'react-icons/md';

import './Header.css';

const Imgs = {
  avatarPic: '../../assets/VoteAble-header-image-2.png',
  avatarImg: '../../assets/avatarIcon.jpeg',
};

const Header = React.memo(function Header(props) {
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
  const ctx = useContext(Context);
  const navigate = useNavigate();
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const isMenuOpen = Boolean(menuAnchorEl);

  const handleMenuClick = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  const logout = useCallback(async () => {
    localStorage.clear();
    setIsLoggedOut(true);
    navigate('/login');
  }, []);

  return (
    <div>
      <Suspense fallback={<div></div>}>
        {ctx.isDrop ? <LazyDropDown message={props.message} /> : ''}
      </Suspense>
      <div className="headerContainer">
        <div className="menuWrapper">
          <div className="logoWrapper">
            <NavLink to="/home" className="logoLink">
              <img src={Logo} alt="header" className="logoImage" />
              <img src={HeaderText} alt="header" className="headerTextImage" />
            </NavLink>
          </div>
          <div className="menu-icon-div">
            <FiMenu
              className="menuIcon"
              style={{ fontSize: '30px', marginLeft: '40px' }}
              onClick={() => {
                ctx.setIsDropVal(true);
              }}
            />
          </div>
        </div>
        {!localStorage.getItem('name') ? (
          <NavLink to="/login" className="pollLink">
            Login
          </NavLink>
        ) : (
          ''
        )}
        {!localStorage.getItem('name') ? (
          <NavLink to="/about" className="pollLink">
            About Us
          </NavLink>
        ) : (
          ''
        )}
        {localStorage.getItem('name') ? (
          <div
            className="profileWrapper"
            title="see-profile"
            onClick={() => {
              navigate('/account');
            }}
          >
            <MdOutlineAccountCircle className="avatarImage" />
            {/* <img src={Imgs.avatarImg} alt="avatarImg" className="avatarImage" /> */}
            <p
              style={{
                marginRight: '10px',
                marginTop: '10px',
                marginBottom: '10px',
              }}
            >
              {formatName(localStorage.getItem('name'))}
            </p>
          </div>
        ) : (
          ''
        )}
        {localStorage.getItem('name') ? (
          <button
            className="pollLink"
            onClick={logout}
            style={{ backgroundColor: '#000000' }}
          >
            Log Out
          </button>
        ) : (
          ''
        )}
      </div>
    </div>
  );
});

export default Header;
