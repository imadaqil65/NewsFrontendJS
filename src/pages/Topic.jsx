import React, { useEffect, useState } from 'react';
import { Accordion, Button, Container, Form, InputGroup, Table } from 'react-bootstrap';
import TopicsAPI from '../apis/TopicsAPI';
import DeletionModal from '../components/Modal/DeletionModal';

function Topic() {
  const [topicItems, setTopicItems] = useState([]);
  const [topicDetails, setTopicDetails] = useState([]);
  const [newTopicName, setNewTopicName] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [selectedTopicIdForDelete, setSelectedTopicIdForDelete] = useState('');
  const [renamedTopicName, setRenamedTopicName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const refreshTopicsList = () => {
    setError(null);
    setSuccess(null);
    TopicsAPI.getAllTopics()
      .then(topics => setTopicItems(topics))
      .catch(error => console.log(error))
      .catch(() => setError('failed fetching topics'));
  };

  const refreshTopicDetailsList = () => {
    setError(null);
    setSuccess(null);
    TopicsAPI.getTopicDetails()
      .then(topics => setTopicDetails(topics))
      .catch(error => console.log(error))
      .catch(() => setError('failed fetching topic details'));
  }

  useEffect(() => {
    refreshTopicsList();
    refreshTopicDetailsList();
  }, []);

  const handlePost = async (e) => {
    setFail(null);
    setSuccess(null);
    e.preventDefault();
    try {
      const topicId = await TopicsAPI.postTopic({ topicName: newTopicName });
      setNewTopicName('');
      refreshTopicsList();
      setSuccess(`Topic created successfully with ID: ${topicId}`);
    } catch (err) {
      setError('Failed to create topic');
      console.error(err);
    }
  };

  const handlePut = async (e) => {
    setFail(null);
    setSuccess(null);
    e.preventDefault();
    try {
      const success = await TopicsAPI.editTopic(selectedTopicId, { topicName: renamedTopicName });
      if (success) {
        setRenamedTopicName('');
        setSelectedTopicId('');
        refreshTopicsList();
        setSuccess('Topic renamed successfully');
      } else {
        setError('Failed to rename topic');
      }
    } catch (err) {
      setError('Failed to rename topic');
      console.error(err);
    }
  };

  const handleDelete = async () => {
    setFail(null);
    setSuccess(null);
    try {
      const success = await TopicsAPI.deleteTopic(selectedTopicIdForDelete);
      if (success) {
        setSelectedTopicIdForDelete('');
        refreshTopicsList();
        setSuccess('Topic deleted successfully');
      } else {
        setError('Failed to delete topic');
      }
    } catch (err) {
      setError('Failed to delete topic');
      console.error(err);
    } finally {
      setShowModal(false);
    }
  };

  const confirmDelete = (topicId) => {
    setSelectedTopicIdForDelete(topicId);
    setShowModal(true);
  };

  return (
    <div style={{ minHeight: '45rem' }} className='d-flex align-items-center'>
      <Container className='p-5 bg-body-secondary rounded'>
        <h2 className='fw-bold mb-5'>Topic Control</h2>
        <Accordion flush alwaysOpen>
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              <h3 className='fw-bold'>Rename Topic</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handlePut}>
                <InputGroup>
                  <InputGroup.Text>Select Topic to update</InputGroup.Text>
                  <Form.Select
                    value={selectedTopicId}
                    onChange={(e) => setSelectedTopicId(e.target.value)}
                  >
                    <option selected hidden value="">Select topic</option>
                    {topicItems.map(topic => (
                      <option key={topic.id} value={topic.id}>{topic.topicName}</option>
                    ))}
                  </Form.Select>
                  <InputGroup.Text>Rename to:</InputGroup.Text>
                  <Form.Control
                    placeholder='Rename topic'
                    value={renamedTopicName}
                    onChange={(e) => setRenamedTopicName(e.target.value)}
                  />
                  <Button type='submit'>Rename Topic</Button>
                </InputGroup>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="1">
            <Accordion.Header>
              <h3 className='fw-bold'>Create Topic</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handlePost}>
                <InputGroup>
                  <InputGroup.Text>Name of Topic</InputGroup.Text>
                  <Form.Control
                    placeholder='Topic name'
                    value={newTopicName}
                    onChange={(e) => setNewTopicName(e.target.value)}
                  />
                  <Button type='submit'>Create Topic</Button>
                </InputGroup>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2">
            <Accordion.Header>
              <h3 className='fw-bold'>Delete Topic</h3>
            </Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={(e) => { e.preventDefault(); confirmDelete(selectedTopicIdForDelete); }}>
                <InputGroup>
                  <InputGroup.Text>Select Topic to delete</InputGroup.Text>
                  <Form.Select
                    value={selectedTopicIdForDelete}
                    onChange={(e) => setSelectedTopicIdForDelete(e.target.value)}
                  >
                    <option selected hidden value="">Select topic</option>
                    {topicItems.map(topic => (
                      <option key={topic.id} value={topic.id}>{topic.topicName}</option>
                    ))}
                  </Form.Select>
                  <Button type='submit' className='btn-danger'>Delete Topic</Button>
                </InputGroup>
              </Form>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3">
            <Accordion.Header>
              <h3 className='fw-bold'>Topic Statistics</h3>
            </Accordion.Header>
            <Accordion.Body>
              <table className='table table-striped table-bordered'>
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Topic Name</th>
                    <th scope="col">Comments per Topic</th>
                  </tr>
                </thead>
                <tbody>
                {topicDetails.map(topic => (
                  <tr key={topic.id}>
                      <th scope="row">{topic.id}</th>
                      <td>{topic.name}</td>
                      <td>{topic.totalCommentsPerTopic}</td>          
                  </tr>
                  ))}
                </tbody>
              </table>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        {error && <div className="alert alert-danger mt-3" style={{textAlign:"center"}}>{error}</div>}
        {success && <div className="alert alert-success mt-3" style={{textAlign:"center"}}>{success}</div>}
      </Container>
      <DeletionModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleDelete}
        message="Are you sure you want to delete this topic?"
      />
    </div>
  );
}

export default Topic;
