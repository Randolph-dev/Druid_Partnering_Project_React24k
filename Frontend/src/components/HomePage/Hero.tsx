import { Col, Container, Row } from "react-bootstrap";
import { Field } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";

interface HeroProps {
  section: {
    field_frontpage_hero_intro_parag: Field[];
  };
}

export default function Hero(props: HeroProps) {
  const { section: { field_frontpage_hero_intro_parag: fields } } = props;

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
