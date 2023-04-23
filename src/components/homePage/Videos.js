import React, { useState, useEffect } from 'react';
import styles from './Videos.module.scss';
import VideoCard from "./VideoCard"
//import RelatedVideoCard from '../videoPlayerPage/RelatedVideos/RelatedVideoCard';


const Videos = ({ videos, initialVideosNumber }) => {
    const [videosNumber, setVideosNumber] = useState(initialVideosNumber || 9);
    const [noMore, setNoMore] = useState(false);

    useEffect(() => {

        setVideosNumber(prev => prev + 9);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, []);

    const handleScroll = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight) {
            setVideosNumber(prev => prev + 6);
        }
    };

    if (videosNumber === 50) {
        setNoMore(true);
    }

    return (

        <div className={styles.container}>
            {videos?.slice(0, videosNumber).map((item, index) => (

                (<div key={index}>
                    {item.id.videoId && <VideoCard video={item} />}
                </div>
                //{noMore && (<span className={styles.noMoreVideos} > No more videos </span>)}
            )))}
        </div>
    );
}

export default Videos;