import { Col, Container, Row } from "react-bootstrap";
import { Field, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";

interface BenefitsProps {
  section: Paragraph;
}

interface Benefit extends Paragraph {
  field_title: Field[];
  field_paragraph: Field[];
}

export default function Benefits(props: BenefitsProps) {
  const { section } = props;
  const { field_title, field_jobspage_benefits } = section;

  const titles = field_title as Field[];
  const benefits = field_jobspage_benefits as Benefit[];

  if (!section) {
    return <p>Loading</p>;
  }

  return (
    <Container>
      {titles.map((title, index) => (
        <h1
          className="py-5 text-center"
          dangerouslySetInnerHTML={{ __html: title.value }}
          key={generateFieldKey(title, index)}
        />
      ))}

      <Row className="d-flex justify-content-center">
        {benefits.map((benefit) => (
          <Col md={5} className="pb-5">
            {benefit.field_title.map((title, index) => (
              <h5
                key={generateFieldKey(title, index)}
                dangerouslySetInnerHTML={{ __html: title.value }}
              />
            ))}
            {benefit.field_paragraph.map((paragraph, index) => (
              <p
                key={generateFieldKey(paragraph, index)}
                dangerouslySetInnerHTML={{ __html: paragraph.value }}
              />
            ))}
          </Col>
        ))}
      </Row>
    </Container>
  );
}
