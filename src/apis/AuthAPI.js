import axios from "axios";
import TokenManager from "./TokenManager.js";
import BASE_URL from "./Config.js";


const AuthAPI = {
    login: (email, password) => axios.post(`${BASE_URL}tokens`, { email, password })
        .then(response => response.data.accessToken)
        .then(accessToken => TokenManager.setAccessToken(accessToken))
}

export default AuthAPI;