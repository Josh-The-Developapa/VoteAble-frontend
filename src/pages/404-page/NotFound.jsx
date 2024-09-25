import React, { useEffect } from 'react';
import Header from '../../components/Header/Header.jsx';

function NotFound() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className="joinOuterContainer">
      {/* <Header /> */}
      <h1 style={{ color: 'black' }}>404 - Page Not Found</h1>
    </div>
  );
}

export default NotFound;
