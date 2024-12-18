import { Col, Container, Row } from "react-bootstrap";
import { Field, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";
import { useEffect, useState } from "react";

interface HeroProps {
  section: Paragraph;
}

export default function Hero(props: HeroProps) {
  const {
    section: { field_frontpage_hero_intro_parag },
  } = props;
  const fields = field_frontpage_hero_intro_parag as Field[];

  if (!fields) {
    return <p>Loading</p>;
  }
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container
      className="d-flex align-items-center"
      style={{
        height: windowWidth >= 992 ? "80vh" : "30vh",
      }}
    >
      <Row>
        <Col lg={6}>
          {fields.map((field, index) => (
            <p
              key={generateFieldKey(field, index)}
              className="h1 fw-light"
              dangerouslySetInnerHTML={{ __html: field.value }}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
}
