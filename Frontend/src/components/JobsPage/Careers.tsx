import { Button, Col, Container, Row } from "react-bootstrap";
import { Field, LinkField, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";
import { Link } from "react-router-dom";

interface CareersProps {
  section: Paragraph;
}

interface Career extends Paragraph {
  field_link: LinkField[];
  field_job_tags: Field[];
}

export default function Careers(props: CareersProps) {
  const { section } = props;
  const { field_jobspage_careers, field_title, field_link } = section;

  const careers = field_jobspage_careers as Career[];
  const titles = field_title as Field[];
  const links = field_link as LinkField[];

  if (!section) {
    return <p>Loading</p>;
  }

  return (
    <Container className="my-5">
      {titles.map((title, index) => (
        <h1
          className="py-5 text-center"
          key={generateFieldKey(title, index)}
          dangerouslySetInnerHTML={{ __html: title.value }}
        />
      ))}

      <Row className="d-flex justify-content-center">
        <Col xs="auto" className="text-center">
          {careers.map((career, index) => (
            <div key={`career_${index}`} className="my-4">
              {/* Render Job Link */}
              {career.field_link.map((link, i) => (
                <Link
                  to={link.uri}
                  key={`link_${index}_${i}`}
                  className="text-danger text-decoration-none"
                >
                  {link.title}
                </Link>
              ))}

              {/* Render Job Tags */}
              <div className="job-tags mt-2">
                {career.field_job_tags.map((tag, i) => (
                  <span key={`tag_${index}_${i}`} className="text-dark me-1">
                    {tag.value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Col>
      </Row>

      <Col className="d-flex justify-content-center mt-4">
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
    </Container>
  );
}
