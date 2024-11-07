import { Container, Row, Col, Nav } from "react-bootstrap";

function Footer() {
  return (
    <footer className="bg-dark text-white py-5">
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

          <Col md={5}>
            <Col className="d-flex justify-content-between">
              <div>
                <p>
                  Pasilankatu 2
                  <br />
                  00240 Helsinki
                  <br />
                  Finland
                </p>
              </div>

              <div>
                <p>
                  Email: info@druid.fi
                  <br />
                  Phone: +358 20 187 6602
                  <br />
                  &rarr; Contact
                </p>
              </div>
            </Col>

            <Nav className="d-flex justify-content-end mt-4">
              <Nav.Link href="#linkedin" className="text-white">
                LinkedIn
              </Nav.Link>
              <Nav.Link href="#facebook" className="text-white">
                Facebook
              </Nav.Link>
              <Nav.Link href="#x" className="text-white">
                X
              </Nav.Link>
              <Nav.Link href="#instagram" className="text-white">
                Instagram
              </Nav.Link>
              <Nav.Link href="#itewiki" className="text-white">
                Itewiki
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
