import React, { useEffect, useState, useRef } from 'react';
import { ChevronRight, Plus, X, Upload, Check, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function CreatePoll() {
  const [currentStep, setCurrentStep] = useState(1);
  const [options, setOptions] = useState([]);
  const [questionErr, setQuestionErr] = useState(null);
  const [optionErr, setOptionErr] = useState(null);
  const [question, setQuestion] = useState('');
  const [option, setOption] = useState('');
  const [fileErr, setFileErr] = useState(null);
  const [image, setImage] = useState(null);
  const [pollClass, setPollClass] = useState('');
  const [pollHouse, setPollHouse] = useState('');
  const [optionClass, setOptionClass] = useState('');
  const [optionHouse, setOptionHouse] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const nextStep = () => {
    if (currentStep === 1) {
      if (!question.trim()) {
        setQuestionErr('Please enter a question');
        return;
      }
      if (!pollClass) {
        setQuestionErr('Please select a class for the poll');
        return;
      }
      if (!pollHouse) {
        setQuestionErr('Please select a house for the poll');
        return;
      }
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleAddOption = (e) => {
    e.preventDefault();
    if (!option.trim()) {
      setOptionErr('Please enter an option');
      return;
    }

    const newOption = {
      text: option,
      image,
      class: optionClass,
      house: optionHouse,
    };

    setOptions([...options, newOption]);
    setOption('');
    setOptionClass('');
    setOptionHouse('');
    setImage(null);
    if (inputRef.current) {
      inputRef.current.value = null;
    }
  };

  const removeOption = (indexToRemove) => {
    setOptions(options.filter((_, index) => index !== indexToRemove));
  };

  const createPoll = async () => {
    if (options.length < 2) {
      setOptionErr('Please add at least 2 options');
      return;
    }

    setIsSubmitting(true);

    try {
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
    } finally {
      setIsSubmitting(false);
    }
  };

  const classOptions = [
    { value: 'N/A', label: 'N/A' },
    { value: 'Y7', label: 'Year 7' },
    { value: 'Y8', label: 'Year 8' },
    { value: 'Y9', label: 'Year 9' },
    { value: 'Y10', label: 'Year 10' },
    { value: 'Y11', label: 'Year 11' },
    { value: 'IB1', label: 'IB Year 1' },
    { value: 'IB2', label: 'IB Year 2' },
  ];

  const houseOptions = [
    { value: 'N/A', label: 'N/A' },
    { value: 'HAWKS', label: 'Hawks' },
    { value: 'FALCONS', label: 'Falcons' },
    { value: 'EAGLES', label: 'Eagles' },
    { value: 'KITES', label: 'Kites' },
  ];

  return (
    <>
      <div className="create-poll-container">
        <div className="create-poll-wrapper">
          {/* Progress Indicator */}
          <div className="progress-container">
            <div className="progress-indicator">
              <div
                className={`progress-step ${currentStep >= 1 ? 'active' : ''}`}
              >
                {currentStep > 1 ? <Check size={20} /> : '1'}
              </div>
              <div
                className={`progress-line ${currentStep >= 2 ? 'active' : ''}`}
              ></div>
              <div
                className={`progress-step ${currentStep >= 2 ? 'active' : ''}`}
              >
                2
              </div>
            </div>
            <div className="progress-labels">
              <span>Poll Details</span>
              <span>Add Options</span>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="form-card">
            {currentStep === 1 ? (
              /* Step 1: Poll Setup */
              <div className="card-content">
                <div className="header-section">
                  <h1 className="main-title">Create Your Poll</h1>
                  <p className="subtitle">Let's start with the basics</p>
                </div>

                <div className="form-section">
                  <div className="form-group">
                    <label className="form-label">Poll Question *</label>
                    <textarea
                      value={question}
                      onChange={handleQuestionChange}
                      placeholder="What would you like to ask?"
                      className="form-textarea"
                      rows={3}
                    />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">Class *</label>
                      <select
                        value={pollClass}
                        onChange={(e) => setPollClass(e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select a class</option>
                        {classOptions.map((cls) => (
                          <option key={cls.value} value={cls.value}>
                            {cls.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">House *</label>
                      <select
                        value={pollHouse}
                        onChange={(e) => setPollHouse(e.target.value)}
                        className="form-select"
                      >
                        <option value="">Select a house</option>
                        {houseOptions.map((house) => (
                          <option key={house.value} value={house.value}>
                            {house.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {questionErr && (
                    <div className="error-message">
                      <p className="error-text">{questionErr}</p>
                    </div>
                  )}

                  <button onClick={nextStep} className="btn btn-primary">
                    Continue
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            ) : (
              /* Step 2: Add Options */
              <div className="card-content">
                <div className="step-header">
                  <button onClick={prevStep} className="back-button">
                    <ArrowLeft size={20} />
                    Back
                  </button>
                  <div className="question-display">
                    <h2 className="question-title">{question}</h2>
                    <p className="question-meta">
                      {pollClass} • {pollHouse}
                    </p>
                  </div>
                  <div className="spacer"></div>
                </div>

                {/* Current Options */}
                {options.length > 0 && (
                  <div className="options-section">
                    {/* <h3 className="section-title">
                      Poll Options ({options.length})
                    </h3> */}
                    <div className="options-list">
                      {options.map((opt, index) => (
                        <div key={index} className="option-item">
                          {opt.image && (
                            <img
                              src={URL.createObjectURL(opt.image)}
                              alt="Option"
                              className="option-image"
                            />
                          )}
                          <div className="option-content">
                            <p className="option-text">{opt.text}</p>
                            <p className="option-meta">
                              {opt.class || 'Any Class'} •{' '}
                              {opt.house || 'Any House'}
                            </p>
                          </div>
                          <button
                            onClick={() => removeOption(index)}
                            className="remove-button"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Add New Option Form */}
                <div className="add-option-section">
                  {/* <h3 className="section-title">Add New Option</h3> */}

                  <div className="option-form">
                    <div className="form-group">
                      <input
                        type="text"
                        value={option}
                        onChange={handleOptionChange}
                        placeholder="Enter option text"
                        className="form-input"
                        onKeyPress={(e) =>
                          e.key === 'Enter' && handleAddOption(e)
                        }
                      />
                    </div>

                    <div className="form-grid">
                      <select
                        value={optionClass}
                        onChange={(e) => setOptionClass(e.target.value)}
                        className="form-select"
                      >
                        <option value="">Any Class</option>
                        {classOptions.map((cls) => (
                          <option key={cls.value} value={cls.value}>
                            {cls.label}
                          </option>
                        ))}
                      </select>

                      <select
                        value={optionHouse}
                        onChange={(e) => setOptionHouse(e.target.value)}
                        className="form-select"
                      >
                        <option value="">Any House</option>
                        {houseOptions.map((house) => (
                          <option key={house.value} value={house.value}>
                            {house.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="file-upload-section">
                      <label className="form-label">
                        Option Image (Optional)
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={inputRef}
                        className="hidden-input"
                      />
                      <button
                        type="button"
                        onClick={() => inputRef.current?.click()}
                        className="file-upload-button"
                      >
                        <Upload size={24} />
                        <div className="file-upload-text">
                          {image ? image.name : 'Click to upload image'}
                        </div>
                      </button>
                      {fileErr && <p className="error-text small">{fileErr}</p>}
                    </div>

                    <button
                      onClick={handleAddOption}
                      className="btn btn-secondary"
                    >
                      <Plus size={20} />
                      Add Option
                    </button>
                  </div>
                </div>

                {optionErr && (
                  <div className="error-message">
                    <p className="error-text">{optionErr}</p>
                  </div>
                )}

                {/* Create Poll Button */}
                <button
                  onClick={createPoll}
                  disabled={isSubmitting || options.length < 2}
                  className={`btn ${
                    isSubmitting || options.length < 2
                      ? 'btn-disabled'
                      : 'btn-success'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Creating Poll...
                    </>
                  ) : (
                    <>
                      <Check size={20} />
                      Create Poll ({options.length} options)
                    </>
                  )}
                </button>

                {options.length < 2 && (
                  <p className="help-text">
                    Add at least 2 options to create your poll
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .create-poll-container {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #17005c 0%,
            #6b46c1 50%,
            #1e40af 100%
          );
          width: 100vw;
          padding: 32px 16px;
          font-family: 'Inter', system-ui, Avenir, Helvetica, Arial, sans-serif;
        }

        .create-poll-wrapper {
          max-width: 500px;
          margin: 0 auto;
        }

        .progress-container {
          margin-bottom: 32px;
        }

        .progress-indicator {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          margin-bottom: 16px;
        }

        .progress-step {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.3);
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .progress-step.active {
          background-color: white;
          border-color: white;
          color: #6b46c1;
        }

        .progress-line {
          height: 4px;
          width: 64px;
          background-color: rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .progress-line.active {
          background-color: white;
        }

        .progress-labels {
          display: flex;
          justify-content: space-between;
          color: rgba(255, 255, 255, 0.8);
          font-size: 14px;
          padding: 0 16px;
        }

        .form-card {
          background: white;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
          overflow: hidden;
        }

        .card-content {
          padding: 40px;
          max-height: 90vh;
          overflow-y: auto;
        }

        @media (min-width: 768px) {
          .card-content {
            padding: 48px;
          }
        }

        .header-section {
          text-align: center;
          margin-bottom: 32px;
        }

        .main-title {
          font-size: 32px;
          font-weight: bold;
          color: #374151;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #6b7280;
        }

        .form-section {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-label {
          display: block;
          font-size: 14px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 8px;
        }

        .form-input,
        .form-textarea,
        .form-select {
          width: 100%;
          padding: 12px 16px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 16px;
          outline: none;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .form-input:focus,
        .form-textarea:focus,
        .form-select:focus {
          border-color: #6b46c1;
          box-shadow: 0 0 0 3px rgba(107, 70, 193, 0.1);
        }

        .form-textarea {
          resize: none;
          min-height: 80px;
        }

        .form-select {
          background-color: white;
          cursor: pointer;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }

        @media (min-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        .btn {
          width: 100%;
          padding: 16px 24px;
          border-radius: 8px;
          font-size: 16px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .btn-primary {
          background-color: #6b46c1;
          color: white;
        }

        .btn-primary:hover {
          background-color: #553c9a;
        }

        .btn-secondary {
          background-color: #3b82f6;
          color: white;
        }

        .btn-secondary:hover {
          background-color: #2563eb;
        }

        .btn-success {
          background-color: #059669;
          color: white;
        }

        .btn-success:hover {
          background-color: #047857;
        }

        .btn-disabled {
          background-color: #9ca3af;
          color: white;
          cursor: not-allowed;
        }

        .error-message {
          background-color: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 8px;
          padding: 12px;
        }

        .error-text {
          color: #dc2626;
          font-size: 14px;
          margin: 0;
        }

        .error-text.small {
          margin-top: 4px;
        }

        .step-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #6b46c1;
          font-size: 16px;
          font-weight: 500;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 8px 0;
          transition: color 0.2s ease;
        }

        .back-button:hover {
          color: #553c9a;
        }

        .question-display {
          text-align: center;
        }

        .question-title {
          font-size: 20px;
          font-weight: bold;
          color: #374151;
          margin: 0;
        }

        .question-meta {
          font-size: 14px;
          color: #6b7280;
          margin: 0;
        }

        .spacer {
          width: 64px;
        }

        .options-section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 18px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 12px;
        }

        .options-list {
          max-height: 240px;
          overflow-y: auto;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 8px;
        }

        .option-item {
          background-color: #f9fafb;
          border-radius: 8px;
          padding: 16px;
          margin-bottom: 12px;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .option-item:last-child {
          margin-bottom: 0;
        }

        .option-image {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 8px;
          flex-shrink: 0;
        }

        .option-content {
          flex: 1;
          min-width: 0;
        }

        .option-text {
          font-weight: 500;
          color: #374151;
          margin: 0 0 4px 0;
          word-break: break-words;
        }

        .option-meta {
          font-size: 12px;
          color: #6b7280;
          margin: 0;
        }

        .remove-button {
          color: #ef4444;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: color 0.2s ease;
          flex-shrink: 0;
        }

        .remove-button:hover {
          color: #dc2626;
        }

        .add-option-section {
          background-color: #eff6ff;
          border-radius: 8px;
          padding: 24px;
          margin-bottom: 24px;
        }

        .option-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .file-upload-section {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .file-upload-button {
          width: 100%;
          border: 2px dashed #d1d5db;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          background: transparent;
          cursor: pointer;
          transition: border-color 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        .file-upload-button:hover {
          border-color: #3b82f6;
        }

        .file-upload-text {
          color: #6b7280;
        }

        .hidden-input {
          display: none;
        }

        .help-text {
          text-align: center;
          color: #6b7280;
          font-size: 14px;
          margin: 8px 0 0 0;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 2px solid transparent;
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}

export default CreatePoll;
