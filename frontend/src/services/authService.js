import { api, requestConfig } from "../utils/config";

const register = async (data) => {
  const config = requestConfig("POST", data);

  try {
    const response = await fetch(`${api}/users/register`, config)
      .then((res) => res.json())
      .catch((error) => error);

    if (response) {
      localStorage.setItem("user", JSON.stringify(response));
    }
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  register,
};

export default authService;
