import axios from "axios";
const MAIN_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {

    params: {
        maxResults: '3'
    },
    headers: {
        'X-RapidAPI-Key': '90667c0401msh142beb602eae14ap1194dfjsn096e54601427',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const makeAPICall = async (url) => {
    const { data } = await axios.get(`${MAIN_URL}/${url}`, options);
    return data;
}