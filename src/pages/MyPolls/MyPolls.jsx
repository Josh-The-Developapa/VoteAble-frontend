import React, { useEffect, useRef, useState } from "react";
import { Carousel } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { useNavigate } from "react-router-dom";
import PollSVG from "../../assets/Poll.svg";
import Poll from "../Polls/Poll/Poll.jsx";
import Results from "../Results/Results.jsx";
import "./MyPolls.css";

function MyPolls() {
  const navigate = useNavigate();
  const [loginFirstErr, setLoginFirstErr] = useState(false);
  const [error, setError] = useState("");
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0); // Track current carousel index
  const carouselRef = useRef(null);
  const [isAdmin, setIsAdmin] = useState(false); // State for has administrative rights

  useEffect(() => {
    const myPolls = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/v1/myPolls`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: localStorage.getItem("name"),
            password: localStorage.getItem("password"),
          }),
        });

        const pollData = await res.json();
        setIsLoading(false);

        if (res.ok) {
          // Custom sorting by rank
          const sortedPolls = pollData.data.sort((a, b) => {
            const rankA = Number(a.rank);
            const rankB = Number(b.rank);
            return rankA - rankB; // Ascending order
          });

          setPolls(sortedPolls);
          console.log(sortedPolls);

          // Check admin access
          if (pollData.message === "You have admin access") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } else {
          setError(pollData.error || "Failed to fetch polls");
        }
      } catch (err) {
        console.error("Error fetching polls:", err);
        setError("An error occurred while fetching polls");
        setIsLoading(false);
      }
    };

    if (localStorage.getItem("name")) {
      setLoginFirstErr(false);
      myPolls();
    } else {
      setLoginFirstErr(true);
    }
  }, []);

  const handleNext = () => {
    if (currentIndex + 1 === polls.length) {
      navigate("/account");
    } else if (carouselRef.current) {
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

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <div>
      <div className="FlexBG" style={{ flexDirection: "row" }}>
        <img
          src={PollSVG}
          alt="Polls background SVG"
          style={{
            position: "fixed",
            left: "50%",
            height: "400px",
            width: "400px",
            top: "15px",
          }}
        />

        {/* Show login prompt if user is not logged in */}
        {loginFirstErr && (
          <div className="pollc">
            <h1>Login First to Access Polls</h1>
            <p style={{ marginLeft: "10px", marginRight: "10px" }}>
              To vote as a student of Aga Khan High School, Kampala, please
              login with valid credentials. <br /> <br />
              Please end the shenanigans and stop gallivanting.
            </p>
          </div>
        )}

        {/* Show loading spinner while fetching data */}
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100%",
              backgroundColor: "whitesmoke",
            }}
          >
            <Spinner animation="grow" />
          </div>
        )}

        {/* Show polls if data is loaded */}
        {!isLoading && polls.length > 0 && (
          <div>
            <Carousel
              ref={carouselRef}
              controls={false}
              touch={false}
              interval={null}
              onSelect={handleSelect}
              indicators={false}
              activeIndex={currentIndex}
            >
              {polls.map((poll, index) => (
                <Carousel.Item key={poll._id}>
                  {isAdmin ? (
                    // Admin view: Show results
                    <Results
                      pollId={poll._id}
                      handleNext={handleNextResults}
                      handleBack={handleBack}
                    />
                  ) : (
                    // Non-admin view: Show poll
                    <Poll
                      pollId={poll._id}
                      handleNext={handleNext}
                      handleBack={handleBack}
                    />
                  )}
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
        )}

        {/* Show error message if no polls are found */}
        {!isLoading && polls.length === 0 && !loginFirstErr && (
          <div className="pollc">
            <h1>{error || "No polls found"}</h1>
            {error === "Student account does not exist" && (
              <p>
                The ID that you entered does not belong to a student of Aga Khan
                High School, Kampala. <br /> <br />
                Please end the shenanigans and stop gallivanting.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyPolls;
