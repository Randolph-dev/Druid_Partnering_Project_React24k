import { Button, Col, Container, Image, Row } from "react-bootstrap";
import { Field, ImageField, LinkField, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";
import { Link } from "react-router-dom";

interface DruidsProps {
  section: Paragraph;
}

interface Member extends Paragraph {
  field_image_url: ImageField[];
  field_member_name: Field[];
  field_paragraph: Field[];
}

export default function Druids(props: DruidsProps) {
  const { section } = props;
  const { field_title, field_link, field_jobspage_team_members } = section;

  const titles = field_title as Field[];
  const links = field_link as LinkField[];

  const members = field_jobspage_team_members as Member[];

  if (!section) {
    return <p>Loading</p>;
  }

  return (
    <Container className="my-5 py-5 bg-black text-light" fluid>
      {titles.map((title, index) => (
        <h1
          className="py-5 text-center"
          dangerouslySetInnerHTML={{ __html: title.value }}
          key={generateFieldKey(title, index)}
        />
      ))}

      {/* Team Members */}
      <Row className="d-flex justify-content-center">
        {members.map((member) => (
          <Col
            md={3}
            sm={6}
            xs={12}
            className="text-center pb-5"
            key={member.id[0].value}
          >
            {/* Circular Member Image */}
            <div
              className="d-flex justify-content-center align-items-center rounded-circle bg-light overflow-hidden mx-auto"
              style={{
                width: "180px",
                height: "180px",
              }}
            >
              <Image
                src={member.field_image_url[0].uri}
                alt={member.field_image_url[0].title}
                fluid
              />
            </div>

            {/* Member Name */}
            {member.field_member_name.map((name, nameIndex) => (
              <h5
                key={generateFieldKey(name, nameIndex)}
                className="mt-3"
                dangerouslySetInnerHTML={{ __html: name.value }}
              />
            ))}

            {/* Member Paragraph */}
            {member.field_paragraph.map((paragraph, paraIndex) => (
              <p
                key={generateFieldKey(paragraph, paraIndex)}
                dangerouslySetInnerHTML={{ __html: paragraph.value }}
              />
            ))}
          </Col>
        ))}
      </Row>

      {/* Centered Button */}
      <Col className="d-flex justify-content-center mt-4">
        {links.map((link, index) => (
          <Button
            key={`${index}_${link.title}`}
            className="p-3 px-5 rounded-pill border-0"
            style={{
              backgroundColor: "#EF3428",
            }}
          >
            <Link
              to={link.uri}
              key={index}
              style={{
                textDecoration: "none",
                color: "white",
              }}
              dangerouslySetInnerHTML={{ __html: link.title }}
            />
          </Button>
        ))}
      </Col>
    </Container>
  );
}
