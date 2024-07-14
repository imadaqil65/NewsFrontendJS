import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

const Footer = () => {
  return (
    <footer className='mt-auto'>
      <Navbar className="bg-body-tertiary bottom">
        <Container>
          <Navbar.Brand>
            <img
              alt="ꦢꦶ"
              src="/Dipadunia-logo.svg"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            <span id='serif-font'>Dipadunia News Outlet</span> &reg;
          </Navbar.Brand>
        </Container>
      </Navbar>
    </footer>
  )
}

export default Footer