import { api, requestConfig } from "../utils/api";

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

const userService = {
  profile,
};

export default userService;
