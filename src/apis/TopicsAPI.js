import axios from "axios";
import BASE_URL from "./Config.js";
import TokenManager from "./TokenManager.js";

const API_URL = `${BASE_URL}topics`;

const TopicsAPI = {
    getAllTopics: () => axios.get(API_URL)
            .then(response => response.data.topicList),

    getTopics:(topicId)=> axios.get(`${API_URL}/${topicId}`)
            .then(response => response.data),

    postTopic:({topicName})=> axios.post(API_URL, {topicName}, {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
            }).then(response => response.data.id),

    editTopic:(topicId, editedTopic) => axios.put(`${API_URL}/${topicId}`, editedTopic, {
                headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
            }).then(response => response.status === 204),

    deleteTopic:(topicId) => axios.delete(`${API_URL}/${topicId}`, {
                headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
            }).then(response => response.status === 204),

    getTopicDetails:()=> axios.get(`${API_URL}/details`, {
                headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
            }).then(response => response.data)
}

export default TopicsAPI