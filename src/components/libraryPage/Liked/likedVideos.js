import { useState, useEffect } from 'react';

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [showMore, setShowMore] = useState(true);

  useEffect(() => {
    const allHistory = JSON.parse(localStorage.getItem('allHistory')) || [];
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || {};

    const userLikedVideos = allHistory.filter(
      item => item.username === loggedUser.username && item.isLiked
    );

    if (userLikedVideos.length > 0) {
      setLikedVideos(userLikedVideos.slice(0, 3));
    }
  }, []);

  const handleShowMore = () => {
    const allHistory = JSON.parse(localStorage.getItem('allHistory')) || [];
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser')) || {};

    const userLikedVideos = allHistory.filter(
      item => item.username === loggedUser.username && item.isLiked
    );

    const start = likedVideos.length;
    const end = start + 3;
    const newLikedVideos = userLikedVideos.slice(start, end);

    if (newLikedVideos.length > 0) {
      setLikedVideos([...likedVideos, ...newLikedVideos]);
    } else {
      setShowMore(false);
    }
  }

  return (
    <div className="liked">
      <h2>Liked</h2>
      {likedVideos.length > 0 ? (
        <div className="cards">
          {likedVideos.map(video => (
            <div key={video.id} className="card">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          ))}
          {showMore && <button onClick={handleShowMore}>Show more</button>}
        </div>
      ) : (
        <span>No liked videos yet</span>
      )}
    </div>
  );
}

export default LikedVideos;


// This component will render a "Liked" div with a title and a set of cards representing the user's liked videos. It uses the useState and useEffect hooks to retrieve the liked videos from local storage and update the state of the component. It also provides a "Show more" button that allows the user to load more liked videos from local storage as they scroll through the list. If there are no liked videos in local storage, it displays a message to the user.