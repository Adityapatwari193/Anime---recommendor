import React, { useState } from 'react';
import axios from 'axios';

function InputBox() {
  const [inputValue, setInputValue] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:8000/predict', {
        anime_name: inputValue,
      });
      if (response.status === 404) {
        setRecommendations([]);
        setErrorMessage('No results found');
      } else {
        setRecommendations(response.data);
        setErrorMessage('');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      setErrorMessage('Error fetching recommendations or Enter Proper Anime Name');
    }
  };

  const handleReset = () => {
    setInputValue('');
    setRecommendations([]);
    setErrorMessage('');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '140px' }}>
      <h1>Anime Recommendation</h1>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter anime name"
        style={{ width: '300px', fontSize: '16px', height: '50px' }}
      />
      <br />
      <button style={{ marginRight: '10px' }} onClick={handleSubmit}>
        Predict
      </button>
      <button onClick={handleReset}>Reset</button>
      <br />
      {errorMessage && <p>{errorMessage}</p>}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {recommendations.map((anime) => (
          <li key={anime.Name} style={{ marginBottom: '10px' }}>
            <strong>{anime.Name}</strong> - {anime.Tags}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default InputBox;
