import React from 'react';
import { Box, Stack } from '@mui/material';
import Categories from './Categories.js';
import Videos from './Videos.js';
import { makeAPICall } from '../../utils/makeAPICall.js';
import { useState, useEffect } from 'react';

const Home = () => {

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [videos, setVideos] = useState(null);

  useEffect(() => {

    makeAPICall(`search?part=snippet&q=${selectedCategory}`)
      .then((data) => setVideos(data.items))
  }, [selectedCategory]);

  return (
    <Stack sx={{ flexDirection: { sx: "column", md: "row" } }}>

      <Box>SideMenu</Box>

      <Box sx={
        { flex: 2, height: '90vh', overflowY: 'auto' }
      }>
        <Categories
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <Videos videos={videos} />
        {console.log(videos)}
      </Box>

    </Stack>
  )
}

export default Home