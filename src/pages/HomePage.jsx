import React, { useEffect, useState } from 'react'
import NewsAPI from '../apis/NewsAPI.js'
import Carouselbody from '../components/home/HomeCarousel.jsx'
import images from '../components/statics/carouselimages.jsx'
import { Container } from 'react-bootstrap'
import CardList from '../components/home/CardList.jsx'
import 'ldrs/trio'
import LoadingPage from './LoadingPage.jsx'

function Home() {
  const [newsItems, setNewsItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const refreshNewsList = () => {
    NewsAPI.get5Newest()
    .then(newsArticleList => setNewsItems(newsArticleList))
    .catch(error => console.log(error));
    setLoading(false);
  }

  useEffect(() => {
    refreshNewsList()
  }, []);

  return (
    <section>
      <Carouselbody carouselImg={images}/>
      <Container fluid>
        <div className="d-flex flex-column align-items-center">
          <h2 className='fw-bold'>Recent News Articles</h2>
          <div className="subtitle">Check out our latest news</div>
        </div>
        {loading && loading === true ? (
          <div className='d-flex flex-column justify-content-center align-items-center'>
            <l-trio size="60" color="#c4c8cf"></l-trio>
            <h5 className='text-secondary mt-3'>Loading . . .</h5>
          </div>
        ) : (
            <CardList newsItems={newsItems}/>
        )}
      </Container>
    </section>
  )
}

export default Home