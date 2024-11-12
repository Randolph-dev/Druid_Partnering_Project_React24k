import { useEffect } from "react";
import fetchContentFromDrupal from "../lib/drupal/drupal-content-api";
import { useAppSelector } from "../hooks/hooks";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

export default function Consultation() {
  const jsonApiLinks = useAppSelector((state) => state.drupal.jsonApiLinks);

  useEffect(() => {
    // the link node--page will return all 3 pages of type "service pages", we just want the last one which is consultation
    fetchContentFromDrupal(jsonApiLinks["node--service"]).then((res) =>
      console.log(res.data[2])
    );
  }, [jsonApiLinks]);

  return (
    <Container className="my-5">
      <Row className="my-5">
        <h1 className="text-center">Technology Consulting</h1>
      </Row>

      <Row className="my-5">
        <Col>
          <h3>
            Discovery Tour guarantees a quick and risk-free start for a
            development project
          </h3>
          <p>
            Is your web service in need of a shake-up, but you don't know where
            to start or how to tackle it? Join us on an adventure to explore
            your digital service, and we'll work together to identify what you
            need to succeed. We'll put our expertise to work and wow you with
            solutions.
          </p>
        </Col>
      </Row>

      <Row>
        <Col>
          <p>
            We've run the Discovery Tour with fascinating cases. Each case is
            unique, but we use the same finely tuned process, adjusting it to
            different needs. We report with an analysis of the current
            situation, then we add concrete development proposals and a
            preliminary cost estimate. This gives you clear options to upgrade
            an old service or create something new.
          </p>
          <p>
            The Discovery Tour allows for quick testing of new service concepts
            without risk. We have successfully completed proof of concept
            implementations with many customers.
          </p>
        </Col>
        <Col>
          <img src="your-image-source.jpg" alt="Discovery Tour Image" />
        </Col>
      </Row>

      <Row className="my-5">
        <h3 className="my-5">When to take the Discovery Tour?</h3>
        <p>
          The Discovery Tour makes life easier and helps kick-start your
          development project, if
        </p>
        <ListGroup as="ul" className="my-3">
          <ListGroup.Item as="li" style={{ listStyleType: "disc" }}>
            You lack technical know-how to evaluate alternatives and define the
            project requirements
          </ListGroup.Item>
          <ListGroup.Item as="li" style={{ listStyleType: "disc" }}>
            You are looking for fresh solutions to serve a changing customer
            base or for new customer needs
          </ListGroup.Item>
          <ListGroup.Item as="li" style={{ listStyleType: "disc" }}>
            Staying on budget and on schedule is important and project
            management needs support
          </ListGroup.Item>
          <ListGroup.Item as="li" style={{ listStyleType: "disc" }}>
            Your goal is to do the right things in the right way in one go.
          </ListGroup.Item>
        </ListGroup>
      </Row>
    </Container>
  );
}
