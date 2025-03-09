import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import PollSVG from '../../assets/Poll.svg';
import Poll from '../Polls/Poll/Poll.jsx';
import Results from '../Results/Results.jsx';
import './MyPolls.css';

function MyPolls() {
  const navigate = useNavigate();
  // const [copy, setCopy] = useState(true);
  const [signupFirstErr, setSignupFirstErr] = useState(false);
  const [error, setError] = useState('');
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current carousel index
  const carouselRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false); // State for has administrative rights

  useEffect(() => {
    const myPolls = async () => {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/myPolls`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Student_ID: localStorage.getItem('Student_ID'),
          password: localStorage.getItem('password'),
        }),
      });

      const data = await res.json();
      setIsLoading(false);

      if (res.ok) {
        // Custom sorting by date or any other field
        const sortedPolls = data.data.sort((a, b) => {
          const rankA = Number(a.rank); // Replace `a.date` with your actual date field
          const rankB = Number(b.rank);
          return rankA - rankB; // Ascending order
        });

        setPolls(sortedPolls);
        console.log(sortedPolls);
      }

      if (data.error) {
        setError(data.error);
        return;
      }

      if (data.message === 'You do not have admin access') {
        setIsAdmin(false);
      }

      if (data.message === 'You have admin access') {
        setIsAdmin(true);
      }
    };

    if (localStorage.getItem('name')) {
      setSignupFirstErr(false);
      myPolls();
    } else {
      setSignupFirstErr(true);
    }

    console.log(isAdmin);
  }, []);

  const handleNext = () => {
    if (currentIndex + 1 === polls.length) {
      navigate('/account');
    }
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };

  const handleNextResults = () => {
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

  return (
    <div>
      <div className="FlexBG" style={{ flexDirection: 'row' }}>
        <img
          src={PollSVG}
          alt="Polls background SVG"
          style={{
            position: 'fixed',
            left: '50%',
            height: '400px',
            width: '400px',
            top: '15px',
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

        {isAdmin && polls.length > 0 ? (
          <div data-bs-touch="false">
            <Carousel
              ref={carouselRef}
              controls={false}
              touch={false} // Disable touch/swipe navigation
              interval={null}
              onSelect={handleSelect}
              indicators={false} // Hide default indicators
              activeIndex={currentIndex} // Set activeIndex to control the current slide
            >
              {polls.map((poll, index) => (
                <Carousel.Item key={poll._id}>
                  <Results
                    pollId={poll._id}
                    handleNext={handleNextResults}
                    handleBack={handleBack}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
            <div className="carousel-caption">
              {currentIndex + 1} of {polls.length}
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${((currentIndex + 1) / polls.length) * 100}%`,
                }}
              />
            </div>
          </div>
        ) : (
          ''
        )}

        {isAdmin === false && polls.length > 0 ? (
          <div>
            <Carousel
              ref={carouselRef}
              controls={false}
              touch={false}
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
            <div className="carousel-caption">
              {currentIndex + 1} of {polls.length}
            </div>
            <div className="progress-bar-container">
              <div
                className="progress-bar"
                style={{
                  width: `${((currentIndex + 1) / polls.length) * 100}%`,
                }}
              />
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
