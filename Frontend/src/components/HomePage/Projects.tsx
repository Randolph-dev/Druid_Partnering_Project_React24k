import { Col, Container, Image, Row } from "react-bootstrap";
import { Field, ImageField, LinkField, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";

interface ProjectsProps {
  section: Paragraph;
}

interface Project extends Paragraph {
  field_title: Field[];
  field_paragraph: Field[];
  field_image_url: ImageField[];
  field_link: LinkField[];
}

export default function Projects(props: ProjectsProps) {
  const { section } = props;
  const {
    field_title,
    field_frontpage_projects,
  } = section;

  const titles = field_title as Field[];
  const projects = field_frontpage_projects as Project[];

  console.log(section);

  if (!section) {
    return <p>Loading</p>;
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-between">

        <Col md={5}>
          {/* {projects
            .slice(1, -1)
            .map((image: { uri: string; title: string }, index: number) => (
              <div key={index} className="my-5">
                <Image src={image.uri} alt={image.title} fluid />
                <h3 className="my-4">City of Helsinki</h3>
                <p>
                  New universal Drupal platform and the revamp of Hel.fi web
                  service - efficient and accessible content production.
                </p>
                <p>&rarr; Read more</p>
              </div>
            ))} */}
        </Col>

        <Col md={6}>
          {titles.map((title, index) => (
            <h1
              className="d-flex justify-content-end"
              dangerouslySetInnerHTML={{ __html: title.value }}
              key={generateFieldKey(title, index)}
            />
          ))}
          {/* <div>
            {images.length > 0 && (
              <div className="my-5">
                <Image
                  src={images[images.length - 1].uri}
                  alt={images[images.length - 1].title}
                  fluid
                />
                <h3 className="my-4">
                  Veikkaus {images[images.length - 1].title}
                </h3>
                <p>
                  New universal Drupal platform and the revamp of Hel.fi web
                  service - efficient and accessible content production.
                </p>
                <p>&rarr; Read more</p>
              </div>
            )}
          </div> */}
        </Col>
      </Row>
    </Container>
  )
}
