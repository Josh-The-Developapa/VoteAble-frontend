import React, { useEffect } from 'react';
import Header from '../../components/Header/Header.jsx';
import Img from '../../assets/VoteAble-header-image-2.png';
import './Subscription.css';

function Subscription() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="FlexBG" style={{ justifyContent: 'center' }}>
      {/* <Header /> */}
      <div className="subCard">
        <img
          src={Img}
          style={{
            height: '20%',
            position: 'relative',
            left: '1px',
            marginTop: '0px',
          }}
          alt="VoteaBLE Img"
        />
        <h1>Free</h1>
        <h2 style={{ marginBottom: '0px', marginTop: '-10px' }}>
          US $0.00/ Month
        </h2>
        <ul>
          <li>Create 5 polls per user</li>
          <li>Vote in 5 polls per user</li>
          <li>No Poll Chains included</li>
          <li>Poll lasts for 24 hours</li>
          <li>Ads included</li>
          <li>No Priority support</li>
        </ul>
      </div>
      <div className="subCard">
        <img
          src={Img}
          style={{
            height: '20%',
            position: 'relative',
            left: '1px',
            marginTop: '0px',
          }}
          alt="VoteaBLE Img"
        />
        <h1>1 Month Access</h1>
        <h2 style={{ marginBottom: '0px', marginTop: '-10px' }}>
          US $10.00/ Month
        </h2>
        <ul>
          <li>Create unlimited polls per user</li>
          <li>Vote in an unlimited number of polls</li>
          <li>Poll Chains included</li>
          <li>No Ads</li>
          <li>Poll lasts for 1 Month</li>
          <li>Priority support</li>
        </ul>
        <form
          action={`http://localhost:8000/create-checkout-session/price_1LnSbdFoXys89NW0jPj1S16M`}
          method="POST"
          style={{ width: '85%' }}
        >
          <button className="cBtn" style={{ width: '100%' }}>
            Checkout
          </button>
        </form>
      </div>
      <div className="subCard">
        <img
          src={Img}
          style={{ height: '20%', position: 'relative', left: '1px' }}
          alt="VoteaBLE Img"
        />
        <h1>6 Month Access</h1>
        <h2 style={{ marginBottom: '0px', marginTop: '-10px' }}>
          US $8.00/ Month
        </h2>
        <ul>
          <li>Create unlimited polls per user</li>
          <li>Vote in an unlimited number of polls</li>
          <li>Poll Chains included</li>
          <li>No Ads</li>
          <li>Poll lasts for 6 Months</li>
          <li>Priority support</li>
        </ul>
        <form
          action={`http://localhost:8000/create-checkout-session/price_1LnSfaFoXys89NW0HR8qqwId`}
          method="POST"
          style={{ width: '85%' }}
        >
          <button className="cBtn" style={{ width: '100%' }}>
            Checkout
          </button>
        </form>
      </div>
      <div className="subCard">
        <img
          src={Img}
          style={{ height: '20%', position: 'relative', left: '1px' }}
          alt="VoteaBLE Img"
        />
        <h1>1 Year Access</h1>
        <h2 style={{ marginBottom: '0px', marginTop: '-10px' }}>
          US $5.00/ Month
        </h2>
        <ul>
          <li>Create unlimited polls per user</li>
          <li>Vote in an unlimited number of polls</li>
          <li>Poll Chains included</li>
          <li>No Ads</li>
          <li>Poll lasts for 1 Year</li>
          <li>Priority support</li>
        </ul>
        <form
          action={`http://localhost:8000/create-checkout-session/price_1LnSjDFoXys89NW0yado7YFk`}
          method="POST"
          style={{ width: '85%' }}
        >
          <button className="cBtn" style={{ width: '100%' }}>
            Checkout
          </button>
        </form>
      </div>
      {/* <ScrollToTop smooth /> */}
    </div>
  );
}

export default Subscription;
