import { Col, Container, Row } from "react-bootstrap";

type Field = {
  value: string;
  format: string;
};

export interface HeroProps {
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
              key={`${index}_${field.value.slice(0, 10)}`}
              className="h1 fw-light"
              dangerouslySetInnerHTML={{ __html: fields[0].value }}
            ></p>
          )}
        </Col>
      </Row>
    </Container>
  )
}
