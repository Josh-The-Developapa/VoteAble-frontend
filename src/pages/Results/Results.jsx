import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./Results.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.plugins.legend.position = "bottom";
ChartJS.defaults.color = "black";
ChartJS.defaults.layout.padding = 10;
ChartJS.defaults.responsive = true;
ChartJS.defaults.maintainAspectRatio = false;

function Results(props) {
  const pollId = props.pollId;
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [pollNotFound, setPollNotFound] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to generate random colors for the chart bars
  function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    // Define an async function to fetch poll data
    async function fetchPollData() {
      setIsLoading(true);
      try {
        // Fetch poll data from the API
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

        const pollData = await res.json();

        if (!pollData.success) {
          setPollNotFound(pollData.error);
        } else {
          setQuestion(pollData.data.question);
          setOptions(pollData.data.options);
        }
      } catch (error) {
        setPollNotFound("An error occurred while fetching poll data");
      } finally {
        setIsLoading(false);
      }
    }

    fetchPollData();
  }, [pollId]);

  // Prepare data for the chart
  const data = {
    labels: options.map((opt) => opt.name),
    datasets: [
      {
        label: "Votes",
        data: options.map((opt) => opt.votes),
        backgroundColor: options.map(() => getRandomColor()),
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const optionsBar = {
    plugins: {
      legend: {
        display: false, // Hide legend
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
          color: "black",
          font: {
            family: "Kumbh Sans",
            size: 16,
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
      x: {
        ticks: {
          color: "black",
          font: {
            family: "Kumbh Sans",
            size: 16,
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
      ) : pollNotFound ? (
        <div className="poll-not-found">
          <h1>{pollNotFound}</h1>
        </div>
      ) : (
        options.length > 0 && (
          <div className="poll-results">
            <h1 className="poll-question">{question}</h1>
            <p className="poll-info">
              Hover over the bars to see the votes for each candidate
            </p>
            <p className="poll-info" style={{ marginTop: "-5px" }}>
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
