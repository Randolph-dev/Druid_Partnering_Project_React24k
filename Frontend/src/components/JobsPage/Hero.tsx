import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Field, ImageField, LinkField, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";
import { Link } from "react-router-dom";

interface HeroProps {
  section: Paragraph;
}

export default function Hero(props: HeroProps) {
  const { section } = props;
  const { field_title, field_paragraph, field_image_url, field_link } = section;

  const titles = field_title as Field[];
  const paragraphs = field_paragraph as Field[];
  const images = field_image_url as ImageField[];
  const links = field_link as LinkField[];

  if (!section) {
    return <p>Loading</p>;
  }

  return (
    <Container className="p-0" fluid>
      <Container className="d-flex align-items-center my-5 py-5">
        <Row className="d-flex justify-content-between">
          <Col md={6}>
            {titles.map((title, index) => (
              <h1
                key={generateFieldKey(title, index)}
                dangerouslySetInnerHTML={{ __html: title.value }}
              />
            ))}
            <div className="py-3">
              {paragraphs.slice(0, 2).map((title, index) => (
                <p
                  key={generateFieldKey(title, index)}
                  dangerouslySetInnerHTML={{ __html: title.value }}
                  style={{ fontSize: "20px" }}
                />
              ))}
            </div>

            <Col className="my-4">
              {links.map((link, index) => (
                <Button
                  key={`${index}_${link.title}`}
                  className="me-2 p-3 px-5 rounded-pill border-0"
                  style={{ backgroundColor: "#EF3428" }}
                >
                  <Link
                    to={link.uri}
                    key={index}
                    style={{ textDecoration: "none", color: "white" }}
                    dangerouslySetInnerHTML={{ __html: link.title }}
                  />
                </Button>
              ))}
            </Col>
          </Col>
          <Col md={5}>
            {images && images.length > 0 && (
              <Image src={images[0].uri} alt={images[0].title} fluid />
            )}
            {paragraphs.slice(2).map((title, index) => (
              <p
                className="pt-3 text-end"
                key={generateFieldKey(title, index)}
                dangerouslySetInnerHTML={{ __html: title.value }}
              />
            ))}
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
