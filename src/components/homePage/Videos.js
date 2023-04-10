import React from "react";
import { Stack, Box } from "@mui/material";


const Videos = ({ videos }) => {

    return (
        <Stack>
            {videos?.map((item, index) => (
                <Box key={index}>
                    {console.log(item)}
                </Box>
            ))}
        </Stack>
    );
}

export default Videos;