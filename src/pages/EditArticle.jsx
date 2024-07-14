import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { share } from 'react-icons-kit/feather';
import { useParams, Navigate, NavLink } from 'react-router-dom';
import NewsAPI from '../apis/NewsAPI';
import TopicsAPI from '../apis/TopicsAPI';
import LoadingPage from './LoadingPage';
import TokenManager from '../apis/TokenManager';

function EditArticle() {
  const { id } = useParams();
  const claimsId = TokenManager.getClaims().userId;
  const [articleDetails, setArticleDetails] = useState(null);
  const [topicItems, setTopicItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [fail, setFail] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    journalistId: '',
    topic: '',
    content: '',
  });

  const refreshTopicsList = () => {
    TopicsAPI.getAllTopics()
      .then((topics) => setTopicItems(topics))
      .catch((error) => console.log(error));
  };

  const getArticleDetails = () => {
    if (id) {
      NewsAPI.getNews(id)
        .then((article) => {
          setArticleDetails(article);
          setFormData({
            title: article.title,
            journalistId: claimsId,
            topic: article.topic.id,
            content: article.content,
          });
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to fetch article');
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    refreshTopicsList();
    getArticleDetails();
  }, [id]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFail(null);
    setSuccess(null);
    NewsAPI.editArticle(id, formData)
      .then((success) => {
        if (success) {
          // Handle successful edit
          console.log('Article edited successfully');
          setSuccess('Article edited successfully');
        } else {
          setFail('Failed to edit article');
        }
      })
      .catch((err) => {
        setFail('Failed to edit article');
        console.error(err);
        console.log(err);
      });
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (claimsId !== articleDetails.journalist.id) {
    return (
      <Navigate
        to="/error"
        replace={true}
        state={{ error: 'Editing this article is not allowed' }}
      />
    );
  }

  if (error) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ minHeight: '45rem' }}
      >
        <h5 className="text-secondary mt-3">{error}</h5>
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {articleDetails && (
        <Form
          className="rounded container m-5 p-5 bg-body-secondary"
          onSubmit={handleSubmit}
        >
          <h3 className="fw-bold">Edit Article</h3>
          <h5>Article id: {articleDetails.id}</h5>
          <h5>Author Name: {articleDetails.journalist.name}</h5>
          <Form.Group className="mb-3 ">
            <Form.Label>Title</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="add a title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Topic</Form.Label>
            <Form.Select
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
            >
              <option disabled className='text-secondary'>select topic</option>
              {topicItems.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.topicName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Content</Form.Label>
            <Form.Control
              required
              as="textarea"
              rows={20}
              name="content"
              value={formData.content}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button size="lg" variant="primary" type="submit">
            <Icon icon={share} className="me-2" />
            Submit Changes
          </Button>
          {fail && <div className="alert alert-danger mt-3" style={{textAlign:"center"}}>{fail}</div>}
          {success && <div className="alert alert-success mt-3" style={{textAlign:"center"}}>{success}</div>}
        </Form>
      )}
    </div>
  );
}

export default EditArticle;