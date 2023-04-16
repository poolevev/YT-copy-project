import { useState, useEffect } from 'react';
import LibraryVideoCard from "../LibraryVideoCard";
import styles from './LikedVideo.module.scss';

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [showMore, setShowMore] = useState(true);
  const allHistory = JSON.parse(localStorage.getItem('AllHistory')) || '[]';
  const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
  const userLikedVideos = allHistory.filter(
    item => item.username === loggedUser?.username && item.isLiked
  );

  useEffect(() => {

    if (userLikedVideos.length > 0) {
      setLikedVideos(userLikedVideos.slice(0, 3));
    }
  }, []);

  const handleShowMore = () => {

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
    <div>
      <h2>Liked</h2>
      {likedVideos.length > 0 ? (
        <div>
          <div className={styles.container}>
            {likedVideos.map(item => (
              <div key={item.videoID}>
                {item.videoID && <LibraryVideoCard video={item} />}
              </div>
            ))}
          </div>
          {showMore && <button onClick={handleShowMore}>Show more</button>}
        </div>
      ) : (
        <span>No liked videos yet</span>
      )}
    </div>
  );
}

export default LikedVideos;
