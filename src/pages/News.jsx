import React, { useEffect, useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import NewsAPI from '../apis/NewsAPI';
import NewsCard from '../components/News/NewsCard';
import { Icon } from 'react-icons-kit';
import { search } from 'react-icons-kit/icomoon/search';
import 'ldrs/trio';
import TopicsAPI from '../apis/TopicsAPI';
import styles from './pageStyle/news.module.css';
import LoadingPage from './LoadingPage';

function News() {
    const [topicItems, setTopicItems] = useState([]);
    const [newsItems, setNewsItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTopic, setSelectedTopic] = useState('');
    const [searchTitle, setSearchTitle] = useState('');

    const refreshTopicsList = () => {
        TopicsAPI.getAllTopics()
            .then(topics => setTopicItems(topics))
            .catch(error => console.log(error));
    };

    const refreshNewsList = () => {
        NewsAPI.getAllNews()
            .then(newsArticleList => setNewsItems(newsArticleList))
            .catch(error => console.log(error));
    };

    useEffect(() => {
        refreshTopicsList();
        refreshNewsList();
        setLoading(false);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!selectedTopic && !searchTitle) {
          refreshNewsList();
          return;
        }
        const params = new URLSearchParams();
        if (selectedTopic) params.append('topic', selectedTopic);
        if (searchTitle) params.append('title', searchTitle);

        NewsAPI.searchNews(params)
            .then(newsArticleList => setNewsItems(newsArticleList))
            .catch(error => console.log(error));
    };

    if (loading) {
        return (
          <LoadingPage/>
        );
    }

    return (
        <section className='p-2 mt-2'>
          <div className={`${styles.newsHeader} align-items-center mb-3`}>
            <h2 className='fw-bold'>All Recent News</h2>
            <Form onSubmit={handleSearch}>
                <InputGroup>
                    <Form.Select
                        className={`${styles.customSelect}`}
                        value={selectedTopic}
                        onChange={(e) => setSelectedTopic(e.target.value)}
                    >
                        <option className='text-secondary' value=''>select topic</option>
                        {topicItems.map(topic => (
                            <option key={topic.id} value={topic.topicName}>{topic.topicName}</option>
                        ))}
                    </Form.Select>
                    <Form.Control
                        placeholder="Search Title..."
                        className={`${styles.customSearch} bg-body-secondary`}
                        value={searchTitle}
                        onChange={(e) => setSearchTitle(e.target.value)}
                    />
                    <Button type="submit" variant="outline-secondary justify-content-center"><Icon icon={search} size={24} /></Button>
                </InputGroup>
            </Form>
          </div>
          <Container fluid>
            <NewsCard newsItems={newsItems} />
          </Container>
        </section>
    );
}

export default News;
