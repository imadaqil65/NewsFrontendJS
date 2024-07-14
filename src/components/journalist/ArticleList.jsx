import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Icon from 'react-icons-kit';
import { edit3, trash } from 'react-icons-kit/feather';

function ArticleList(props) {
  return (
    <div className='d-flex flex-wrap justify-content-center my-3 p-2'>
      {props.newsItems.length ? (
        props.newsItems.map(item => (
          <Card className={`m-1 text-decoration-none`} key={item.id} style={{ width: '20rem' }}>
            <Card.Body style={{ height: '16rem' }}>
              <Card.Title className='fw-bold'>{item.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Topic: {item.topic.topicName}
              </Card.Subtitle>
              <Card.Subtitle className="mb-2 text-muted">
                Published: {new Date(item.dateTime).toDateString()}
              </Card.Subtitle>
              <Card.Text>
                {item.content.length > 118
                  ? item.content.substring(0, 118).substring(0, item.content.substring(0, 118).lastIndexOf(' ')) + '...'
                  : item.content}
              </Card.Text>
              <div className='d-flex flex-wrap align-items-bottom'>
                <a href={`/edit-article/${item.id}`} className='mx-1 btn btn-primary'>
                  <Icon className='me-2' icon={edit3} />
                  Edit
                </a>
                <button
                  className='mx-1 btn btn-danger'
                  onClick={() => props.handleDelete(item.id)}
                >
                  <Icon className='me-2' icon={trash} />
                  Delete
                </button>
              </div>
            </Card.Body>
          </Card>
        ))
      ) : (
        <h2 className="text-center my-5 text-secondary">No news to show...</h2>
      )}
    </div>
  );
}

export default ArticleList;