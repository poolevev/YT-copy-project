import React, { useState, useEffect } from 'react';

const History = () => {
  const [history, setHistory] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    const allHistory = JSON.parse(localStorage.getItem('allHistory'));

    if (allHistory) {
      const userHistory = allHistory.filter(item => item.username === loggedUser.username);
      setHistory(userHistory);
    }
  }, []);

  const loadMore = () => {
    const newLength = history.length + 3;
    const allHistory = JSON.parse(localStorage.getItem('allHistory'));

    if (allHistory) {
      const userHistory = allHistory.filter(item => item.username === localStorage.loggedUser.username);
      const newHistory = userHistory.slice(0, newLength);
      setHistory(newHistory);

      if (newHistory.length >= userHistory.length) {
        setShowMore(false);
      }
    }
  }

  return (
    <div>
      <h2>History</h2>
      {history.length > 0 ? (
        <div>
          {history.map((item, index) => (
            <div className="card" key={index}>
              <div className="card-title">{item.title}</div>
              <div className="card-info">{item.description}</div>
            </div>
          ))}
          {showMore && (
            <button onClick={loadMore}>Show More</button>
          )}
        </div>
      ) : (
        <span>No history yet</span>
      )}
    </div>
  );
}

export default History;

// Note that this implementation assumes that each item in the allHistory array has a username, title, and description property. You may need to modify it to fit your specific use case.