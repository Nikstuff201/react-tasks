import {useEffect, useState} from "react";
import {fetchData} from "../utils/fetchData.js";

const api = import .meta.env.VITE_AUTH_API;

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


const useUser = (token) => {
  const getUserByToken = async () => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    }
    const response = await fetchData(api + '/users/token', fetchOptions);
    console.log(await response);
    return response
  }

  const createUser = async (userData) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    };
    const response = await fetchData(api + '/users', fetchOptions);
    return response;
  }
  return {getUserByToken, createUser};
}

export {useMedia, useAuthentication, useUser};
