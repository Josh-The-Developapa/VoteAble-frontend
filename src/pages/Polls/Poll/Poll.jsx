import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import './Poll.css';

function Poll(props) {
  const { pollId } = useParams();
  const navigate = useNavigate();
  const [pollNotFound, setPollNotFound] = useState();
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [signupFirstErr, setSignupFirstErr] = useState();
  const [loading, setLoading] = useState(false); // State for loading
  const [buttonDisabled, setButtonDisabled] = useState(false); // State for disabling button

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    async function fetchPoll() {
      const res = await fetch(
        `https://voteable-backend.onrender.com/v1/poll/${
          pollId ? pollId : props.pollId
        }`,
        {
          method: 'GET',
        }
      );
      const data = await res.json();
      if (data.error) {
        setPollNotFound(data.error);
        return;
      } else {
        setQuestion(data.data.question);
        setOptions(data.data.options);
      }
      console.log(data);
    }
    fetchPoll();
  }, [pollId, props.pollId]);

  async function vote() {
    if (!selectedOption) {
      setSignupFirstErr('Please select an option to vote.');
      return;
    }

    setLoading(true); // Start loading
    setButtonDisabled(true); // Disable button immediately

    const res = await fetch(
      `https://voteable-backend.onrender.com/v1/vote/${
        pollId ? pollId : props.pollId
      }`,
      {
        method: 'POST',
        body: JSON.stringify({
          answer: selectedOption.text,
          Student_ID: localStorage.getItem('Student_ID'),
          password: localStorage.getItem('password'),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const data = await res.json();
    setLoading(false); // End loading

    if (res.ok) {
      setSignupFirstErr('Voted');
      props.handleNext(); // Call the function to go to the next item
    } else if (data.error) {
      setSignupFirstErr(data.error);
      props.handleNext(); // Call the function to go to the next item
    }

    // Re-enable the button after 5 seconds
    setTimeout(() => {
      setButtonDisabled(false);
    }, 2000);
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
        {signupFirstErr === 'Voted' ? (
          <p
            className="mainTitleQuestion"
            style={{ fontSize: '30px', marginLeft: '10px', fontWeight: 700 }}
          >
            Voted
          </p>
        ) : (
          <p
            className="mainTitleQuestion"
            style={{
              fontSize: '30px',
              marginLeft: '10px',
              fontWeight: 700,
              color: 'red',
            }}
          >
            {signupFirstErr}
          </p>
        )}
        <div className="candidates">
          {options.map((option) => (
            <div
              key={option.text}
              className={`candidate-card ${
                selectedOption && selectedOption.text === option.text
                  ? 'selected'
                  : ''
              }`}
              onClick={() => setSelectedOption(option)}
            >
              {option.photo && (
                <img
                  src={`https://voteable-backend.onrender.com/uploads/${option.photo}`}
                  alt={option.text}
                />
              )}
              <div className="candidate-info">
                <div style={{ height: '190px' }}>
                  <h1 className="poll-class">{option.class}</h1>
                  <h1 className={option.house}>{option.house}</h1>
                </div>
                <div>
                  <h2
                    style={{
                      color:
                        selectedOption && selectedOption.text === option.text
                          ? '#ffffff'
                          : '#000000',
                    }}
                  >
                    {option.text}
                  </h2>
                </div>
              </div>
            </div>
          ))}

          <div className="buttonContainer">
            <button
              onClick={() => props.handleBack()}
              className="vote-button"
              disabled={buttonDisabled} // Disable button based on state
            >
              Back
            </button>
            <button
              className="vote-button"
              onClick={vote}
              disabled={buttonDisabled || loading} // Disable button during loading and for 5 seconds after
            >
              {loading ? (
                <Spinner animation="border" size="sm" /> // Show spinner during loading
              ) : (
                'Vote'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Poll;
