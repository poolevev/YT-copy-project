import { useState, useEffect } from 'react';
import LibraryVideoCard from "../LibraryVideoCard";
import styles from './LikedVideo.module.scss';

const LikedVideos = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const allHistory = JSON.parse(localStorage.getItem('AllHistory')) || '[]';
  const loggedUser = JSON.parse(localStorage.getItem('LoggedUser'));
  const userLikedVideos = allHistory.filter(item => item.username === loggedUser?.username && item.isLiked);
  const [showMore, setShowMore] = useState(userLikedVideos.length > 3);

  useEffect(() => {
    if (userLikedVideos.length) {
      setLikedVideos(userLikedVideos.slice(0, 3));
    }
  }, []);

  const handleShowMore = () => {
    const newLength = likedVideos.length + 3;
    const newList = userLikedVideos.slice(0, newLength)
    setLikedVideos(newList);
    if (newList.length >= userLikedVideos.length)
      setShowMore(false);
  };

  return (
    <div>
      <h5 className={styles.categoryTitle}>Liked</h5>
      {likedVideos.length > 0 ? (
        <div>
          <div className={styles.container}>
            {likedVideos.map(item => (
              <div key={item.videoID}>
                {item.videoID && <LibraryVideoCard video={item} />}
              </div>
            ))}
          </div>
          {showMore && <button className={styles.showMoreBtn} onClick={handleShowMore}>Show more</button>}
        </div>
      ) : (
        <span>No liked videos yet</span>
      )}
      <hr></hr>
    </div>
  );
}

export default LikedVideos;
