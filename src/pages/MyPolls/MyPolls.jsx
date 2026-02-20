import React, { useEffect, useRef, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { useNavigate } from 'react-router-dom';
import PollSVG from '../../assets/Poll.svg';
import Poll from '../Polls/Poll/Poll.jsx';
import Results from '../Results/Results.jsx';
import './MyPolls.css';

// PDF Generator Component
const ElectionResultsPDF = ({ polls = [], onClose }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOnlyWinner, setShowOnlyWinner] = useState(false);
  const [showVoteCounts, setShowVoteCounts] = useState(true);

  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      const pollsWithResults = await Promise.all(
        polls.map(async (poll) => {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/v1/results/${poll._id}`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                Student_ID: localStorage.getItem('Student_ID'),
              }),
            },
          );
          const data = await res.json();
          return {
            _id: poll._id,
            question: data.data.question,
            options: data.data.options,
          };
        }),
      );

      const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <title>Student Council Election Results</title>
            <style>
  body { font-family: 'Arial', sans-serif; background-color: whitesmoke; margin: 0; padding: 12px; line-height: 1.3; font-size: 13px; }
  .header { text-align: center; margin-bottom: 18px; border-bottom: 2px solid #2D1B69; padding-bottom: 10px; }
  .school-name { font-size: 18px; font-weight: bold; color: #1a202c; margin: 6px 0; }
  .election-title { font-size: 16px; color: #2D1B69; margin: 3px 0; }
  .date-info { font-size: 12px; color: #4a5568; margin-top: 5px; }
  .poll-section { background-color: white; margin: 12px 0; padding: 8px; border-radius: 6px; border: 1px solid #e2e8f0; break-inside: avoid; }
  .poll-title { font-size: 15px; font-weight: bold; color: #1a202c; margin-bottom: 3px; border-bottom: 1px solid #e2e8f0; padding-bottom: 5px; }
  .results-table { width: 100%; border-collapse: collapse; margin-top: 6px; font-size: 13px; }
  .results-table th { background-color: #f7fafc; color: #2d3748; padding: 6px; text-align: left; border: 1px solid #e2e8f0; font-weight: bold; }
  .results-table td { padding: 6px; border: 1px solid #e2e8f0; }
  .candidate-name { font-weight: 500; color: #1a202c; }
  .vote-count { text-align: center; font-weight: bold; color: #2c5282; }
  .winner-row { background-color: #f0fff4; }
  .winner-indicator { color: #38a169; font-weight: bold; }
  .winner-only-display { background-color: #f0fff4; padding: 8px; border-radius: 5px; border-left: 3px solid #38a169; margin-top: 6px; }
  .winner-name { font-size: 14px; font-weight: bold; color: #1a202c; margin-bottom: 3px; }
  .winner-status { color: #38a169; font-weight: bold; font-size: 12px; }
  .summary-section { background-color: white; margin-top: 18px; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0; font-size: 13px; }
  .summary-title { font-size: 15px; font-weight: bold; color: #1a202c; margin-bottom: 8px; }
  .footer { text-align: center; margin-top: 20px; padding-top: 10px; border-top: 1px solid #e2e8f0; color: #4a5568; font-size: 11px; }
  @media print { body { background-color: white !important; } .poll-section { box-shadow: none; } }
</style>
          </head>
          <body>
            <div class="header">
              <div style="display: flex; justify-content: center; align-items: center; gap: 12px; margin-bottom: 15px;">
                <img src="/Aga-Khan.png" alt="School Logo" style="height: 80px; object-fit: contain;" />
                <span style="font-size: 28px; font-weight: bold; color: #2c5282;">|</span>
                <img src="/VoteAble-Logo.png" alt="VoteAble Logo" style="height: 60px; object-fit: contain; opacity: 0.85;" />
              </div>
              <div class="school-name">Aga Khan High School, Kampala</div>
              <div class="election-title">Student Council Election Results</div>
              <div class="date-info">Generated on: ${new Date().toLocaleDateString(
                'en-US',
                {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                },
              )}</div>
            </div>
            ${pollsWithResults
              .map((poll) => {
                const sortedOptions = [...poll.options].sort(
                  (a, b) => b.votes - a.votes,
                );
                const winner = sortedOptions[0];
                if (showOnlyWinner) {
                  return `
                    <div class="poll-section">
                      <div class="poll-title">${poll.question}</div>
                      <div class="winner-only-display">
                        <div class="winner-name">${winner?.text || 'No Winner'}</div>
                        <div class="winner-status">WINNER</div>
                        ${showVoteCounts && winner ? `<div style="margin-top: 8px; color: #4a5568; font-size: 14px;">Votes: <strong>${winner.votes}</strong></div>` : ''}
                      </div>
                    </div>`;
                } else {
                  const tableHeaders = showVoteCounts
                    ? '<th>Candidate</th><th>Votes</th><th>Status</th>'
                    : '<th>Candidate</th><th>Status</th>';
                  return `
                    <div class="poll-section">
                      <div class="poll-title">${poll.question}</div>
                      <table class="results-table">
                        <thead><tr>${tableHeaders}</tr></thead>
                        <tbody>
                          ${sortedOptions
                            .map((option, index) => {
                              const isWinner = index === 0 && option.votes > 0;
                              const votesCell = showVoteCounts
                                ? `<td class="vote-count">${option.votes}</td>`
                                : '';
                              return `<tr class="${isWinner ? 'winner-row' : ''}"><td class="candidate-name">${option.text}</td>${votesCell}<td class="winner-indicator">${isWinner ? 'WINNER' : ''}</td></tr>`;
                            })
                            .join('')}
                        </tbody>
                      </table>
                    </div>`;
                }
              })
              .join('')}
            <div class="summary-section">
              <div class="summary-title">Election Summary</div>
              <p><strong>Total Positions:</strong> ${pollsWithResults.length}</p>
              ${showVoteCounts ? `<p><strong>Overall Voter Participation:</strong> ${pollsWithResults.reduce((sum, poll) => sum + poll.options.reduce((s, o) => s + o.votes, 0), 0)} total votes across all positions</p>` : ''}
              <p><strong>Election Status:</strong> Completed</p>
            </div>
            <div class="footer">
              <p>This document contains the official results of the Student Council Election</p>
              <p>Generated by VoteAble Election System | Aga Khan High School, Kampala</p>
            </div>
          </body>
        </html>
      `;

      const printWindow = window.open('', '_blank');
      printWindow.document.write(htmlContent);
      printWindow.document.close();
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
    <div className="pdf-modal-overlay">
      <div className="pdf-modal-card">
        <h2 className="pdf-modal-title">Generate Election Results PDF</h2>
        <p className="pdf-modal-desc">
          Configure your PDF settings and generate an official document
          containing results for all {polls.length} Student Council positions.
        </p>

        <div className="pdf-options">
          <h4 className="pdf-options-title">PDF Display Options</h4>
          <label className="pdf-option-label">
            <input
              type="checkbox"
              checked={showOnlyWinner}
              onChange={(e) => setShowOnlyWinner(e.target.checked)}
              className="pdf-checkbox"
            />
            Show only winners (hide losing candidates)
          </label>
          <label className="pdf-option-label">
            <input
              type="checkbox"
              checked={showVoteCounts}
              onChange={(e) => setShowVoteCounts(e.target.checked)}
              className="pdf-checkbox"
            />
            Display vote counts
          </label>
        </div>

        <div className="pdf-modal-actions">
          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="pdf-btn pdf-btn-primary"
          >
            {isGenerating ? 'Generating…' : 'Generate PDF'}
          </button>
          <button
            onClick={onClose}
            disabled={isGenerating}
            className="pdf-btn pdf-btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Shared empty-state card ────────────────────────────────────────
function EmptyState({ title, body }) {
  return (
    <div className="mypolls-empty-card">
      <div className="mypolls-empty-icon">
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
      <h2 className="mypolls-empty-title">{title}</h2>
      <p className="mypolls-empty-body">{body}</p>
      <div className="mypolls-empty-hint">
        📅 Check back later for upcoming Student Council elections and voting
        opportunities.
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mypolls-refresh-btn"
      >
        Refresh Page
      </button>
    </div>
  );
}

function MyPolls() {
  const navigate = useNavigate();
  const [signupFirstErr, setSignupFirstErr] = useState(false);
  const [error, setError] = useState('');
  const [polls, setPolls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [HAR, setHAR] = useState(null);
  const [showPDFModal, setShowPDFModal] = useState(false);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const myPolls = async () => {
      setIsLoading(true);
      setDataLoaded(false);

      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/v1/myPolls`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              Student_ID: localStorage.getItem('Student_ID'),
              password: localStorage.getItem('password'),
            }),
          },
        );

        const data = await res.json();

        if (res.ok && data.data) {
          const sortedPolls = data.data.sort(
            (a, b) => Number(a.rank) - Number(b.rank),
          );
          setPolls(sortedPolls);
        }

        if (data.message === 'You do not have admin access') setHAR(false);
        else if (data.message === 'You have admin access') setHAR(true);
        else setHAR(false);

        if (data.error) {
          setError(data.error);
          setHAR(false);
        }
      } catch (err) {
        console.error('Error fetching polls:', err);
        setError('Failed to load polls');
        setHAR(false);
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
    if (currentIndex + 1 === polls.length) navigate('/account');
    if (carouselRef.current) carouselRef.current.next();
  };
  const handleNextResults = () => {
    if (carouselRef.current) carouselRef.current.next();
  };
  const handleBack = () => {
    if (carouselRef.current) carouselRef.current.prev();
  };
  const handleSelect = (selectedIndex) => setCurrentIndex(selectedIndex);

  const progressPct = polls.length
    ? ((currentIndex + 1) / polls.length) * 100
    : 0;

  if (isLoading || !dataLoaded) {
    return (
      <div className="mypolls-loading">
        <Spinner animation="grow" />
      </div>
    );
  }

  return (
    <div className="mypolls-page">
      <img src={PollSVG} alt="" className="mypolls-bg-svg" aria-hidden="true" />

      {/* ── Not logged in ── */}
      {signupFirstErr && (
        <div className="pollc">
          <h1>Login First to access polls</h1>
          <p style={{ marginLeft: '10px', marginRight: '10px' }}>
            Please login with valid credentials to vote as a student of Aga Khan
            High School, Kampala. <br /> <br />
            Please end the shenanigans and stop gallivanting
          </p>
        </div>
      )}

      {/* ── Admin: Results view ── */}
      {dataLoaded && HAR === true && polls.length > 0 && (
        <>
          <Carousel
            ref={carouselRef}
            controls={false}
            touch={false}
            interval={null}
            onSelect={handleSelect}
            indicators={false}
            activeIndex={currentIndex}
          >
            {polls.map((poll) => (
              <Carousel.Item key={poll._id}>
                <Results
                  pollId={poll._id}
                  handleNext={handleNextResults}
                  handleBack={handleBack}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Sticky footer — progress + download */}
          <div className="mypolls-footer">
            <div className="mypolls-footer-inner">
              <div className="mypolls-progress-group">
                <span className="mypolls-caption">
                  {currentIndex + 1}
                  <span className="mypolls-caption-sep"> / </span>
                  {polls.length}
                </span>
                <div className="mypolls-progress-track">
                  <div
                    className="mypolls-progress-fill"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>

              <button
                className="vote-button mypolls-download-btn"
                onClick={() => setShowPDFModal(true)}
              >
                ↓ Download Results
              </button>
            </div>
          </div>
        </>
      )}

      {/* ── Student: Voting view ── */}
      {dataLoaded && HAR === false && polls.length > 0 && (
        <>
          <Carousel
            ref={carouselRef}
            controls={false}
            touch={false}
            interval={null}
            onSelect={handleSelect}
            indicators={false}
            activeIndex={currentIndex}
          >
            {polls.map((poll) => (
              <Carousel.Item key={poll._id}>
                <Poll
                  pollId={poll._id}
                  handleNext={handleNext}
                  handleBack={handleBack}
                />
              </Carousel.Item>
            ))}
          </Carousel>

          {/* Sticky footer — progress only */}
          <div className="mypolls-footer">
            <div className="mypolls-footer-inner mypolls-footer-centered">
              <div className="mypolls-progress-group">
                <span className="mypolls-caption">
                  {currentIndex + 1}
                  <span className="mypolls-caption-sep"> / </span>
                  {polls.length}
                </span>
                <div className="mypolls-progress-track">
                  <div
                    className="mypolls-progress-fill"
                    style={{ width: `${progressPct}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* ── Empty states ── */}
      {dataLoaded && !polls.length && !error && (
        <div className="mypolls-empty-wrapper">
          <EmptyState
            title="No Polls Available"
            body="There are currently no active polls or elections available for you to participate in."
          />
        </div>
      )}

      {dataLoaded && !polls.length && error && (
        <div className="mypolls-empty-wrapper">
          <EmptyState
            title={error}
            body="There are currently no active polls or elections available for you to participate in."
          />
        </div>
      )}

      {/* ── PDF Modal ── */}
      {dataLoaded && showPDFModal && (
        <ElectionResultsPDF
          polls={polls}
          onClose={() => setShowPDFModal(false)}
        />
      )}
    </div>
  );
}

export default MyPolls;
