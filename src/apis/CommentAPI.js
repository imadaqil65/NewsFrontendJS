import axios from "axios";
import BASE_URL from "./Config.js";
import TokenManager from "./TokenManager.js";

const API_URL = `${BASE_URL}comments`;

const CommentAPI = {
    postComment:(newComment) => axios.post(API_URL, newComment, {
        headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }).then(response => response.data.commentId),
    editComment:(commentId, editedComment) => axios.put(`${API_URL}/${commentId}`, editedComment, {
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }).then(response => response.status === 204),
    deleteComment: (commentId) => axios.delete(`${API_URL}/${commentId}`,{
            headers: { Authorization: `Bearer ${TokenManager.getAccessToken()}` }
        }).then(response => response.status === 204)
}

export default CommentAPI