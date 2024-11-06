import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Poll.css';

function Poll(props) {
  const pollId = props.pollId;
  const navigate = useNavigate();
  const [pollNotFound, setPollNotFound] = useState();
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [signupFirstErr, setSignupFirstErr] = useState();
  const [loading, setLoading] = useState(false); // State for loading
  const [buttonDisabled, setButtonDisabled] = useState(false); // State for disabling button
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [HAR, setHAR] = useState(false); // State for has administrative rights

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    async function fetchPoll() {
      const res = await fetch(
        `https://backend.voteable.live/v1/poll/${pollId}`,
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
    async function checkResults() {
      const res = await fetch(
        `https://backend.voteable.live/v1/results/${pollId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Student_ID: localStorage.getItem('Student_ID'),
          }),
        }
      );

      const data = await res.json();
      if (data.error) {
        setHAR(false);
        return;
      } else {
        setHAR(true);
      }
    }
    checkResults();
    fetchPoll();
  }, [pollId, props.pollId]);

  async function vote() {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    if (!selectedOption) {
      setSignupFirstErr('Please select an option to vote.');
      return;
    }

    setLoading(true); // Start loading
    setButtonDisabled(true); // Disable button immediately

    const res = await fetch(
      `https://backend.voteable.live/v1/vote/${pollId ? pollId : props.pollId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          answer: selectedOption.text,
          name: localStorage.getItem('name'),
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
      setTimeout(() => {
        props.handleNext(); // Call the function to go to the next item
      }, 1500);
    } else if (data.error) {
      setSignupFirstErr(data.error);
      setTimeout(() => {
        props.handleNext(); // Call the function to go to the next item
      }, 1500);
    }

    // Re-enable the button after 2 seconds
    setTimeout(() => {
      setButtonDisabled(false);
    }, 2000);
  }

  // async function next() {
  //   props.handleNext();
  // }

  return (
    <div>
      <div className="pollContainer">
        <div className="header">
          <div>
            <h1 className="mainTitle">Resolution for</h1>
            <h1 className="mainTitleQuestion">{question}</h1>
          </div>
        </div>
        {signupFirstErr === 'Voted' ? (
          <h1
            className="mainTitleQuestion"
            style={{ fontSize: '25px', padding: '15px', fontWeight: 700 }}
          >
            Voted
          </h1>
        ) : (
          <p
            className="mainTitleQuestion"
            style={{
              fontSize: '25px',
              padding: '15px',
              fontWeight: 700,
              color: 'red',
            }}
          >
            {signupFirstErr}
          </p>
        )}
        {screenWidth < 680 ? (
          <div className="candidates">
            {options.map((option) => (
              <div
                key={option.text}
                className={`candidate-card-mobile ${
                  selectedOption && selectedOption.text === option.text
                    ? 'selected'
                    : ''
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option.photo && (
                  <img
                    src={`https://backend.voteable.live/uploads/${option.photo}`}
                    alt={option.text}
                  />
                )}
                <div className="candidate-info">
                  <div>
                    <h1
                      className="poll-class"
                      style={{ marginBottom: '-15px' }}
                    >
                      {option.class}
                    </h1>
                    {/* <h1 className={option.house}>{option.house}</h1> */}
                  </div>
                  <div>
                    <h4
                      style={{
                        color:
                          selectedOption && selectedOption.text === option.text
                            ? '#ffffff'
                            : '#000000',
                        fontSize: '18px',
                      }}
                    >
                      {option.text}
                    </h4>
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
        ) : (
          ''
        )}
        {options.length >= 4 && screenWidth >= 680 ? (
          <div className="candidates">
            {options.map((option) => (
              <div
                key={option.text}
                className={`candidate-card-many-options ${
                  selectedOption && selectedOption.text === option.text
                    ? 'selected'
                    : ''
                }`}
                onClick={() => setSelectedOption(option)}
              >
                {option.photo && (
                  <img
                    src={`https://backend.voteable.live/uploads/${option.photo}`}
                    alt={option.text}
                  />
                )}
                <div className="candidate-info">
                  <div>
                    <h1 className="poll-class">{option.class}</h1>
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
        ) : (
          ''
        )}
        {options.length < 4 && screenWidth >= 680 ? (
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
                    src={`https://backend.voteable.live/uploads/${option.photo}`}
                    alt={option.text}
                  />
                )}
                <div className="candidate-info">
                  <div style={{ height: '190px' }}>
                    <h1 className="poll-class">{option.class}</h1>
                    {/* <h1 className={option.house}>{option.house}</h1> */}
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
              {/* {HAR ? (
                <Link to={`/results/${pollId}`} className="vote-button">
                  Results
                </Link>
              ) : (
                ''
              )} */}

              <button
                className="vote-button"
                onClick={!loading ? vote : () => {}}
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
        ) : (
          ''
        )}
      </div>
    </div>
  );
}

export default Poll;
