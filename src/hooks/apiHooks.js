import {useEffect, useState} from "react";
import {fetchData} from "../utils/fetchData.js";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  useEffect(() => {
    const getMedia = async () => {
      try {
        const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');
        const newArray = await Promise.all(json.map(async (item) => {
          const result = await fetchData(import.meta.env.VITE_AUTH_API + `/users/${item.user_id}`);
        return {...item, username: result.username};
        }));
        setMediaArray(newArray);
      } catch (err) {
        console.error('Error fetching media data: ', err);
      }
    }
    getMedia()
  }, []);
  console.log(mediaArray);
  return {mediaArray};
}

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };
    const loginResult = await fetchData(import.meta.env.VITE_AUTH_API + '/auth/login', fetchOptions);
    console.log(await loginResult);
    localStorage.setItem('token', loginResult.token);
    return loginResult;
  };
  return {postLogin};
}
export {useMedia, useAuthentication};
