import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import styles from './pageStyle/Profile.module.css';
import TokenManager from '../apis/TokenManager';
import UsersAPI from '../apis/UsersAPI';
import Icon from 'react-icons-kit';
import { edit, edit3, x, trash2, save } from 'react-icons-kit/feather';

const toggleClasses = (add, changeBtn) => {
    const profileCon = document.querySelector(`.${styles.profileCon}`);
    const profileForm = document.querySelector(`.${styles.ProfileForm}`);

    if (profileCon && profileForm) {
        if (add) {
            changeBtn.classList.add(styles.Hide);
            profileCon.classList.add(styles.editMode);
            profileForm.classList.add(styles.show);
        } else {
            changeBtn.classList.remove(styles.Hide);
            profileCon.classList.remove(styles.editMode);
            profileForm.classList.remove(styles.show);
        }
    }
};

const useApplyEffect = (handleEdit, handleCancel) => {
    useEffect(() => {
        const changeBtn = document.getElementById('Change');
        const cancelBtn = document.getElementById('Cancel');

        if (changeBtn && cancelBtn) {
            changeBtn.addEventListener('click', handleEdit);
            cancelBtn.addEventListener('click', handleCancel);
        }

        return () => {
            if (changeBtn && cancelBtn) {
                changeBtn.removeEventListener('click', handleEdit);
                cancelBtn.removeEventListener('click', handleCancel);
            }
        };
    }, [handleEdit, handleCancel]);
};

function Profile() {
    const [isChangeDisabled, setIsChangeDisabled] = useState(false);
    const [claims, setClaims] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchClaimsAndUserDetails = async () => {
            const userClaims = TokenManager.getClaims();
            setClaims(userClaims);

            if (userClaims?.userId) {
                try {
                    const user = await UsersAPI.getUser(userClaims.userId);
                    setUserDetails(user);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        fetchClaimsAndUserDetails();
    }, []);

    const handleEdit = () => {
        const changeBtn = document.getElementById('Change');
        toggleClasses(true, changeBtn);
        setIsChangeDisabled(true);
    };

    const handleCancel = () => {
        const changeBtn = document.getElementById('Change');
        toggleClasses(false, changeBtn);
        setIsChangeDisabled(false);
    };

    const handleSave = async (e) => {
        setError(null);
        e.preventDefault();

        const editedUser = {
            name: e.target.Name.value,
            email: e.target.Email.value,
            bio: e.target.Bio.value
        };

        try {
            const isSuccess = await UsersAPI.editUser(claims.userId, editedUser);
            if (isSuccess) {
                setUserDetails((prevDetails) => ({
                    ...prevDetails,
                    ...editedUser,
                }));
                handleCancel(); // This will toggle back to view mode and re-enable the Change button
            } else {
                setError('Failed to save user details');
            }
        } catch (error) {
            setError('Failed to save user details');
            console.error('Error saving user details', error);
        }
    };

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const handleConfirmDelete = async () => {
        setError(null);
        try {
            const isSuccess = await UsersAPI.deleteUser(claims.userId);
            if (isSuccess) {
                TokenManager.clear();
                navigate('/login'); // Redirect to the login page
            } else {
                setError('Failed to delete user');
            }
        } catch (error) {
            setError('Failed to delete user');
            console.error('Error deleting user', error);
        } finally {
            handleCloseModal();
        }
    };

    useApplyEffect(handleEdit, handleCancel);

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileCon}>
                <h1 className='fw-bold'>Profile</h1>
                <div className={styles.insideProfileCon}>
                    <div className={styles.profileInfoCon}>
                        <div className={`${styles.profile} p-2 m-1`}>
                            <img src="./assets/User-Profile.svg" alt="profile image" />
                            <p>Displayed Name: {userDetails?.name}</p>
                            <p>Email: {userDetails?.email}</p>
                            <p className='text-muted'>{userDetails?.bio}</p>
                            <button
                                className="btn btn-lg btn-primary mb-2"
                                id="Change"
                                type="button"
                                disabled={isChangeDisabled}
                            > <Icon className='me-2' icon={edit3} size={20} />
                                Change Details
                            </button>
                            <a href='/reset'
                                className="btn btn-sm btn-warning mb-1">
                                <Icon className='me-2' icon={edit} size={14} />
                                Reset Password
                            </a>
                            <button
                                className="btn btn-sm btn-danger pb-2"
                                id="Delete"
                                type="button"
                                onClick={handleShowModal}
                            > <Icon className='me-2' icon={trash2} size={14} />
                                Delete Account
                            </button>
                        </div>
                    </div>
                    <form className={styles.ProfileForm} action="#" onSubmit={handleSave}>
                        <label htmlFor="Name">Name:</label>
                        <input className='form-control form-floating' type="text" name="Name" id="Name" defaultValue={userDetails?.name} />
                        <label htmlFor="Email">Email:</label>
                        <input className='form-control form-floating' type="email" name="Email" id="Email" defaultValue={userDetails?.email} />
                        <label htmlFor="Bio">Bio:</label>
                        <textarea className={`${styles.textareaHeight} form-floating`} name="Bio" id="Bio" defaultValue={userDetails?.bio} />
                        <button className="btn btn-lg btn-success mb-1" id="Save" type="submit"><Icon className='me-2' icon={save} size={20} />Save</button>
                        <button className="btn btn-lg btn-danger mb-1" id="Cancel" type="button"><Icon className='me-2' icon={x} size={20} />Cancel</button>
                    </form>
                </div>   
                {error && <div className="alert alert-danger mt-3" style={{textAlign:"center"}}>{error}</div>}
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete your account? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleConfirmDelete}>
                        Delete Account
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Profile;
