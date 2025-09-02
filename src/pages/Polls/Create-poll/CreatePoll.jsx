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
      text: option,
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
  };

  const createPoll = async () => {
    if (!question) {
      setQuestionErr('Enter a question');
      return;
    }

    if (options.length === 0) {
      setOptionErr('Add at least one option');
      return;
    }

    if (!pollClass) {
      setOptionErr('Please select a class for the poll');
      return;
    }

    if (!pollHouse) {
      setOptionErr('Please select a house for the poll');
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();

    // Add basic poll data
    formData.append('question', question);
    formData.append('class', pollClass);
    formData.append('house', pollHouse);

    // Add owner information
    const owner = {
      name: localStorage.getItem('name'),
      password: localStorage.getItem('password'),
    };
    formData.append('owner', JSON.stringify(owner));

    // Prepare options data (without images)
    const finalOptions = options.map((opt) => ({
      text: opt.text,
      class: opt.class,
      house: opt.house,
    }));
    formData.append('options', JSON.stringify(finalOptions));

    // Add images with specific field names
    options.forEach((opt, index) => {
      if (opt.image) {
        formData.append(`option-${index}-image`, opt.image);
      }
    });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/create-poll`,
        {
          method: 'POST',
          body: formData, // Don't set Content-Type header, let browser set it with boundary
        }
      );

      if (res.ok) {
        navigate('/polls');
      } else {
        const data = await res.json();
        if (data.error === 'You have to login / signup to create a poll') {
          setOptionErr('You have to login to create a poll');
        } else {
          setOptionErr(data.error || 'Failed to create poll');
        }
      }
    } catch (error) {
      console.error('Error creating poll:', error);
      setOptionErr('Network error. Please try again.');
    }
  };

  const removeOption = (indexToRemove) => {
    const updatedOptions = options.filter(
      (_, index) => index !== indexToRemove
    );
    setOptions(updatedOptions);

    // Also remove corresponding image from images array
    const updatedImages = images.filter((_, index) => index !== indexToRemove);
    setImages(updatedImages);
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
                    padding: '10px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  }}
                >
                  {option.image && (
                    <img
                      className="optionImg"
                      src={URL.createObjectURL(option.image)}
                      alt="Option Image"
                      style={{
                        maxWidth: '100px',
                        maxHeight: '100px',
                        marginBottom: '10px',
                        borderRadius: '4px',
                      }}
                    />
                  )}
                  <li
                    style={{
                      marginLeft: '25px',
                      marginBottom: '5px',
                      color: 'white',
                    }}
                  >
                    {option.text}
                  </li>
                  <div
                    style={{
                      fontSize: '12px',
                      color: '#ccc',
                      marginBottom: '5px',
                    }}
                  >
                    Class: {option.class || 'Not specified'} | House:{' '}
                    {option.house || 'Not specified'}
                  </div>
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    style={{
                      backgroundColor: '#ff4444',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '4px',
                      fontSize: '12px',
                      cursor: 'pointer',
                      marginTop: '5px',
                    }}
                  >
                    Remove Option
                  </button>
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
                <Form.Label style={{ color: 'white' }}>
                  Upload Image for this option (optional)
                </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={inputRef}
                  name="my-file"
                />
              </Form.Group>
            </div>
            <select
              value={optionClass}
              onChange={(e) => setOptionClass(e.target.value)}
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
              <option value="">Select a class for this option</option>
              <option value="N/A">N/A</option>
              <option value="Y7">Y7</option>
              <option value="Y8">Y8</option>
              <option value="Y9">Y9</option>
              <option value="Y10">Y10</option>
              <option value="Y11">Y11</option>
              <option value="IB1">IB1</option>
              <option value="IB2">IB2</option>
            </select>
            <select
              value={optionHouse}
              onChange={(e) => setOptionHouse(e.target.value)}
              className="joinInput"
              style={{
                padding: '8px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '16px',
                width: '100%',
              }}
            >
              <option value="">Select a house for this option</option>
              <option value="N/A">N/A</option>
              <option value="HAWKS">HAWKS</option>
              <option value="FALCONS">FALCONS</option>
              <option value="EAGLES">EAGLES</option>
              <option value="KITES">KITES</option>
            </select>
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
            <option value="">Select a class for the poll</option>
            <option value="N/A">N/A</option>
            <option value="Y7">Y7</option>
            <option value="Y8">Y8</option>
            <option value="Y9">Y9</option>
            <option value="Y10">Y10</option>
            <option value="Y11">Y11</option>
            <option value="IB1">IB1</option>
            <option value="IB2">IB2</option>
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
            <option value="">Select a house for the poll</option>
            <option value="N/A">N/A</option>
            <option value="HAWKS">HAWKS</option>
            <option value="FALCONS">FALCONS</option>
            <option value="EAGLES">EAGLES</option>
            <option value="KITES">KITES</option>
          </select>
        </div>
        <button className="button mt-20" onClick={createPoll}>
          Create Poll
        </button>
      </div>
    </div>
  );
}

export default CreatePoll;
