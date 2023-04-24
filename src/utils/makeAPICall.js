import axios from "axios";
//const MAIN_URL = 'https://www.googleapis.com/youtube/v3';
const MAIN_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {

    params: {
        maxResults: '50'

    },
    headers: {
        'X-RapidAPI-Key': '90667c0401msh142beb602eae14ap1194dfjsn096e54601427',
        //'X-RapidAPI-Key': '675c9c5547msh6893eba4f69f99dp1258c8jsnf2130843534b',
        //'X-RapidAPI-Key': 'f9dec24c6amsh9d0d81c9fb1df61p1dfe88jsnf6a91051e4a9',
        //'X-RapidAPI-Key': 'e143712db3mshab93a043c0ca014p15a4abjsne50f12a1f5bd',

       //youtube original key
       //AIzaSyCtiszcgPf6MsKzfjOIAj98Y6-i6e9R2Bw

         //Alex
        // 'X-RapidAPI-Key': 'd201e1ab14mshb36b5b04cd15b5ep12fbd6jsn48a0ccb7000a',
        // 'X-RapidAPI-Key': '7bae358b52msh7c9001aad113a55p1159f8jsn8f1c9def24c3',
        'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
    }
};

export const makeAPICall = async (url) => {
    const { data } = await axios.get(`${MAIN_URL}/${url}`, options);
    return data;
}