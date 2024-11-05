import { Container, Row, Col, Nav } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row className="d-flex align-items-center">
          {/* Title Column */}
          <Col md={3}>
            <h4>
              Call or send us a <br /> message
            </h4>
          </Col>

          {/* Navigation Links Column */}
          <Col md={3}>
            <Nav className="flex-column">
              <Nav.Link href="#about" className="text-white">
                About Us
              </Nav.Link>
              <Nav.Link href="#cases" className="text-white">
                Cases
              </Nav.Link>
              <Nav.Link href="#jobs" className="text-white">
                Working with us
              </Nav.Link>
              <Nav.Link href="#blog" className="text-white">
                Blog
              </Nav.Link>
              <Nav.Link href="#contact" className="text-white">
                Contact
              </Nav.Link>
            </Nav>
          </Col>
          <Col></Col>
          {/* Address Column */}
          <Col md={2}>
            <p>
              Pasilankatu 2
              <br />
              00240 Helsinki
              <br />
              Finland
            </p>
          </Col>

          {/* Email Contacts Column */}
          <Col md={2}>
            <p>
              Email: info@druid.fi
              <br />
              Phone: +358 20 187 6602
              <br />
              &rarr; Contact
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
