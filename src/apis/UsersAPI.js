import axios from "axios";
import TokenManager from "./TokenManager.js";
import BASE_URL from "./Config.js";

const API_URL = `${BASE_URL}users`;

const UsersAPI = {
    postUsers: newUser => axios.post(API_URL, newUser)
        .then(response => response.data.userid),

    postJournalist: newUser => axios.post(`${API_URL}/journalist`, newUser, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
        .then(response => response.data.userid),

    postAdmin: newUser => axios.post(`${API_URL}/admin`, newUser, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    })
        .then(response => response.data.userid),

    getUser: (userId) => axios.get(`${API_URL}/profile/${userId}`,
        {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }).then(response => response.data),

    editUser: (userId, editedUser) => axios.put(`${API_URL}/${userId}`, editedUser, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }).then(response => response.status === 204),

    deleteUser: (userId) => axios.delete(`${API_URL}/${userId}`, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
    }).then(response => response.status === 204),

    resetPassword: ({ email, password }) => axios.put(`${API_URL}/password`, { email, password })
        .then((response) => response.status === 204),

}

export default UsersAPI