import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import "./Poll.css";

function Poll(props) {
  const pollId = props.pollId;
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [signupFirstErr, setSignupFirstErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  // const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    async function fetchPoll() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/v1/poll/${pollId}`,
          {
            method: "GET",
          }
        );
        const pollData = await res.json();
        if (pollData.error) {
          setSignupFirstErr(pollData.error);
        } else {
          setQuestion(pollData.data.question);
          setOptions(pollData.data.options);
        }
      } catch (error) {
        console.error("Error fetching poll:", error);
        setSignupFirstErr("Failed to fetch poll data");
      }
    }

    async function checkResults() {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/v1/results/${pollId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: localStorage.getItem("name"),
          }),
        }
      );

      // const data = await res.json();
      // if (data.error) {
      //   setIsAdmin(false);
      //   return;
      // } else {
      //   setHAR(true);
      // }
    }
    checkResults();
    fetchPoll();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pollId, props.pollId]);

  const handleCardClick = (option) => {
    setSelectedOption(option); // Update the selected option
  };

  async function vote() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    if (!selectedOption) {
      setSignupFirstErr("Please select an option to vote.");
      return;
    }

    setLoading(true);
    setButtonDisabled(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/v1/vote/${pollId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            answer: selectedOption.name,
            name: localStorage.getItem("name"),
            password: localStorage.getItem("password"),
          }),
        }
      );

      const voteData = await res.json();

      if (res.ok) {
        setSignupFirstErr("Voted");
        setTimeout(() => {
          props.handleNext();
        }, 1500);
      } else {
        setSignupFirstErr(voteData.error || "Failed to vote");
      }
    } catch (error) {
      console.error("Error voting:", error);
      setSignupFirstErr("An error occurred while voting");
    } finally {
      setLoading(false);
      setTimeout(() => {
        setButtonDisabled(false);
      }, 2000);
    }
  }

  return (
    <div>
      <div className="pollContainer">
        <div className="header">
          <div>
            <h1 className="mainTitle">Select Your</h1>
            <h1 className="mainTitleQuestion">{question}</h1>
          </div>
        </div>

        {/* Display error or success message */}
        {signupFirstErr === "Voted" ? (
          <h1
            className="mainTitleQuestion"
            style={{ fontSize: "25px", padding: "15px", fontWeight: 700 }}
          >
            Voted
          </h1>
        ) : (
          <p
            className="mainTitleQuestion"
            style={{
              fontSize: "25px",
              padding: "15px",
              fontWeight: 700,
              color: "red",
            }}
          >
            {signupFirstErr}
          </p>
        )}

        {/* Render the candidate options */}
        <div className="candidates">
          {/* ! option is not handled properly */}
          {options.map((option) => (
            <div
              key={option.name}
              className={`candidate-card ${
                selectedOption && selectedOption.name === option.name
                  ? "selected"
                  : ""
              }`}
              onClick={() => handleCardClick(option)}
            >
              {option.photo ? (
                <img
                  src={`${import.meta.env.VITE_API_URL}/uploads/${
                    option.photo
                  }`}
                  alt={option.name}
                  className="candidate-photo"
                />
              ) : (
                <div className="candidate-placeholder">
                  <h2>{option.name}</h2>
                </div>
              )}
              {/* <div className="candidate-info">
                <h2
                  style={{
                    color:
                      selectedOption && selectedOption.name === option.name
                        ? '#ffffff'
                        : '#000000',
                    fontSize: '18px',
                  }}
                >
                  {option.name}
                </h2>
              </div> */}
            </div>
          ))}
        </div>

        {/* Buttons for navigation and voting */}
        <div className="buttonContainer">
          <button
            onClick={() => props.handleBack()}
            className="vote-button"
            disabled={buttonDisabled}
          >
            Back
          </button>
          <button
            className="vote-button"
            onClick={vote}
            disabled={buttonDisabled || loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : "Vote"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Poll;
