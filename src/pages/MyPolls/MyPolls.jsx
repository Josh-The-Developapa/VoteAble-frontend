import React, { useState, useEffect, useRef } from 'react';
import { Carousel } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import './MyPolls.css';
import Header from '../../components/Header/Header.jsx';
import Poll from '../Polls/Poll/Poll.jsx';
import PollSVG from '../../assets/Poll.svg';

function MyPolls() {
  const [copy, setCopy] = useState(true);
  const [signupFirstErr, setSignupFirstErr] = useState(false);
  const [error, setError] = useState('');
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current carousel index
  const carouselRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    const myPolls = async () => {
      setIsLoading(true);
      const res = await fetch(
        'https://voteable-backend.onrender.com/v1/myPolls',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Student_ID: localStorage.getItem('Student_ID'),
            password: localStorage.getItem('password'),
          }),
        }
      );

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        setPolls(data.data);
        console.log(data.data);
      }

      if (data.error) {
        setError(data.error);
        return;
      }
    };

    if (localStorage.getItem('name')) {
      setSignupFirstErr(false);
      myPolls();
    } else {
      setSignupFirstErr(true);
    }
  }, []);

  const handleNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handleBack = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };

  const handleSelect = (selectedIndex, e) => {
    console.log('Carousel selected index:', selectedIndex);
    setCurrentIndex(selectedIndex);
  };

  // const handleProgressBarClick = (e) => {
  //   const progressBar = e.target;
  //   const clickPosition =
  //     (e.clientX - progressBar.getBoundingClientRect().left) /
  //     progressBar.offsetWidth;
  //   const newIndex = Math.floor(clickPosition * polls.length);
  //   console.log('Progress bar clicked:', clickPosition, newIndex);
  //   setCurrentIndex(newIndex);
  //   if (carouselRef.current) {
  //     carouselRef.current.to(newIndex);
  //   }
  // };

  return (
    <div>
      <div className="FlexBG" style={{ flexDirection: 'row' }}>
        {/* <Header /> */}
        <img
          src={PollSVG}
          alt="Polls background SVG"
          style={{
            position: 'fixed',
            left: '50%',
            height: '400px',
            width: '400px',
            top: '15px',
            zIndex: 10,
          }}
        />
        {signupFirstErr && (
          <div className="pollc">
            <h1>Login First to access polls</h1>
            <p style={{ marginLeft: '10px', marginRight: '10px' }}>
              Please login with valid credentials to vote as a student of Aga
              Khan High School, Kampala. <br /> <br />
              Please end the shenanigans and stop gallivanting
            </p>
          </div>
        )}

        {isLoading && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              width: '100%',
              backgroundColor: 'whitesmoke',
            }}
          >
            <Spinner animation="grow" />
          </div>
        )}

        {!isLoading && polls.length > 0 ? (
          <div>
            <Carousel
              ref={carouselRef}
              controls={false}
              touch={true}
              interval={null}
              onSelect={handleSelect}
              indicators={false} // Hide default indicators
              activeIndex={currentIndex} // Set activeIndex to control the current slide
            >
              {polls.map((poll, index) => (
                <Carousel.Item key={poll._id}>
                  <Poll
                    pollId={poll._id}
                    handleNext={handleNext}
                    handleBack={handleBack}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <div>
              <div className="carousel-caption">
                {currentIndex + 1} of {polls.length}
              </div>
              <div
                className="progress-bar-container"
                // onClick={handleProgressBarClick}
              >
                <div
                  className="progress-bar"
                  style={{
                    width: `${((currentIndex + 1) / polls.length) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          ''
        )}

        {!polls && !isLoading ? (
          <div className="pollc">
            <h1>{error}</h1>
            {error === 'Student account does not exist' ? (
              <p>
                The ID that you entered does not belong to a student of Aga Khan
                High School, Kampala. <br /> <br />
                Please end the shenanigans and stop gallivanting
              </p>
            ) : (
              ''
            )}
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default MyPolls;
