import axios from "axios";
const MAIN_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {

    params: {
        maxResults: '50'

    },
    headers: {
        'X-RapidAPI-Key': '90667c0401msh142beb602eae14ap1194dfjsn096e54601427',
        // 'X-RapidAPI-Key': '675c9c5547msh6893eba4f69f99dp1258c8jsnf2130843534b',
        //  'X-RapidAPI-Key': 'f9dec24c6amsh9d0d81c9fb1df61p1dfe88jsnf6a91051e4a9',

         //Alex
        // 'X-RapidAPI-Key': 'd201e1ab14mshb36b5b04cd15b5ep12fbd6jsn48a0ccb7000a',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const makeAPICall = async (url) => {
    const { data } = await axios.get(`${MAIN_URL}/${url}`, options);
    return data;
}