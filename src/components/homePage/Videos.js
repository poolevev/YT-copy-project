import React from "react";
import styles from './Videos.module.scss';
import VideoCard from "./VideoCard"


const Videos = ({ videos }) => {

    return (
    
        <div className={styles.container}>
            {videos?.map((item, index) => (
                <div key={index}>
                    {item.id.videoId && <VideoCard video={item} />}
                </div>
            ))}
        </div>
    );
}

export default Videos;