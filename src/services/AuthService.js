import axios from "axios";

import parseJWT from "../helpers/JWTService";
const SERVER_URL = "http://kab.testkai.tk/api/";
class AuthService {
  logout = () => {
    //   setToken("");
    localStorage.removeItem("token");
  };

  login = async (data) => {
    try {
      const response = await axios.post(SERVER_URL + "Account/login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const token = response.data.token;

      if (token) {
        let userdata = parseJWT(token);
        console.log(userdata);
        console.log("token ok!");

        console.log(token);
      } else {
        console.log("token undefined!");
      }

      //   setToken(response.data.token);
      // Збереження токену в локальному сховищі
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Login error:", error);
    }
    console.log(data);
  };

  register = async (data) => {
    try {
      const response = await axios.post(
        SERVER_URL + "Account/register",
        data, // Відправляємо дані без JSON.stringify
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Перевіряємо статус відповіді
        const responseData = response.data; // Отримуємо дані відповіді
        // Обробка успішної відповіді
        console.log("Registration successful:", responseData);
      } else {
        throw new Error("Registration failed");
      }
    } catch (error) {
      // Обробка помилки
      console.error("Registration error:", error);
    }
  };
}

export default new AuthService();
