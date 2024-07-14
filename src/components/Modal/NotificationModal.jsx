import React from 'react';
import { Modal, Button, NavLink } from 'react-bootstrap';
import Icon from 'react-icons-kit';
import { bell } from 'react-icons-kit/feather';

function NotificationModal({ show, handleClose, notification }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title><Icon className='me-2' icon={bell} size={35}/> New Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {notification ? (
          <>
            <h5 className='fw-bold'>{notification.title}</h5>
            <p>{notification.text}</p>
          </>
        ) : (
          <p>Error retrieving notification</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {notification && notification.id && (
        <a className='btn btn-primary' href={`article/${notification.id}`}>
            Read Article
        </a>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default NotificationModal;
