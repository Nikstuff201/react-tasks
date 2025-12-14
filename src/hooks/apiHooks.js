import {useEffect, useState} from "react";
import {fetchData} from "../utils/fetchData.js";

const api = import .meta.env.VITE_AUTH_API;
const uploadApi = import .meta.env.VITE_UPLOAD_SERVER;

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const getMedia = async () => {
    try {
      const json = await fetchData(import.meta.env.VITE_MEDIA_API + '/media');

      const newArray = await Promise.all(
        json.map(async (item) => {
          const result = await fetchData(
            import.meta.env.VITE_AUTH_API + '/users/' + item.user_id,
          );
          return {...item, username: result.username};
        }),
      );

      setMediaArray(newArray);
    } catch (error) {
      console.log('fetch error:', error);
    }
  };

  const postMedia = async (fileData, inputs, token) => {
    try {
      const mediaData = {
        filename: fileData.filename,
        media_type: fileData.media_type,
        filesize: fileData.filesize,
        title: inputs.title,
        description: inputs.description,
      };

      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(mediaData),
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
        fetchOptions,
      );
      console.log('Media result:', mediaResult);

      return mediaResult;
    } catch (error) {
      console.error('Media post error:', error);
      throw error;
    }
  };

  const deleteMedia = async (mediaId, token) => {
    try {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media/' + mediaId,
        fetchOptions,
      );
      console.log('Media result:', mediaResult);

      return mediaResult;
    } catch (error) {
      console.error('Media delete error:', error);
      throw error;
    }
  };

  const modifyMedia = async (mediaId, inputs, token) => {
    try {
      const updateData = {
        title: inputs.title,
        description: inputs.description,
      };

      const fetchOptions = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateData),
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media/' + mediaId,
        fetchOptions,
      );
      console.log('Media result:', mediaResult);

      return mediaResult;
    } catch (error) {
      console.error('Media put error:', error);
      throw error;
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  console.log(mediaArray);

  return {mediaArray, postMedia, deleteMedia, modifyMedia};
};

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

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    };
    const response = await fetchData(uploadApi + '/upload', fetchOptions);
    return response.data;
  }
  return {postFile};
}

const useLike = () => {
  const postLike = async (mediaId, token) => {
    try {
      const fetchOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({media_id: parseInt(mediaId)}),
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes',
        fetchOptions,
      );
      console.log('Like result:', mediaResult);

      return mediaResult;
    } catch (error) {
      console.error('Media like error:', error);
      throw error;
    }
  };

  const deleteLike = async (likeId, token) => {
    try {
      const fetchOptions = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes/' + likeId,
        fetchOptions,
      );
      console.log('Like result:', mediaResult);

      return mediaResult;
    } catch (error) {
      console.error('Media like error:', error);
      throw error;
    }
  };

  const getLikeCountByMediaId = async (mediaId) => {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes/count/' + mediaId,
        fetchOptions,
      );
      return mediaResult;
    } catch (error) {
      console.error('Media like error:', error);
      throw error;
    }
  };

  const getLikeByUser = async (mediaId, userId, token) => {
    try {
      const fetchOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const userLikes = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/likes/byuser/' + userId,
        fetchOptions,
      );

      // Check if the user liked the specific media item
      if (Array.isArray(userLikes)) {
        const userLike = userLikes.find(
          (like) => like.media_id === parseInt(mediaId),
        );
        return userLike || null;
      }

      return null;
    } catch (error) {
      console.error('Media like error:', error);
      throw error;
    }
  };

  return {postLike, deleteLike, getLikeCountByMediaId, getLikeByUser};
};

export {useMedia, useAuthentication, useUser, useFile, useLike};
