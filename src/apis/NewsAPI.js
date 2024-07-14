import axios from "axios";
import BASE_URL from "./Config.js";
import TokenManager from "./TokenManager.js";

const API_URL = `${BASE_URL}news`;

const NewsAPI = {
    postArticle:(newArticle) => axios.post(API_URL, newArticle, {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }).then(response => response.data.articleId),

    editArticle:(newsId, editedArticle) => axios.put(`${API_URL}/${newsId}`, editedArticle, {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }).then(response => response.status === 204),

    getAllNews: () => axios.get(API_URL)
        .then(response => response.data.newsArticleList),

    getJournalistNews: (userId) => axios.get(`${API_URL}/journalist/${userId}`,{
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }).then(response => response.data.newsArticleList),

    get5Newest: () => axios.get(`${API_URL}/5newest`)
        .then(response => response.data.newsArticleList),

    getNews: (newsId) => axios.get(`${API_URL}/${newsId}`)
        .then(response => response.data),

    searchNews: (params) => axios.get(`${API_URL}/search`, { params })
        .then(response => response.data.newsArticleList),

    deleteArticle: (newsId) => axios.delete(`${API_URL}/${newsId}`,{
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }).then(response => response.status === 204)

};

export default NewsAPI;
