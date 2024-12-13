import { useEffect } from "react";
import fetchContentFromDrupal from "../lib/drupal/drupal-content-api";
import { useAppSelector } from "../hooks/hooks";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function Projects() {
  const jsonApiLinks = useAppSelector((state) => state.drupal.jsonApiLinks);

  useEffect(() => {
    // the link node--page will return all 3 pages of type "service pages", we just want the first one which is Projects
    fetchContentFromDrupal(jsonApiLinks["node--service"]).then((res) =>
      console.log(res.data[0])
    );
    // fetch all projects from node--projects
    fetchContentFromDrupal(jsonApiLinks["node--projects"]).then((res) =>
      console.log(res.data)
    );
  }, [jsonApiLinks]);

  return (
    <Container>
      <Container
        className="d-flex align-items-center"
        style={{ height: "50vh" }}
      >
        <Row className="my-5">
          <h1>
            Customer <i>cases</i>
          </h1>
          <p className="py-4">
            We have well over a hundred projects behind us. Take a <br /> look
            at these examples of our successful collaborations.
          </p>
          <div className="d-flex gap-2">
            <Button
              variant="outline-danger"
              className="text-dark rounded-pill px-4"
            >
              Web Service
            </Button>
            <Button
              variant="outline-danger"
              className="text-dark rounded-pill px-4"
            >
              Websites
            </Button>
            <Button
              variant="outline-danger"
              className="text-dark rounded-pill px-4"
            >
              Webshop
            </Button>
          </div>
        </Row>
      </Container>
      <Row xs={1} md={2} className="g-4 mb-5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Col key={idx}>
            <Card>
              <Card.Img
                variant="top"
                src="https://images.ctfassets.net/ihx0a8chifpc/GTlzd4xkx4LmWsG1Kw1BB/ad1834111245e6ee1da4372f1eb5876c/placeholder.com-1280x720.png?w=1920&q=60&fm=webp"
              />
              <Card.Body>
                <div className="d-flex py-4 justify-content-between">
                  <Card.Title>Taitotalo</Card.Title>
                  <span>CMS/Website</span>
                </div>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
                <p>&rarr; Read more</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
