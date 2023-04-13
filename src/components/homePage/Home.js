import React, { useState, useEffect } from 'react';
import Categories from './Categories.js';
import Videos from './Videos.js';
import { makeAPICall } from '../../utils/makeAPICall.js';
import styles from './Home.module.scss';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    makeAPICall(`search?part=snippet&q=${selectedCategory}`).then((data) =>
      setVideos(data.items)
    );
  }, [selectedCategory]);

  return (
    <div className={styles.homeWrapper}>
    
      <div className={styles.videoContainer}>
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Videos videos={videos} />
      </div>
    </div>
  );
};

export default Home;
