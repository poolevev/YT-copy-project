import React, { useState, useEffect } from 'react';
import styles from './Videos.module.scss';
import VideoCard from "./VideoCard"


const Videos = ({ videos }) => {
    const [videosNumber, setVideosNumber] = useState(9);

    useEffect(() => {

        setVideosNumber(prev => prev + 6);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            setVideosNumber(prev => prev + 6);
        }
    };

    return (

        <div className={styles.container}>
            {videos?.slice(0, videosNumber).map((item, index) => (
                <div key={index}>
                    {item.id.videoId && <VideoCard video={item} />}
                </div>
            ))}
        </div>
    );
}

export default Videos;