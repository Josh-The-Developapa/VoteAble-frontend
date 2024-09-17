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
import './Results.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.plugins.legend.position = 'bottom';
ChartJS.defaults.color = 'black';
ChartJS.defaults.layout.padding = 10;
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;
ChartJS.defaults.plugins.legend.maxHeight = 1000;
ChartJS.defaults.plugins.legend.maxWidth = 100;
ChartJS.defaults.plugins.tooltip.boxPadding = 5;

function Results(props) {
  const pollId = props.pollId;
  const [question, setQuestion] = useState();
  const [options, setOptions] = useState();
  const [pollNotFound, setPollNotFound] = useState();
  const [isLoading, setIsLoading] = useState(false);

  function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    async function poll() {
      setIsLoading(true);

      const res = await fetch(
        `https://voteable-backend.onrender.com/v1/results/${pollId}`,
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

      setIsLoading(false);
      const data = await res.json();
      if (data.error) {
        setPollNotFound(data.error);
        return;
      } else {
        setQuestion(data.data.question);
        setOptions(data.data.options);
      }
    }
    poll();
  }, [pollId]);

  const data = {
    labels: options ? options.map((opt) => opt.text) : [],
    datasets: [
      {
        label: 'Votes',
        data: options ? options.map((opt) => opt.votes) : [],
        backgroundColor: options ? options.map(() => getRandomColor()) : [],
        borderColor: 'rgba(0,0,0,0.1)',
        borderWidth: 1,
      },
    ],
  };

  const optionsBar = {
    plugins: {
      legend: {
        display: false, // Hide legend since we want the labels in tooltips only
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.raw} votes`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'black',
          font: {
            family: 'Kumbh Sans', // Change this to your desired font
            size: 16, // Change the size for y-axis units
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        ticks: {
          color: 'black',
          font: {
            family: 'Kumbh Sans', // Change this to your desired font
            size: 16, // Change the size for x-axis labels
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="results-container">
      {isLoading ? (
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
      ) : pollNotFound ? (
        <div className="poll-not-found">
          <h1>{pollNotFound}</h1>
        </div>
      ) : (
        options && (
          <div className="poll-results">
            <h1 className="poll-question">{question}</h1>
            <p className="poll-info">
              Hover over the bars to see the votes for each candidate
            </p>
            <p className="poll-info" style={{ marginTop: '-5px' }}>
              Refresh the page to change the bar colors
            </p>
            <div className="bar-chart-container">
              <Bar data={data} options={optionsBar} />
            </div>

            <div className="buttonContainer">
              <button
                onClick={() => props.handleBack()}
                className="vote-button"
              >
                Back
              </button>

              <button className="vote-button" onClick={props.handleNext}>
                Next
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Results;
