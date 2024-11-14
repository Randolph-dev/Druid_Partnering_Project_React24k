import { Col, Container, Row } from "react-bootstrap";
import { Field, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";

interface HeroProps {
  section: Paragraph;
}

export default function Hero(props: HeroProps) {
  const { section: { field_frontpage_hero_intro_parag } } = props;
  const fields = field_frontpage_hero_intro_parag as Field[];

  if (!fields) {
    return <p>Loading</p>;
  };

  return (
    <Container
      className="d-flex align-items-center"
      style={{ height: "80vh" }}
    >
      <Row>
        <Col lg={6}>
          {fields.map((field, index) =>
            <p
              key={generateFieldKey(field, index)}
              className="h1 fw-light"
              dangerouslySetInnerHTML={{ __html: field.value }}
            />
          )}
        </Col>
      </Row>
    </Container>
  )
}
