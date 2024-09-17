import React, { useEffect, useState, useRef } from 'react';
import Header from '../../../components/Header/Header.jsx';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import './CreatePoll.css';

function CreatePoll() {
  const [options, setOptions] = useState([]);
  const [questionErr, setQuestionErr] = useState(null);
  const [optionErr, setOptionErr] = useState(null);
  const [question, setQuestion] = useState('');
  const [formClosed, setFormClosed] = useState(false);
  const [option, setOption] = useState('');
  const [fileErr, setFileErr] = useState(null);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedHouse, setSelectedHouse] = useState('');
  const [pollClass, setPollClass] = useState('');
  const [pollHouse, setPollHouse] = useState('');
  const [optionClass, setOptionClass] = useState('');
  const [optionHouse, setOptionHouse] = useState('');

  const handleClassChange = (event) => {
    setPollClass(event.target.value);
  };

  const handleHouseChange = (event) => {
    setPollHouse(event.target.value);
  };

  const handleOptionClassChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].class = event.target.value;
    setOptions(newOptions);
  };

  const handleOptionHouseChange = (event, index) => {
    const newOptions = [...options];
    newOptions[index].house = event.target.value;
    setOptions(newOptions);
  };

  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, []);

  const handleQuestionChange = (e) => {
    setQuestionErr(null);
    setQuestion(e.target.value);
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setOptionErr(null);
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage && selectedImage.type.includes('image/')) {
      setImage(selectedImage);
      setFileErr(null);
    } else {
      setImage(null);
      setFileErr('Please upload an image!');
    }
  };

  const handleUseQuestion = (e) => {
    e.preventDefault();
    if (question) {
      setFormClosed(true);
    } else {
      setQuestionErr('Enter a question');
    }
  };

  const handleAddOption = (e) => {
    e.preventDefault();
    if (!option) {
      setOptionErr('Enter an option');
      return;
    }

    const updatedOptions = [...options];
    updatedOptions.push({
      option,
      image,
      class: optionClass,
      house: optionHouse,
    });
    setOptions(updatedOptions);
    setOption('');
    setOptionClass('');
    setOptionHouse('');

    if (image) {
      const updatedImages = [...images];
      updatedImages.push(image);
      setImages(updatedImages);
      setImage(null);
      inputRef.current.value = null;
    }

    // if (updatedOptions.length < 2) {
    //   setOptionErr('Enter another option');
    // }
  };

  const createPoll = async () => {
    const finalOptions = options.map((opt) => ({
      text: opt.option,
      photo: opt.image ? opt.image.name : undefined,
      class: opt.class,
      house: opt.house,
    }));

    try {
      const res = await fetch(
        'https://voteable-backend.onrender.com/v1/create-poll',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            question,
            options: finalOptions,
            owner: {
              name: localStorage.getItem('name'),
              password: localStorage.getItem('password'),
              gender: localStorage.getItem('gender'),
            },
            class: pollClass,
            house: pollHouse,
          }),
        }
      );

      if (res.ok) {
        navigate('/polls');
      } else {
        const data = await res.json();
        if (data.error === 'You have to login / signup to create a poll') {
          setOptionErr('You have to login to create a poll');
        }
      }
    } catch (error) {
      console.error('Error creating poll:', error);
    }
  };

  return (
    <div
      className="joinOuterContainer"
      style={{
        backgroundImage: 'linear-gradient(180deg,#17005c, #4600b6)',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      {/* <Header /> */}
      <div className="form" style={{ marginTop: '75px' }}>
        <h1 style={{ marginBottom: '5px' }}>Create Poll</h1>
        <h2>{question}</h2>
        {!formClosed ? (
          <form onSubmit={handleUseQuestion}>
            <input
              type="text"
              placeholder="Question"
              className="qInput"
              value={question}
              style={{ fontSize: '17px' }}
              onChange={handleQuestionChange}
              onBlur={() => {
                if (!question) {
                  setQuestionErr('Enter a question');
                }
              }}
            />
            {questionErr && <p className="passp">{questionErr}</p>}
            <button className="button mt-20">Use question</button>
          </form>
        ) : null}
        {formClosed ? (
          <form onSubmit={handleAddOption}>
            <ol type="1">
              {options.map((option, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginBottom: '15px',
                  }}
                >
                  {option.image && (
                    <img
                      className="optionImg"
                      src={URL.createObjectURL(option.image)}
                      alt="Option Image"
                      style={{ maxWidth: '100px', marginBottom: '10px' }}
                    />
                  )}
                  <li style={{ marginLeft: '25px', marginBottom: '5px' }}>
                    {option.option}
                  </li>
                  <select
                    value={option.class}
                    onChange={(event) => handleOptionClassChange(event, index)}
                    className="joinInput mt-10"
                    style={{
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '16px',
                      width: '100%',
                      marginBottom: '5px',
                    }}
                  >
                    <option value="">Select a class</option>
                    <option value="N/A">N/A</option>
                    <option value="Y7">Y7</option>
                    <option value="Y8">Y8</option>
                    <option value="Y9">Y9</option>
                    <option value="Y10">Y10</option>
                    <option value="Y11">Y11</option>
                    <option value="IB1">IB1</option>
                    <option value="IB2">IB2</option>
                    {/* <option value="N/A">N/A</option>
                    <option value="S1S">S1S</option>
                    <option value="S1N">S1N</option>
                    <option value="S2S">S2S</option>
                    <option value="S2N">S2N</option>
                    <option value="S3S">S3S</option>
                    <option value="S3N">S3N</option>
                    <option value="S4S">S4S</option>
                    <option value="S4N">S4N</option>
                    <option value="S5S">S5S</option>
                    <option value="S5A">S5A</option>
                    <option value="S6S">S6S</option>
                    <option value="S6A">S6A</option> */}
                  </select>
                  <select
                    value={option.house}
                    onChange={(event) => handleOptionHouseChange(event, index)}
                    className="joinInput"
                    style={{
                      padding: '8px',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '16px',
                      width: '100%',
                    }}
                  >
                    <option value="">Select a house</option>
                    <option value="N/A">N/A</option>
                    <option value="Hawks">Hawks</option>
                    <option value="Falcons">Falcons</option>
                    <option value="Eagles">Eagles</option>
                    <option value="Kites">Kites</option>
                  </select>
                </div>
              ))}
            </ol>
            <input
              type="text"
              placeholder="Option"
              style={{ fontSize: '17px' }}
              className="qInput"
              value={option}
              onBlur={() => {
                if (!option && options.length < 2) {
                  setOptionErr('Enter an option');
                }
              }}
              onChange={handleOptionChange}
            />
            <div className="fileUpload">
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Control
                  type="file"
                  onChange={handleImageChange}
                  ref={inputRef}
                  name="my-file"
                />
              </Form.Group>
            </div>
            {optionErr && <p className="passp">{optionErr}</p>}
            {fileErr && <p className="passp">{fileErr}</p>}
            <button className="button mt-20">Add option</button>
          </form>
        ) : null}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '15px',
          }}
        >
          <select
            id="classDropdown"
            value={pollClass}
            onChange={handleClassChange}
            className="joinInput mt-10"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              width: '100%',
            }}
          >
            <option value="">Select a class</option>
            <option value="N/A">N/A</option>
            <option value="Y7">Y7</option>
            <option value="Y8">Y8</option>
            <option value="Y9">Y9</option>
            <option value="Y10">Y10</option>
            <option value="Y11">Y11</option>
            <option value="IB1">IB1</option>
            <option value="IB2">IB2</option>
            {/* <option value="">Select a class</option>
            <option value="N/A">N/A</option>
            <option value="S1S">S1S</option>
            <option value="S1N">S1N</option>
            <option value="S2S">S2S</option>
            <option value="S2N">S2N</option>
            <option value="S3S">S3S</option>
            <option value="S3N">S3N</option>
            <option value="S4S">S4S</option>
            <option value="S4N">S4N</option>
            <option value="S5S">S5S</option>
            <option value="S5A">S5A</option>
            <option value="S6S">S6S</option>
            <option value="S6A">S6A</option> */}
          </select>
          <select
            id="houseDropdown"
            value={pollHouse}
            onChange={handleHouseChange}
            className="joinInput mt-10"
            style={{
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '16px',
              width: '100%',
            }}
          >
            <option value="">Select a house</option>
            <option value="N/A">N/A</option>
            <option value="Hawks">Hawks</option>
            <option value="Falcons">Falcons</option>
            <option value="Eagles">Eagles</option>
            <option value="Kites">Kites</option>
          </select>
        </div>
        <button
          className="button mt-20"
          onClick={() => {
            if (!question) {
              setQuestionErr('Enter a question');
            }
            if (!option && options.length > 0) {
              setOptionErr('');
            }

            // if (options.length < 2) {
            //   setOptionErr('You need to add more than 1 option');
            // }

            if (!pollClass) setOptionErr('Please select a class for the poll');
            if (!pollHouse) setOptionErr('Please select a house for the poll');

            createPoll();
          }}
        >
          Create Poll
        </button>
      </div>
    </div>
  );
}

export default CreatePoll;
