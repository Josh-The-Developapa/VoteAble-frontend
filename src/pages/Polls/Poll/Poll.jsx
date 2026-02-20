import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import PollSkeleton from '../../../components/PollSkeleton/PollSkeleton.jsx';
import './Poll.css';

function Poll(props) {
  const pollId = props.pollId;
  const [pollNotFound, setPollNotFound] = useState();
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [statusMsg, setStatusMsg] = useState(null); // { type: 'success'|'error', text: '' }
  const [loading, setLoading] = useState(false);
  const [pollLoading, setPollLoading] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    async function fetchPoll() {
      setPollLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/v1/poll/${pollId}`,
      );
      const data = await res.json();
      await new Promise((r) => setTimeout(r, 600));
      if (data.error) {
        setPollNotFound(data.error);
      } else {
        setQuestion(data.data.question);
        setOptions(data.data.options);
      }
      setPollLoading(false);
    }

    fetchPoll();
    return () => window.removeEventListener('resize', handleResize);
  }, [pollId]);

  async function vote() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (!selectedOption) {
      setStatusMsg({
        type: 'error',
        text: 'Please select a candidate to vote.',
      });
      return;
    }

    setLoading(true);
    setButtonDisabled(true);

    const res = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/v1/vote/${pollId || props.pollId}`,
      {
        method: 'POST',
        body: JSON.stringify({
          answer: selectedOption.text,
          Student_ID: localStorage.getItem('Student_ID'),
          password: localStorage.getItem('password'),
        }),
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const data = await res.json();
    setLoading(false);

    if (res.ok) {
      setStatusMsg({ type: 'success', text: '✓ Vote recorded!' });
      setTimeout(() => props.handleNext(), 1500);
    } else if (data.error) {
      setStatusMsg({ type: 'error', text: data.error });
      setTimeout(() => props.handleNext(), 1500);
    }

    setTimeout(() => setButtonDisabled(false), 2000);
  }

  if (pollLoading) return <PollSkeleton screenWidth={screenWidth} />;

  if (pollNotFound) {
    return (
      <div className="pollContainer">
        <div className="pollHeader">
          <p className="pollLabel">Error</p>
          <h1 className="pollTitle" style={{ color: '#c0392b' }}>
            {pollNotFound}
          </h1>
        </div>
      </div>
    );
  }

  const isMobile = screenWidth < 680;
  const isManyOptions = options.length >= 4;

  const cardClass = isMobile
    ? 'candidate-card-mobile'
    : isManyOptions
      ? 'candidate-card-many-options'
      : 'candidate-card';

  return (
    <div className="pollContainer">
      <div className="pollHeader">
        <p className="pollLabel">Cast your vote</p>
        <h1 className="pollTitle">
          Select Your <span>{question}</span>
        </h1>
      </div>

      {statusMsg && (
        <div className={`pollStatus ${statusMsg.type}`}>{statusMsg.text}</div>
      )}

      <div className="candidates">
        {options.map((option) => {
          const isSelected = selectedOption?.text === option.text;
          return (
            <div
              key={option.text}
              className={`${cardClass} ${isSelected ? 'selected' : ''}`}
              onClick={() => setSelectedOption(option)}
            >
              {option.photo && (
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/uploads/${option.photo}`}
                  alt={option.text}
                />
              )}
              <div className="candidate-info">
                <h1 className="poll-class">{option.class}</h1>
                <div>
                  {isMobile ? (
                    <h4 style={{ color: isSelected ? '#fff' : '#0f0c29' }}>
                      {option.text.split(' ').map((w, i) => (
                        <React.Fragment key={i}>
                          {w}
                          <br />
                        </React.Fragment>
                      ))}
                    </h4>
                  ) : (
                    <h2 style={{ color: isSelected ? '#fff' : '#0f0c29' }}>
                      {option.text.split(' ').map((w, i) => (
                        <React.Fragment key={i}>
                          {w}
                          <br />
                        </React.Fragment>
                      ))}
                    </h2>
                  )}
                  {option.house && (
                    <p className={option.house}>{option.house}</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div className="buttonContainer">
          <button
            onClick={() => props.handleBack()}
            className="vote-button"
            disabled={buttonDisabled}
            style={{
              background: 'transparent',
              color: '#312783',
              border: '1.5px solid rgba(49,39,131,0.3)',
            }}
          >
            ← Back
          </button>
          <button
            className="vote-button"
            onClick={vote}
            disabled={buttonDisabled || loading}
          >
            {loading ? <Spinner animation="border" size="sm" /> : 'Vote →'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Poll;
