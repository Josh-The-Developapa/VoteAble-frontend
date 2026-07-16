/**
 * src/Components/Results/Results.jsx
 * ---------------------------------------------------------------------------
 * `/v1/results/:pollId` is fetched via `apiFetch` instead of a bare `fetch`.
 * This is an admin-only backend route (`protect` + `requireAdmin`), so it
 * needs the session cookie — a raw `fetch` call with no `credentials`
 * option would not have sent it. `Student_ID` is no longer sent in the
 * body; the admin's identity comes from their session.
 *
 * Bar colors: replaced the fixed brand palette with a randomized,
 * vibrant palette generated fresh on every mount (i.e. every refresh).
 * Hues are evenly spaced around the color wheel with random jitter so
 * bars stay distinct from each other but the overall look changes
 * each time.
 */

import React, { useState, useEffect } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { apiFetch } from '../../utils/api';
import './Results.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);
ChartJS.defaults.plugins.legend.display = false;
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;

/**
 * Generates `count` vibrant, visually distinct HSL colors.
 * Hues are evenly spaced around the wheel (360 / count) with a random
 * offset + per-slot jitter so the palette differs on every call, while
 * saturation/lightness stay in a "vibrant but readable on white" band.
 */
function generateVibrantPalette(count) {
  if (count <= 0) return [];

  const hueStep = 360 / count;
  const hueOffset = Math.random() * 360;

  return Array.from({ length: count }, (_, i) => {
    const jitter = (Math.random() - 0.5) * hueStep * 0.6;
    const hue = (hueOffset + i * hueStep + jitter + 360) % 360;
    const saturation = 65 + Math.random() * 25; // 65–90%
    const lightness = 45 + Math.random() * 12; // 45–57%
    return `hsl(${hue.toFixed(1)}, ${saturation.toFixed(0)}%, ${lightness.toFixed(0)}%)`;
  });
}

function Results(props) {
  const pollId = props.pollId;
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [pollNotFound, setPollNotFound] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [dataLoaded, setDataLoaded] = useState(false);
  // One palette per mount — regenerated on every refresh/page load.
  const [barColors, setBarColors] = useState([]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    async function fetchResults() {
      setIsLoading(true);
      setDataLoaded(false);

      const res = await apiFetch(`/v1/results/${pollId}`, { method: 'POST' });
      const data = await res.json();

      if (data.error) {
        setPollNotFound(data.error);
        setIsLoading(false);
      } else {
        setQuestion(data.data.question);
        setOptions(data.data.options);
        setBarColors(generateVibrantPalette(data.data.options.length));
        setTimeout(() => {
          setDataLoaded(true);
          setIsLoading(false);
        }, 100);
      }
    }

    fetchResults();
  }, [pollId]);

  // Derive winner
  const winner = options.length
    ? [...options].sort((a, b) => b.votes - a.votes)[0]
    : null;

  const chartData = {
    labels: options.map((o) => o.text),
    datasets: [
      {
        label: 'Votes',
        data: options.map((o) => o.votes),
        backgroundColor: options.map(
          (_, i) => barColors[i] || barColors[i % (barColors.length || 1)],
        ),
        borderRadius: 0,
        borderSkipped: false,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.raw} vote${ctx.raw !== 1 ? 's' : ''}`,
        },
        backgroundColor: '#0f0c29',
        titleFont: { family: 'Kumbh Sans', size: 13 },
        bodyFont: { family: 'Kumbh Sans', size: 14, weight: '600' },
        padding: 10,
        cornerRadius: 8,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#888',
          font: { family: 'Kumbh Sans', size: 13 },
          stepSize: 1,
        },
        grid: { color: 'rgba(0,0,0,0.06)' },
        border: { dash: [4, 4] },
      },
      x: {
        ticks: {
          color: '#333',
          font: { family: 'Kumbh Sans', size: 13, weight: '600' },
          maxRotation: 30,
        },
        grid: { display: false },
      },
    },
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
          background: '#f7f7f9',
        }}
      >
        <Spinner animation="grow" style={{ color: '#312783' }} />
      </div>
    );
  }

  if (pollNotFound) {
    return (
      <div className="poll-not-found">
        <h2>{pollNotFound}</h2>
      </div>
    );
  }

  return (
    <div className="results-container">
      {options && dataLoaded && (
        <div className="poll-results">
          <p className="results-eyebrow">Election Results</p>
          <h1 className="poll-question">{question}</h1>
          <p className="poll-info">Hover over bars to see vote counts</p>

          <div className="results-divider" />

          <div className="bar-chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>

          <div className="buttonContainer">
            <button
              onClick={() => props.handleBack()}
              className="vote-button"
              style={{
                background: 'transparent',
                color: '#312783',
                border: '1.5px solid rgba(49,39,131,0.3)',
              }}
            >
              ← Back
            </button>
            <button className="vote-button" onClick={props.handleNext}>
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Results;
