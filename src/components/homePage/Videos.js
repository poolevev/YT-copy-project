import React from "react";
import styles from './Videos.module.scss';
import VideoCard from "./VideoCard"


const Videos = ({ videos }) => {

    return (
        <div>
            {videos?.map((item, index) => (
                <div key={index}>
                    {console.log(item)}
                    {item.id.videoId && <VideoCard video={item} />}
                </div>
            ))}
        </div>
    );
}

export default Videos;