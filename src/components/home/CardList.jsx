import React from 'react';
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import styles from './style/home.module.css';

function CardList(props) {
  return (
    <div className='d-flex flex-wrap justify-content-center my-3 p-2'>
      {props.newsItems.length ? (
        props.newsItems.map(item => (
          <Card as={NavLink} to={`/Article/${item.id}`} className={`${styles.newsLink} m-1 text-decoration-none`} key={item.id} style={{ width: '20rem' }}>
            <Card.Body style={{height:'14rem'}}>
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
            </Card.Body>
          </Card>
        ))
      ) :  (
        <h2 className="text-center my-5 text-secondary">No news to show...</h2>
      )}
    </div>
  )
}

export default CardList;
