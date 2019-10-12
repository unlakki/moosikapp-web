import axios from 'axios';

const { REACT_APP_API_URL = '' } = process.env;
const API_URL = `${REACT_APP_API_URL}/api/v2`;

export const authorize = async (username, password) => {
  const { token } = await axios(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
    data: JSON.stringify({ username, password }),
  }).then(res => res.data);

  return token;
};

export const getSongById = async (token, id) => {
  const { song } = await axios(`${API_URL}/songs/${id}`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(res => res.data);

  return song;
};

export const getSongs = async (token, skip = 0, limit = 100) => {
  const { songs } = await axios(`${API_URL}/songs?skip=${skip}&limit=${limit}&scope=3`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(res => res.data);

  return songs;
};

export const getFavoriteSongs = async (token, skip = 0, limit = 100) => {
  const { songs } = await axios(`${API_URL}/favorites?skip=${skip}&limit=${limit}&scope=2`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(res => res.data);

  return songs;
};

export const findSongs = async (token, query, skip = 0, limit = 100) => {
  const { songs } = await axios(`${API_URL}/songs/find?query=${query}&skip=${skip}&limit=${limit}&scope=3`, {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  }).then(res => res.data);

  return songs;
};

export const addToFavorites = async (token, uuid) => {
  await axios(`${API_URL}/favorites/${uuid}`, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return true;
};

export const deleteFromFavorites = async (token, uuid) => {
  await axios(`${API_URL}/favorites/${uuid}`, {
    method: 'DELETE',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
  return true;
};
