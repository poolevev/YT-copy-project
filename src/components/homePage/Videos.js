import React from "react";
import { Stack, Box } from "@mui/material";
import VideoCard from "./VideoCard"


const Videos = ({ videos }) => {

    return (
        <Stack>
            {videos?.map((item, index) => (
                <Box key={index}>
                    {console.log(item)}
                    {item.id.videoId && <VideoCard video={item} />}
                </Box>
            ))}
        </Stack>
    );
}

export default Videos;