import axios from "axios";
import { BASE_URL } from "./constant";
const checkToken = (token) => {
  axios.defaults.headers.authorization = token;
  return new Promise((resolve, reject) => {
    if (!token) {
      return reject("Token not found");
    } else {
      axios
        .post(BASE_URL + "/auth/login/check-token")
        .then((response) => {
          resolve(response);
        })
        .catch((err) => reject(err));
    }
  });
};
const login =(input)=>{
    return new Promise((resolve, reject) => {
        if (!input) {
          return reject("input not found");
        } else {
          axios
            .post(BASE_URL + "/auth/login/userwall",{...input})
            .then((response) => {
              resolve(response);
            })
            .catch((err) => reject(err));
        }
      });
}
const register =(input)=>{
    return new Promise((resolve, reject) => {
        if (!input) {
          return reject("input not found");
        } else {
          axios
            .post(BASE_URL + "/auth/register/userwall",{...input})
            .then((response) => {
              resolve(response);
            })
            .catch((err) => reject(err));
        }
      });
}
export { checkToken,login,register };