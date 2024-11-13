import { Col, Container, Row } from "react-bootstrap";
import { Field, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";

interface ServiceProps {
  section: {
    field_title: Field[];
    field_frontpage_service_pakages: Service[];
  };
}

interface Service extends Paragraph {
  field_title: Field[];
  field_paragraph: Field[];
}

export default function Service(props: ServiceProps) {
  const { section } = props;
  const { field_title: titles, field_frontpage_service_pakages: services } = section;

  if (!section) {
    return <p>Loading</p>;
  };

  // console.log(services);

  return (
    <Container className="my-5">
      <Row>
        <Col className="text-center">
          {titles.map((title, index) => (
            <h1
              key={generateFieldKey(title, index)} className="my-5"
              dangerouslySetInnerHTML={{ __html: title.value }}
            />
          ))}
        </Col>
      </Row>
      <Row className="d-flex justify-content-between">
        {services.map((service) =>
          <Col md={5} className="my-5" key={service.id[0].value}>
            {service.field_title.map((title, index) => (
              <h5
                key={generateFieldKey(title, index)}
                dangerouslySetInnerHTML={{ __html: title.value }}
              />
            ))}
            <p className="d-flex">
              {service.field_paragraph.map((paragraph, index) => (
                <span
                  key={generateFieldKey(paragraph, index)}
                  dangerouslySetInnerHTML={{ __html: paragraph.value }}
                />
              ))}
            </p>
          </Col>
        )}
      </Row>
    </Container>
  )
}
