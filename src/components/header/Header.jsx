import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import './header.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Col from 'react-bootstrap/Col';
import Badge from 'react-bootstrap/Badge';
import TokenManager from '../../apis/TokenManager';
import { Icon } from 'react-icons-kit';
import { paperclip, layers, tag, home, alignCenter, logIn, logOut, user, userPlus, bell, fileText, filePlus } from 'react-icons-kit/feather';
import DeletionModal from '../Modal/DeletionModal';

function Header() {
  const [claims, setClaims] = useState(null);
  const [links, setLinks] = useState([]);
  const [drop, setDrop] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userClaims = TokenManager.getClaims();
    setClaims(userClaims);

    let navigationLinks = [
      { id: 1, path: "/", text: "Home", buttonIcon: home },
      { id: 2, path: "/News", text: "News", buttonIcon: alignCenter },
    ];

    let dropdownLinks = [];

    if (!userClaims) {
      navigationLinks.push({ id: 3, path: "/Login", text: "Login", buttonIcon: logIn });
      navigationLinks.push({ id: 4, path: "/Signup", text: "Sign Up", buttonIcon: userPlus });
    } else {
      if (userClaims.role === 'ADMIN') {
        dropdownLinks.push({ id: 1, path: "/topic", text: "Topics", buttonIcon: tag });
        dropdownLinks.push({ id: 2, path: "/Signup/Admin", text: "Create Admin", buttonIcon: userPlus });
        dropdownLinks.push({ id: 3, path: "/Signup/Journalist", text: "Create Journalist", buttonIcon: userPlus });
      } else if (userClaims.role === 'JOURNALIST') {
        dropdownLinks.push({ id: 3, path: "/create-article", text: "Create Article", buttonIcon: filePlus });
        dropdownLinks.push({ id: 4, path: "/journalist-articles", text: "Your Articles", buttonIcon: fileText });
      }
    }

    setLinks(navigationLinks);
    setDrop(dropdownLinks);
  }, []);

  const handleLogout = () => {
    TokenManager.clear();
    setClaims(null);
    navigate('/');
    window.location.reload();
  };

  const confirmLogout = () => {
    setShowModal(true);
  };

  const getDropdownTitle = () => {
    if (claims.role === 'ADMIN') {
      return <span><Icon className='me-2' icon={paperclip} size={20}/> Admin</span>;
    } else if (claims.role === 'JOURNALIST') {
      return <span><Icon className='me-2' icon={layers} size={20}/> Journalist</span>;
    }
  };

  return (
    <div className='bg-body-secondary'>
      <Navbar expand="lg" className="nav-layout">
        <Navbar.Brand as={NavLink} to="/">
          <Col>
            <Badge id='serif-font' bg="danger">Dipadunia</Badge>
          </Col>
          <Col className='fw-bold'><span>News Outlet</span></Col>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="d-flex flex-wrap link-secondary fw-bold text-decoration-none ms-auto">
            {links.map(link => (
              <Nav.Link key={link.id} as={NavLink} to={link.path}>
                <Icon className='me-2' icon={link.buttonIcon} size={20} />{link.text}
              </Nav.Link>
            ))}
            {claims && claims.role !== 'READER' && (
              <NavDropdown title={getDropdownTitle()} id="role-nav-dropdown">
                {drop.map(link => (
                  <NavDropdown.Item key={link.id} className="link-secondary fw-bold text-decoration-none" as={NavLink} to={link.path}>
                    <Icon className='me-2' icon={link.buttonIcon} size={20} />{link.text}
                  </NavDropdown.Item>
                ))}
              </NavDropdown>
            )}
            {claims && (
              <NavDropdown title={<span><Icon className='me-2' icon={user} size={20}/> User</span>}>
                <NavDropdown.Item className="link-secondary fw-bold text-decoration-none" as={NavLink} to='/profile'>
                  <Icon className='me-2' icon={user} size={20} />Profile
                </NavDropdown.Item>
                <NavDropdown.Item className="link-danger fw-bold text-decoration-none" onClick={confirmLogout}>
                  <Icon className='me-2' icon={logOut} size={20} />Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <DeletionModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleConfirm={handleLogout}
        message="Are you sure you want to log out?"
      />
    </div>
  );
}

export default Header;
