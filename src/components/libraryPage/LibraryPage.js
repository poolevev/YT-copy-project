import React, { useState, useEffect } from 'react';

const Card = ({ item }) => {
  return (
    <div className="card">
      <div className="card-image">
        <img src={item.imageUrl} alt={item.title} />
      </div>
      <div className="card-info">
        <h2>{item.title}</h2>
        <p>{item.description}</p>
        <span>{item.date}</span>
      </div>
    </div>
  );
};

const History = () => {
  const [cards, setCards] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const allHistory = JSON.parse(localStorage.getItem('allHistory') || '[]');
    setCards(allHistory.slice(0, 3));
  }, []);

  const handleShowMore = () => {
    const allHistory = JSON.parse(localStorage.getItem('allHistory') || '[]');
    setCards(cards.concat(allHistory.slice(cards.length, cards.length + 3)));
  };

  return (
    <div className="history">
      {cards.length === 0 ? (
        <span>No history yet</span>
      ) : (
        cards.map((item, index) => <Card key={index} item={item} />)
      )}
      {cards.length > 0 && (
        <button onClick={handleShowMore} className="show-more">
          Show more
        </button>
      )}
    </div>
  );
};

const Playlists = () => {
  const [cards, setCards] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const allPlaylists = JSON.parse(localStorage.getItem('allPlaylists') || '[]');
    setCards(allPlaylists.slice(0, 3));
  }, []);

  const handleShowMore = () => {
    const allPlaylists = JSON.parse(localStorage.getItem('allPlaylists') || '[]');
    setCards(cards.concat(allPlaylists.slice(cards.length, cards.length + 3)));
  };

  return (
    <div className="playlists">
      {cards.length === 0 ? (
        <span>No playlists yet</span>
      ) : (
        cards.map((item, index) => <Card key={index} item={item} />)
      )}
      {cards.length > 0 && (
        <button onClick={handleShowMore} className="show-more">
          Show more
        </button>
      )}
    </div>
  );
};

const Liked = () => {
  const [cards, setCards] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const allHistory = JSON.parse(localStorage.getItem('allHistory') || '[]');
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const likedVideos = allHistory.filter(
      (item) => item.username === loggedUser.username && item.isLiked === true
    );
    setCards(likedVideos.slice(0, 3));
  }, []);

  const handleShowMore = () => {
    const allHistory = JSON.parse(localStorage.getItem('allHistory') || '[]');
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser') || '{}');
    const likedVideos = allHistory.filter(
      (item) => item.username === loggedUser.username && item.isLiked === true
    );
  }