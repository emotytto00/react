import {useEffect, useState} from 'react';
import {fetchData} from '../lib/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);
  const {getUserById} = useUser();
  const getMedia = async () => {
    try {
      const mediaResult = await fetchData(
        import.meta.env.VITE_MEDIA_API + '/media',
      );

      const mediaWithUser = await Promise.all(
        mediaResult.map(async (mediaItem) => {
          const userResult = await getUserById(mediaItem.user_id);
          return {...mediaItem, username: userResult.username};
        }),
      );

      setMediaArray(mediaWithUser);
    } catch (error) {
      console.error('getMedia error', error);
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  const postMedia = async (file, inputs, token) => {
    const mediaObject = {
      title: inputs.title,
      description: inputs.description,
      filename: file.filename,
      media_type: file.media_type,
      filesize: file.filesize,
    };
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(mediaObject),
    };
    const mediaResponse = await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media',
      fetchOptions,
    );
    // TODO: return the data
    return mediaResponse;
  };

  const deleteMedia = async (id, token) => {
    const options = {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };

    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media/' + id,
      options,
    );
  };

  const getMediaById = async (id) => {
    return await fetchData(import.meta.env.VITE_MEDIA_API + '/media/' + id);
  };

  const putMedia = async (id, inputs, token) => {
    const fetchOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
      body: JSON.stringify(inputs),
    };
    return await fetchData(
      import.meta.env.VITE_MEDIA_API + '/media/' + id,
      fetchOptions,
    );
  };

  return {mediaArray, postMedia, deleteMedia, getMediaById, putMedia};
};

const useUser = () => {
  const getUserById = async (id) => {
    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/' + id,
    );
    return userResult;
  };

  const getUserByToken = async (token) => {
    const options = {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    };
    const tokenResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      options,
    );
    return tokenResult;
  };

  const register = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    return await fetchData(import.meta.env.VITE_AUTH_API + '/users', options);
  };

  return {getUserById, getUserByToken, register};
};

const useAuthentication = () => {
  const login = async (inputs) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      options,
    );
    return loginResult;
  };

  return {login};
};

const useFile = () => {
  const postFile = async (file, token) => {
    const formData = new FormData();
    formData.append('file', file);
    const fetchOptions = {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    };
    const fileData = await fetchData(
      import.meta.env.VITE_UPLOAD_SERVER + '/upload',
      fetchOptions,
    );
    return fileData;
  };

  return {postFile};
};

export {useMedia, useAuthentication, useUser, useFile};
