import { Col, Container, Image, Row } from "react-bootstrap";
import { Field, ImageField, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";

interface AdvertiseProps {
  section: Paragraph;
}

export default function Advertise(props: AdvertiseProps) {
  const { section } = props;
  const { field_title, field_paragraph, field_image_url } = section;

  const titles = field_title as Field[];
  const paragraphs = field_paragraph as Field[];
  const images = field_image_url as ImageField[];

  if (!section) {
    return <p>Loading</p>;
  }

  // console.log(section);

  return (
    <Container fluid className="my-5 py-5 bg-black text-light">
      {titles.map((title, index) => (
        <h1
          key={generateFieldKey(title, index)}
          className="text-center my-5"
          dangerouslySetInnerHTML={{ __html: title.value }}
        />
      ))}
      <Row className="d-flex justify-content-center">
        <Col md={5}>
          {images && images.length > 0 && (
            <Image src={images[0].uri} alt={images[0].title} fluid />
          )}
        </Col>
        <Col md={5} className="d-flex align-items-center p-3">
          <div>
            {paragraphs.map((paragraph, index) => (
              <p
                key={generateFieldKey(paragraph, index)}
                dangerouslySetInnerHTML={{ __html: paragraph.value }}
              />
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
}
