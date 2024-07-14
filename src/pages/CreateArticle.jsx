import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { share } from 'react-icons-kit/feather';
import TopicsAPI from '../apis/TopicsAPI';
import TokenManager from '../apis/TokenManager';
import NewsAPI from '../apis/NewsAPI';

function CreateArticle({ stompClient }) {
  const id = TokenManager.getClaims().userId;
  const [topicItems, setTopicItems] = useState([]);
  const [fail, setFail] = useState(null);
  const [success, setSuccess] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    journalistId: id,
    topic: '',
    content: ''
  });

  const refreshTopicsList = () => {
    TopicsAPI.getAllTopics()
      .then(topics => setTopicItems(topics))
      .catch(error => console.log(error));
  };

  useEffect(() => {
    refreshTopicsList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFail(null);
    setSuccess(null);
    NewsAPI.postArticle(formData)
      .then(articleId => {
        console.log('Article created with ID:', articleId);
        setSuccess("New article created");
        setFormData({
          title: '',
          journalistId: id,
          topic: '',
          content: ''
        });

        const notificationMessage = {
          id: articleId,
          title: 'New article has been posted',
          text: `title: ${formData.title}`
        };

        if (stompClient && stompClient.connected) {
          stompClient.publish({ destination: '/topic/publicmessages', body: JSON.stringify(notificationMessage) });
        }
      })
      .catch(error => {
        console.error('Error creating article:', error);
        setFail("Error creating article");
      });
  };

  return (
    <div className='d-flex flex-wrap justify-content-center'>
      <Form className='rounded container m-5 p-5 bg-body-secondary' onSubmit={handleSubmit}>
        <h3 className='fw-bold'>Create New Article</h3>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder='Add a title'
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label>Topic</Form.Label>
          <Form.Select
            name="topic"
            value={formData.topic.id}
            onChange={handleChange}
          >
            <option selected hidden className='text-secondary'>select topic</option>
            {topicItems.map(topic => (
              <option key={topic.id} value={topic.id}>{topic.topicName}</option>
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
            onChange={handleChange}
          />
        </Form.Group>
        <Button size='lg' variant="primary" type="submit">
          <Icon icon={share} className='me-2' />Submit
        </Button>
        {fail && <div className="alert alert-danger mt-3" style={{ textAlign: "center" }}>{fail}</div>}
        {success && <div className="alert alert-success mt-3" style={{ textAlign: "center" }}>{success}</div>}
      </Form>
    </div>
  );
}

export default CreateArticle;
