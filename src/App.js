import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [file, setFile] = useState(null);
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setPrediction(response.data.class_name);
      setConfidence(response.data.confidence_score);
    } catch (error) {
      console.error('Error uploading the image', error);
    }
  };

  return (
    <div className="App">
      <h1>Image Prediction</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="image/*" />
        <button type="submit">Predict</button>
      </form>

      {prediction && (
        <div>
          <h2>Prediction: {prediction}</h2>
          <h3>Confidence Score: {confidence}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
