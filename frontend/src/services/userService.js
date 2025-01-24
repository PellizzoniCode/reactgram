import { api, requestConfig } from "../utils/config";

const profile = async (data, token) => {
  const config = requestConfig("GET", data, token);

  try {
    const response = await fetch(`${api}/users/profile`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

const updateProfile = async (data, token) => {
  const config = requestConfig("PUT", data, token, true);

  try {
    const response = await fetch(`${api}/users`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

const getUserDetails = async (id) => {
  const config = requestConfig("GET");

  try {
    const response = await fetch(`${api}/users/${id}`, config)
      .then((res) => res.json())
      .catch((error) => error);

    return response;
  } catch (error) {
    console.error("Error:", error);
  }
};

const userService = {
  profile,
  updateProfile,
  getUserDetails,
};

export default userService;
