import axios from "axios";
const MAIN_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {

    params: {
        maxResults: '9'

    },
    headers: {
        //'X-RapidAPI-Key': '90667c0401msh142beb602eae14ap1194dfjsn096e54601427',
        'X-RapidAPI-Key': '675c9c5547msh6893eba4f69f99dp1258c8jsnf2130843534b',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const makeAPICall = async (url) => {
    const { data } = await axios.get(`${MAIN_URL}/${url}`, options);
    return data;
}