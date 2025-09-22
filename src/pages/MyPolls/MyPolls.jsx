import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import PollSVG from '../../assets/Poll.svg';
import Poll from '../Polls/Poll/Poll.jsx';
import Results from '../Results/Results.jsx';
import './MyPolls.css';

// PDF Generator Component
// Updated PDF Generator Component with Admin Options
const ElectionResultsPDF = ({ polls = [], onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOnlyWinner, setShowOnlyWinner] = useState(false);
  const [showVoteCounts, setShowVoteCounts] = useState(true);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      // Fetch detailed results for all polls
      const pollsWithResults = await Promise.all(
        polls.map(async (poll) => {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/v1/results/${poll._id}`,
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
          return {
            _id: poll._id,
            question: data.data.question,
            options: data.data.options,
          };
        })
      );

      // Create the HTML content for the PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Student Council Election Results</title>
            <style>
  body {
    font-family: 'Arial', sans-serif;
    background-color: whitesmoke;
    margin: 0;
    padding: 12px;
    line-height: 1.3;
    font-size: 13px;
  }
  
  .header {
    text-align: center;
    margin-bottom: 18px;
    border-bottom: 2px solid #2D1B69;
    padding-bottom: 10px;
  }
  
  .logo-placeholder {
    width: 80px;
    height: 80px;
    background-color: #e2e8f0;
    border: 1px dashed #4a5568;
    margin: 0 auto 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4a5568;
    font-size: 11px;
    font-weight: bold;
  }
  
  .school-name {
    font-size: 18px;
    font-weight: bold;
    color: #1a202c;
    margin: 6px 0;
  }
  
  .election-title {
    font-size: 16px;
    color: #2D1B69;
    margin: 3px 0;
  }
  
  .date-info {
    font-size: 12px;
    color: #4a5568;
    margin-top: 5px;
  }
  
  .poll-section {
    background-color: white;
    margin: 12px 0;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 1px 2px rgba(0,0,0,0.08);
    break-inside: avoid;
  }
  
  .poll-title {
    font-size: 15px;
    font-weight: bold;
    color: #1a202c;
    margin-bottom: 3px;
    border-bottom: 1px solid #e2e8f0;
    padding-bottom: 5px;
  }
  
  .results-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 6px;
    font-size: 13px;
  }
  
  .results-table th {
    background-color: #f7fafc;
    color: #2d3748;
    padding: 6px;
    text-align: left;
    border: 1px solid #e2e8f0;
    font-weight: bold;
  }
  
  .results-table td {
    padding: 6px;
    border: 1px solid #e2e8f0;
  }
  
  .candidate-name {
    font-weight: 500;
    color: #1a202c;
  }
  
  .vote-count {
    text-align: center;
    font-weight: bold;
    color: #2c5282;
  }
  
  .winner-row {
    background-color: #f0fff4;
  }
  
  .winner-indicator {
    color: #38a169;
    font-weight: bold;
  }
  
  .winner-only-display {
    background-color: #f0fff4;
    padding: 8px;
    border-radius: 5px;
    border-left: 3px solid #38a169;
    margin-top: 6px;
  }
  
  .winner-name {
    font-size: 14px;
    font-weight: bold;
    color: #1a202c;
    margin-bottom: 3px;
  }
  
  .winner-status {
    color: #38a169;
    font-weight: bold;
    font-size: 12px;
  }
  
  .summary-section {
    background-color: white;
    margin-top: 18px;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #e2e8f0;
    font-size: 13px;
  }
  
  .summary-title {
    font-size: 15px;
    font-weight: bold;
    color: #1a202c;
    margin-bottom: 8px;
  }
  
  .footer {
    text-align: center;
    margin-top: 20px;
    padding-top: 10px;
    border-top: 1px solid #e2e8f0;
    color: #4a5568;
    font-size: 11px;
  }
  
  @media print {
    body { background-color: white !important; }
    .poll-section { box-shadow: none; }
  }
</style>

          </head>
          <body>
            <div class="header">
              <div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin-bottom: 15px;">
                <img src="../../../Aga-Khan.png" alt="School Logo" style="height: 80px; object-fit: contain;" />
                <span style="font-size: 28px; font-weight: bold; color: #2c5282;">|</span>
                <img src="../../../VoteAble-Logo.png" alt="VoteAble Logo" style="height: 60px; object-fit: contain; opacity: 0.85;" />
              </div>

              <div class="school-name">Aga Khan High School, Kampala</div>
              <div class="election-title">Student Council Election Results</div>
              <div class="date-info">
                Generated on: ${new Date().toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
            
            ${pollsWithResults
              .map((poll) => {
                const totalVotes = poll.options.reduce(
                  (sum, option) => sum + option.votes,
                  0
                );
                const sortedOptions = [...poll.options].sort(
                  (a, b) => b.votes - a.votes
                );

                const winner = sortedOptions[0];

                if (showOnlyWinner) {
                  // Show only winner format
                  return `
                    <div class="poll-section">
                      <div class="poll-title">${poll.question}</div>
                      <div class="winner-only-display">
                        <div class="winner-name">${
                          winner?.text || 'No Winner'
                        }</div>
                        <div class="winner-status">WINNER</div>
                        ${
                          showVoteCounts && winner
                            ? `
                          <div style="margin-top: 8px; color: #4a5568; font-size: 14px;">
                            Votes: <strong>${winner.votes}</strong>
                          </div>
                        `
                            : ''
                        }
                      </div>
                     
                    </div>
                  `;
                } else {
                  // Show all candidates format
                  const tableHeaders = showVoteCounts
                    ? '<th>Candidate</th><th>Votes</th><th>Status</th>'
                    : '<th>Candidate</th><th>Status</th>';

                  return `
                    <div class="poll-section">
                      <div class="poll-title">${poll.question}</div>
                      <table class="results-table">
                        <thead>
                          <tr>
                            ${tableHeaders}
                          </tr>
                        </thead>
                        <tbody>
                          ${sortedOptions
                            .map((option, index) => {
                              const isWinner = index === 0 && option.votes > 0;
                              const votesCell = showVoteCounts
                                ? `<td class="vote-count">${option.votes}</td>`
                                : '';

                              return `
                                <tr class="${isWinner ? 'winner-row' : ''}">
                                  <td class="candidate-name">${option.text}</td>
                                  ${votesCell}
                                  <td class="winner-indicator">${
                                    isWinner ? 'WINNER' : ''
                                  }</td>
                                </tr>
                              `;
                            })
                            .join('')}
                        </tbody>
                      </table>
                      
                    </div>
                  `;
                }
              })
              .join('')}
            
            <div class="summary-section">
              <div class="summary-title">Election Summary</div>
              <p><strong>Total Positions:</strong> ${
                pollsWithResults.length
              }</p>
              ${
                showVoteCounts
                  ? `
                <p><strong>Overall Voter Participation:</strong> ${pollsWithResults.reduce(
                  (sum, poll) => {
                    return (
                      sum +
                      poll.options.reduce(
                        (pollSum, option) => pollSum + option.votes,
                        0
                      )
                    );
                  },
                  0
                )} total votes across all positions</p>
              `
                  : ''
              }
              <p><strong>Election Status:</strong> Completed</p>
            </div>
            
            <div class="footer">
              <p>This document contains the official results of the Student Council Election</p>
              <p>Generated by VoteAble Election System | Aga Khan High School, Kampala</p>
            </div>
          </body>
        </html>
      `;

      // Create a new window with the HTML content
      const printWindow = window.open('', '_blank');
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Wait for content to load, then trigger print dialog
      setTimeout(() => {
        printWindow.print();
        setIsGenerating(false);
      }, 1000);
    } catch (error) {
      console.error('Error generating PDF:', error);
      setIsGenerating(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '8px',
          maxWidth: '500px',
          width: '90%',
          textAlign: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
        }}
      >
        <h2 style={{ color: '#1a202c', marginBottom: '15px' }}>
          Generate Election Results PDF
        </h2>
        <p style={{ color: '#4a5568', marginBottom: '25px' }}>
          Configure your PDF settings and generate an official document
          containing results for all {polls.length} Student Council positions.
        </p>

        {/* Admin Options */}
        <div
          style={{
            textAlign: 'left',
            marginBottom: '25px',
            backgroundColor: '#f8f9fa',
            padding: '20px',
            borderRadius: '6px',
            border: '1px solid #e9ecef',
          }}
        >
          <h4
            style={{ color: '#1a202c', marginBottom: '15px', fontSize: '16px' }}
          >
            PDF Display Options
          </h4>

          {/* Show Only Winner Option */}
          <div style={{ marginBottom: '15px' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#2d3748',
              }}
            >
              <input
                type="checkbox"
                checked={showOnlyWinner}
                onChange={(e) => setShowOnlyWinner(e.target.checked)}
                style={{
                  marginRight: '10px',
                  transform: 'scale(1.2)',
                  accentColor: '#2c5282',
                }}
              />
              Show only winners (hide losing candidates)
            </label>
          </div>

          {/* Show Vote Counts Option */}
          <div style={{ marginBottom: '0' }}>
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                color: '#2d3748',
              }}
            >
              <input
                type="checkbox"
                checked={showVoteCounts}
                onChange={(e) => setShowVoteCounts(e.target.checked)}
                style={{
                  marginRight: '10px',
                  transform: 'scale(1.2)',
                  accentColor: '#2c5282',
                }}
              />
              Display vote counts
            </label>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            style={{
              backgroundColor: isGenerating ? '#a0aec0' : '#2c5282',
              color: 'white',
              border: 'none',
              padding: '12px 25px',
              fontSize: '14px',
              fontWeight: 'bold',
              borderRadius: '6px',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            {isGenerating ? 'Generating PDF...' : 'Generate PDF'}
          </button>

          <button
            onClick={onClose}
            disabled={isGenerating}
            style={{
              backgroundColor: '#718096',
              color: 'white',
              border: 'none',
              padding: '12px 25px',
              fontSize: '14px',
              fontWeight: 'bold',
              borderRadius: '6px',
              cursor: isGenerating ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s',
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

function MyPolls() {
  const navigate = useNavigate();
  const [signupFirstErr, setSignupFirstErr] = useState(false);
  const [error, setError] = useState('');
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [HAR, setHAR] = useState(null); // null = loading, true = admin, false = not admin
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false); // Track if initial data load is complete

  useEffect(() => {
    const myPolls = async () => {
      setIsLoading(true);
      setDataLoaded(false);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/v1/myPolls`,
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

        // Handle all state updates together after getting the response
        if (res.ok && data.data) {
          const sortedPolls = data.data.sort((a, b) => {
            const rankA = Number(a.rank);
            const rankB = Number(b.rank);
            return rankA - rankB;
          });

          setPolls(sortedPolls);
          console.log(sortedPolls);
        }

        // Set HAR based on the response message
        if (data.message === 'You do not have admin access') {
          setHAR(false);
        } else if (data.message === 'You have admin access') {
          setHAR(true);
        } else {
          // Fallback if message is unexpected
          setHAR(false);
        }

        if (data.error) {
          setError(data.error);
          setHAR(false); // Set HAR to false on error
        }
      } catch (error) {
        console.error('Error fetching polls:', error);
        setError('Failed to load polls');
        setHAR(false); // Set HAR to false on error
      } finally {
        setIsLoading(false);
        setDataLoaded(true);
      }
    };

    if (localStorage.getItem('name')) {
      setSignupFirstErr(false);
      myPolls();
    } else {
      setSignupFirstErr(true);
      setIsLoading(false);
      setDataLoaded(true);
      setHAR(false);
    }
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

  // Show loading spinner while data is loading
  if (isLoading || !dataLoaded) {
    return (
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
    );
  }

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
        {dataLoaded && HAR === true && polls.length > 0 && (
          <div data-bs-touch="false">
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
                  <Results
                    pollId={poll._id}
                    handleNext={handleNextResults}
                    handleBack={handleBack}
                  />
                </Carousel.Item>
              ))}
            </Carousel>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'flex-start',
                width: '100vw',
                marginBottom: '20px',
              }}
            >
              <button
                className="vote-button"
                style={{ margin: 0 }}
                onClick={() => setShowPDFModal(true)}
              >
                Download Results
              </button>
            </div>

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
        {dataLoaded && HAR === false && polls.length > 0 && (
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
        )}
        {dataLoaded && !polls.length && !error && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '100px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                margin: '20px',
                textAlign: 'center',
                maxWidth: '400px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {/* Icon or illustration */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#f0f4f8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  border: '2px dashed #cbd5e0',
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#718096"
                  strokeWidth="2"
                >
                  <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4" />
                  <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <path d="M8 17l4-4 4 4" />
                </svg>
              </div>

              <h2
                style={{
                  color: '#2d3748',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  margin: 0,
                }}
              >
                No Polls Available
              </h2>

              <p
                style={{
                  color: '#718096',
                  fontSize: '16px',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  margin: 0,
                }}
              >
                There are currently no active polls or elections available for
                you to participate in.
              </p>

              <div
                style={{
                  backgroundColor: '#edf2f7',
                  padding: '16px',
                  borderRadius: '8px',
                  marginTop: '20px',
                  width: '100%',
                }}
              >
                <p
                  style={{
                    color: '#4a5568',
                    fontSize: '14px',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  📅 Check back later for upcoming Student Council elections and
                  voting opportunities.
                </p>
              </div>

              {/* Optional: Add a button to refresh or go back */}
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: '20px',
                  backgroundColor: '#4299e1',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = '#3182ce')
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = '#4299e1')
                }
              >
                Refresh Page
              </button>
            </div>
          </div>
        )}
        {dataLoaded && !polls.length && error && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '100px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '40px 20px',
                backgroundColor: 'white',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                margin: '20px',
                textAlign: 'center',
                maxWidth: '400px',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            >
              {/* Icon or illustration */}
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#f0f4f8',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  border: '2px dashed #cbd5e0',
                }}
              >
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#718096"
                  strokeWidth="2"
                >
                  <path d="M9 11H5a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2h-4" />
                  <path d="M9 7V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3" />
                  <line x1="12" y1="11" x2="12" y2="17" />
                  <path d="M8 17l4-4 4 4" />
                </svg>
              </div>

              <h2
                style={{
                  color: '#2d3748',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  marginBottom: '12px',
                  margin: 0,
                }}
              >
                {error && error === 'Student account does not exist'
                  ? 'Student account does not exist'
                  : error}
              </h2>

              <p
                style={{
                  color: '#718096',
                  fontSize: '16px',
                  lineHeight: '1.5',
                  marginBottom: '20px',
                  margin: 0,
                }}
              >
                There are currently no active polls or elections available for
                you to participate in.
              </p>

              <div
                style={{
                  backgroundColor: '#edf2f7',
                  padding: '16px',
                  borderRadius: '8px',
                  marginTop: '20px',
                  width: '100%',
                }}
              >
                <p
                  style={{
                    color: '#4a5568',
                    fontSize: '14px',
                    margin: 0,
                    lineHeight: '1.4',
                  }}
                >
                  📅 Check back later for upcoming Student Council elections and
                  voting opportunities.
                </p>
              </div>

              {/* Optional: Add a button to refresh or go back */}
              <button
                onClick={() => window.location.reload()}
                style={{
                  marginTop: '20px',
                  backgroundColor: '#4299e1',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = '#3182ce')
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = '#4299e1')
                }
              >
                Refresh Page
              </button>
            </div>
          </div>
        )}
        {/* PDF Modal - only show if data is loaded */}
        {dataLoaded && showPDFModal && (
          <ElectionResultsPDF
            polls={polls}
            onClose={() => setShowPDFModal(false)}
          />
        )}
      </div>
    </div>
  );
}

export default MyPolls;
