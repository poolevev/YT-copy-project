import React, { useState, useEffect } from 'react';
import styles from './Videos.module.scss';
import VideoCard from "./VideoCard"
//import RelatedVideoCard from '../videoPlayerPage/RelatedVideos/RelatedVideoCard';


const Videos = ({ videos, initialVideosNumber }) => {
    const [videosNumber, setVideosNumber] = useState(initialVideosNumber || 9);

    useEffect(() => {

        setVideosNumber(prev => prev + 7);
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
                // related === true ?
                //     <div key={index}>
                //         {item.id.videoId && <RelatedVideoCard video={item} />}
                //     </div> : null

            ))}
        </div>
    );
}

export default Videos;