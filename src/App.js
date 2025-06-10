import React, { useState } from 'react';
import './App.css';
import { recommendStreamingService } from './showsData';

function App() {
  const [shows, setShows] = useState([]);
  const [currentShow, setCurrentShow] = useState('');
  const [recommendation, setRecommendation] = useState(null);

  const handleAddShow = (e) => {
    e.preventDefault();
    if (currentShow.trim()) {
      setShows([...shows, currentShow.trim()]);
      setCurrentShow('');
    }
  };

  const handleRemoveShow = (index) => {
    setShows(shows.filter((_, i) => i !== index));
  };

  const handleGetRecommendation = () => {
    if (shows.length > 0) {
      const result = recommendStreamingService(shows);
      setRecommendation(result);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="leftHeader">
          <button id="refreshButton" onClick={() => window.location.reload(false)}>PlatformMatch</button>
        </div>
        <div className="rightHeader">
          <h3>About</h3>
          <h3>Features</h3>
          <h3>Share</h3>
        </div>
      </header>

      <div className="content-container">
        <div className="input-section">
          <form onSubmit={handleAddShow}>
            <input
              type="text"
              value={currentShow}
              onChange={(e) => setCurrentShow(e.target.value)}
              placeholder="Enter a show title..."
              className="search-input"
            />
            <button type="submit" className="add-button">Add Show</button>
          </form>
        </div>

        {shows.length > 0 && (
          <div className="shows-list">
            <h2>Your Shows:</h2>
            <ul>
              {shows.map((show, index) => (
                <li key={index}>
                  {show}
                  <button 
                    onClick={() => handleRemoveShow(index)}
                    className="remove-button"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <button 
              onClick={handleGetRecommendation}
              className="recommend-button"
            >
              Get Recommendation
            </button>
          </div>
        )}

        {recommendation && (
          <div className="recommendation-container">
            {recommendation.recommendation ? (
              <>
                <h2>Recommended Streaming Service: {recommendation.recommendation.streamingService}</h2>
                <p className="reasoning">{recommendation.reasoning}</p>
              </>
            ) : (
              <p className="error-message">{recommendation.reasoning}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;