import { Col, Container, Image, Row } from "react-bootstrap";
import { Field, ImageField, LinkField, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";
import { Link } from "react-router-dom";

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
  const heroProject = projects[0];

  // console.log(section);

  if (!section) {
    return <p>Loading</p>;
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-between">

        <Col md={5}>
          {projects
            .slice(1) // skip the first project, it will show as a hero
            .map((project) => (
              <div key={project.id[0].value} className="my-5">
                <Image
                  src={project.field_image_url[0].uri}
                  alt={project.field_image_url[0].title}
                  fluid
                />
                {project.field_title.map((title, index) => (
                  <h3
                    key={generateFieldKey(title, index)}
                    className="my-4"
                    dangerouslySetInnerHTML={{ __html: title.value }}
                  />
                ))}
                {project.field_paragraph.map((paragraph, index) => (
                  <p
                    key={generateFieldKey(paragraph, index)}
                    dangerouslySetInnerHTML={{ __html: paragraph.value }}
                  />
                ))}
                {project.field_link.map((link, index) =>
                  <Link
                    to={link.uri}
                    key={index}
                    style={{ textDecoration: "none", color: "black" }}
                    dangerouslySetInnerHTML={{ __html: link.title }}
                  />
                )}
              </div>
            ))}
        </Col>


        <Col md={6}>
          {titles.map((title, index) => (
            <h1
              className="d-flex justify-content-end"
              dangerouslySetInnerHTML={{ __html: title.value }}
              key={generateFieldKey(title, index)}
            />
          ))}
          <div>
            <div className="my-5">
              <Image
                src={heroProject.field_image_url[0].uri}
                alt={heroProject.field_image_url[0].title}
                fluid
              />
              {heroProject.field_title.map((title, index) => (
                <h3
                  key={generateFieldKey(title, index)}
                  className="my-4"
                  dangerouslySetInnerHTML={{ __html: title.value }}
                />
              ))}
              {heroProject.field_paragraph.map((paragraph, index) => (
                <p
                  key={generateFieldKey(paragraph, index)}
                  dangerouslySetInnerHTML={{ __html: paragraph.value }}
                />
              ))}
              {heroProject.field_link.map((link, index) =>
                <Link
                  to={link.uri}
                  key={index}
                  style={{ textDecoration: "none", color: "black" }}
                  dangerouslySetInnerHTML={{ __html: link.title }}
                />
              )}
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
