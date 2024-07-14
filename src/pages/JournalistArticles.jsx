import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import NewsAPI from '../apis/NewsAPI';
import LoadingPage from './LoadingPage';
import ArticleList from '../components/journalist/ArticleList';
import TokenManager from '../apis/TokenManager';
import DeletionModal from '../components/Modal/DeletionModal';

function JournalistArticle() {
    const id = TokenManager.getClaims().userId;
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [articleToDelete, setArticleToDelete] = useState(null);

    const refreshNewsList = () => {
        NewsAPI.getJournalistNews(id)
            .then(newsArticleList => setNewsItems(newsArticleList))
            .catch(error => console.log(error));
    };

    const handleDelete = async () => {
        if (articleToDelete) {
            try {
                const success = await NewsAPI.deleteArticle(articleToDelete);
                if (success) {
                    refreshNewsList();
                    console.log('Article deleted successfully');
                } else {
                    setError('Failed to delete article');
                }
            } catch (err) {
                setError('Failed to delete article');
                console.error(err);
            } finally {
                setShowModal(false);
                setArticleToDelete(null);
            }
        }
    };

    const confirmDelete = (newsId) => {
        setArticleToDelete(newsId);
        setShowModal(true);
    };

    useEffect(() => {
        refreshNewsList();
        setLoading(false);
    }, []);

    if (loading) {
        return <LoadingPage />;
    }

    return (
        <section className='p-2 mt-2'>
            <h2 className='mb-4 ps-3 fw-bold'>News You Made</h2>
            <Container fluid>
                <ArticleList handleDelete={confirmDelete} newsItems={newsItems} />
            </Container>
            <DeletionModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                handleConfirm={handleDelete}
                message="Are you sure you want to delete this article?"
            />
        </section>
    );
}

export default JournalistArticle;
