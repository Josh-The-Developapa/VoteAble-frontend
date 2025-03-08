import React from 'react';
import Header from '../components/Header/Header';
import './Layout.css';

function Layout(props) {
  return (
    <div>
      <Header />
      {props.page}
    </div>
  );
}

export default Layout;
