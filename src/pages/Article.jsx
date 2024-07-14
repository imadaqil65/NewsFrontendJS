import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import NewsAPI from '../apis/NewsAPI';
import 'ldrs/trio';
import Comments from '../components/article/Comments';
import LoadingPage from './LoadingPage';
import styles from './pageStyle/article.module.css';
import { Icon } from 'react-icons-kit';
import { send } from 'react-icons-kit/feather/send';
import TokenManager from '../apis/TokenManager';
import CommentAPI from '../apis/CommentAPI';

function Article() {
  const { id } = useParams();
  const [articleDetails, setArticleDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [claims, setClaims] = useState(null);
  const [commentData, setCommentData] = useState({
    userId: null,
    newsId: id,
    content: '',
  });

  const getArticleDetails = () => {
    if (id) {
      NewsAPI.getNews(id)
        .then((article) => {
          setArticleDetails(article);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch article');
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    const userClaims = TokenManager.getClaims();
    setClaims(userClaims);
    getArticleDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const userClaims = TokenManager.getClaims();

    if (userClaims?.userId) {
      setCommentData((prevState) => ({
        ...prevState,
        userId: userClaims.userId,
      }));

      try {
        CommentAPI.postComment({
          ...commentData,
          userId: userClaims.userId,
        })
        .then(commentId => console.log('Comment posted with id:', commentId));
        setCommentData({
            userId: null,
            newsId: id,
            content: '',
        });
        getArticleDetails(); // Refresh article details to show the new comment
      } catch (error) {
        console.log('Error posting comment:', error);
      }
    } else {
      setError('User not logged in.');
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {articleDetails ? (
        <div className="p-5 my-3">
          <h1>{articleDetails.title}</h1>
          <h5 className="text-secondary">
            Published: {new Date(articleDetails.dateTime).toDateString()}
          </h5>
          <h5 className="text-secondary mb-3">
            Topic: {articleDetails.topic.topicName} <br />
            Author: {articleDetails.journalist.name}
          </h5>
          <div className="pe-5">{articleDetails.content}</div>
          <hr />
          <h3>{articleDetails.numOfComments} Comments</h3>

          <form onSubmit={handleSend} className="my-4 d-flex flex-column">
            <textarea
              data-testid="action-comment"
              required
              placeholder="Write your comment"
              onChange={handleChange}
              value={commentData.content}
              className={`${styles.commentStyle} rounded mb-1`}
              style={{ minHeight: '7rem', maxHeight: '7rem' }}
              name="content"
            ></textarea>
            {claims ? (
              <button type="submit" className={`btn btn-primary ${styles.commentStyle}`}>
                <Icon className="me-2" icon={send} />
                Send Comment
              </button>
            ) : (
              <NavLink to="/login" className={`btn btn-primary ${styles.commentStyle}`}>
                <Icon className="me-2" icon={send} />
                Send Comment
              </NavLink>
            )}
          </form>
          <Comments
            user={claims?.userId}
            styles={styles}
            commentList={articleDetails.commentList}
            refreshArticle={getArticleDetails} // Pass the refresh function
          />
        </div>
      ) : (
        <div>Article not found.</div>
      )}
    </>
  );
}

export default Article;
