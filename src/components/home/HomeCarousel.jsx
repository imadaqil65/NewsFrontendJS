import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import styles from './style/home.module.css'

function HomeCarousel(props) {
  

  return (
    <section id='home' className='hero-block'>
      <Carousel data-bs-theme="dark">
        {
          props.carouselImg.map(carImg => {
            return (
              <Carousel.Item key={carImg.id}>
                <img
                  className={`${styles.imageSize} d-block w-100`}
                  src={carImg.image}
                  alt={carImg.credit}
                />
                <Carousel.Caption className={`${styles.shadow} align-items-top text-light`}>
                  <h1 className='fw-bold'>{carImg.title}</h1>
                  <p className='fw-bold'>{carImg.description}</p>
                </Carousel.Caption>
              </Carousel.Item>
            )
          })
        }
      </Carousel>
    </section>
  )
}

export default HomeCarousel