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
    return response;
  } catch (error) {
    console.log(error);
  }
};

const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
};

export default authService;
