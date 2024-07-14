import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Icon from 'react-icons-kit';
import { trash } from 'react-icons-kit/feather';
import CommentAPI from '../../apis/CommentAPI';
import DeletionModal from '../Modal/DeletionModal';

function Comments(props) {
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const handleDelete = async () => {
    try {
      const success = await CommentAPI.deleteComment(commentToDelete);
      if (success) {
        props.refreshArticle(); // Call the refresh function passed from the parent
        console.log('Comment deleted successfully');
      } else {
        console.error('Failed to delete comment');
      }
    } catch (err) {
      console.error('Failed to delete comment', err);
    } finally {
      setShowModal(false);
      setCommentToDelete(null);
    }
  };

  const confirmDelete = (commentId) => {
    setCommentToDelete(commentId);
    setShowModal(true);
  };

  return (
    <>
      {props.commentList.length === 0 ? (
        <h4 className="text-secondary">No comments yet...</h4>
      ) : (
        props.commentList.map(comment => (
          <Card key={comment.id} className={`${props.styles.commentStyle} d-flex flex-column mb-2 bg-body-secondary`}>
            <Card.Header>
              <h5 className="fw-bold">{comment.user}</h5>
              {props.user && props.user === comment.userId && (
                <div className="d-flex flex-wrap align-items-center">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => confirmDelete(comment.id)}
                  >
                    <Icon className="me-2" icon={trash} />
                    Delete
                  </button>
                </div>
              )}
            </Card.Header>
            <Card.Body>
              <Card.Text>{comment.content}</Card.Text>
            </Card.Body>
          </Card>
        ))
      )}
      <DeletionModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleDelete}
        message="Are you sure you want to delete this comment?"
      />
    </>
  );
}

export default Comments;
