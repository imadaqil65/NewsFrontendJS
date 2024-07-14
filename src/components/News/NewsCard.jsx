import React from 'react'
import Card from 'react-bootstrap/Card';
import { NavLink } from 'react-router-dom';
import style from './style/newscard.module.css'

function NewsCard(props) {
  return (
    <div className='d-flex flex-wrap justify-content-center'>
      {props.newsItems.length ?
        (props.newsItems.map(item => (
          <Card as={NavLink} to={`/Article/${item.id}`} className={`${style.newsLink} mx-1 mb-3 text-decoration-none`} key={item.id}>
            <Card.Header as="h4" className='fw-bold'>{item.title}</Card.Header>
            <Card.Body>
              <Card.Subtitle className="mb-2 text-muted">
                Topic: {item.topic.topicName}
              </Card.Subtitle>
              <Card.Subtitle className="mb-4 text-muted">
                Published: {new Date(item.dateTime).toDateString()}
              </Card.Subtitle>
              <Card.Text>
              {item.content.substring(0, 400)
                        .substring(0, item.content.substring(0, 400).lastIndexOf(' ')) +
                        '...'}
              </Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div className='d-flex flex-column justify-content-center'>
          <h3 className='text-secondary'>No news to show...</h3>
        </div>
      )}
    </div>
  )
}

export default NewsCard
