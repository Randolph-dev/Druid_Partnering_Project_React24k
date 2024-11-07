import { useEffect } from "react";
import fetchContentFromDrupal from "../lib/drupal/drupal-content-api";
import { useAppSelector } from "../hooks/hooks";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

export default function Jobs() {
  const jsonApiLinks = useAppSelector((state) => state.drupal.jsonApiLinks);
  useEffect(() => {
    // the link node--page will return all 3 pages of type "basic pages", we just want the last one which is Jobs
    fetchContentFromDrupal(jsonApiLinks["node--page"]).then((res) =>
      console.log(res.data[2])
    );
  }, [jsonApiLinks]);

  return (
    <Container className="p-0" fluid>
      <div>Jobs</div>
      <Container className="my-5">
        <Row className="d-flex justify-content-between">
          <Col md={6}>
            <h2>For developers by developers.</h2>
            <p>
              We're all about tackling major content management gigs using
              Drupal as our prime playground. Here at Druid, we're all about
              crafting a cooler web - think open-source vibes and an
              open-for-anything mindset. From user-friendly sites to apps that
              make life smoother, we're all in on cracking puzzles and creating
              top-tier solutions that'll really make a difference down the road.
              Our crew of folks? We're all about whipping up slick digital
              solutions with heart and tech know-how. Wanna dive in and vibe
              with us? You're more than welcome!
            </p>

            <Col className="mt-5">
              <Button
                className="me-2 p-3"
                style={{ backgroundColor: "#EF3428" }}
              >
                Connect
              </Button>
              <Button className="p-3 " style={{ backgroundColor: "#EF3428" }}>
                Job openings
              </Button>
            </Col>
          </Col>
          <Col md={5}>
            <Image
              src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              style={{ width: "100%" }}
            />
            <p className="text-end">
              Above our founders Samuli, Tero, Arto and Roni with our <br />
              Production Director Pasi.
            </p>
          </Col>
        </Row>
      </Container>

      <Container className="my-5">
        <h2 className="py-5 text-center">
          Perks and Benefits working at Druid
        </h2>
        <Row className="d-flex justify-content-center">
          <Col md={5}>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti
              sed optio consequuntur assumenda libero eaque? Iusto consequatur
              nam a temporibus quam porro ex officiis non eos, et est, laborum
              optio.
            </p>
          </Col>
          <Col md={5}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illum
              totam adipisci, dolor quia aliquam impedit? Porro amet sint
              quaerat, veritatis excepturi laudantium numquam, earum dolorum
              assumenda labore eligendi, ipsam eum?
            </p>
          </Col>
        </Row>
      </Container>
      <Container className="my-5 py-5 bg-dark text-light" fluid>
        <h2 className="text-center">Meet the druids</h2>
      </Container>
    </Container>
  );
}
