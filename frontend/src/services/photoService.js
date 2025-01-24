import { api, requestConfig } from "../utils/config";

const publishPhoto = async (data, token) => {
  const config = requestConfig("POST", data, token, true);

  try {
    const response = await fetch(`${api}/photos`, config)
      .then((res) => res.json())
      .catch((error) => error.response);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const getUserPhotos = async (id, token) => {
  const config = requestConfig("GET", null, token);
  try {
    const response = await fetch(`${api}/photos/user/${id}`, config)
      .then((res) => res.json())
      .catch((error) => error.response);

    return response;
  } catch (error) {
    console.log(error);
  }
};

const photoService = { publishPhoto, getUserPhotos };

export default photoService;
