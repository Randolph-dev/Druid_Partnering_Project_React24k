import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

const NavBar: React.FC = () => {
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar expand={false} className="bg-white" style={{ borderBottom: '0.5px solid #000' }}>
      <Container>
        <Navbar.Brand as={Link} to="/">Druid</Navbar.Brand>

        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />

        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={show}
          onHide={handleClose}
          className="bg-dark text-light"
        >
          <Offcanvas.Header className="bg-dark text-light">
            <button 
              type="button" 
              className="btn-close btn-close-white" 
              aria-label="Close" 
              onClick={handleClose} 
              style={{
                position: 'absolute',
                top: '10%',  
                right: '4rem',  
              }}
            ></button>
          </Offcanvas.Header>

          <Offcanvas.Body className="d-flex flex-column justify-content-center">
            <Nav className="flex-column text-center">
              <Nav.Link as={Link} to="/about-us" onClick={handleClose} className="text-light mb-3" style={{ fontSize: '26px' }}>About Us</Nav.Link>
              <Nav.Link as={Link} to="/cases" onClick={handleClose} className="text-light mb-3" style={{ fontSize: '26px' }}>Cases</Nav.Link>
              <Nav.Link as={Link} to="/services" onClick={handleClose} className="text-light mb-3" style={{ fontSize: '26px' }}>Services</Nav.Link>
              <Nav.Link as={Link} to="/working-with-us" onClick={handleClose} className="text-light mb-3" style={{ fontSize: '26px' }}>Working with us</Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={handleClose} className="text-light mb-3" style={{ fontSize: '26px' }}>Contact</Nav.Link>
              <Nav.Link as={Link} to="/blog" onClick={handleClose} className="text-light mb-3" style={{ fontSize: '26px' }}>Blog</Nav.Link>
              <Nav.Link as={Link} to="#" onClick={handleClose} className="text-light mb-3" style={{ fontSize: '26px' }}>english | suomi</Nav.Link>
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default NavBar;