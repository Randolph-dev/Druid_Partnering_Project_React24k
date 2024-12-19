import { Card, Container, Row } from "react-bootstrap";
import { JsonApiDataAttributes } from "../lib/drupal/drupal-content-api";

interface Props {
  teamMembersData: JsonApiDataAttributes | null;
}

interface JsonApiTeamMemberData {
  drupal_internal__nid: number;
  title: string;
  field_avatar_url: {
    uri: string;
    title: string;
    options: any[]; // Replace `any` if a more specific type is needed
  };
  field_email: string[]; // Assuming an array, update if needed
  field_member_title: string;
  field_phone: string;
  [key: string]: any;
}

export default function ContactPageTeam(props: Props) {
  const { teamMembersData } = props;

  if (!teamMembersData) return <p>Loading...</p>;

  return (
    <Container className="p-5">
      <Row lg={4} md={2} className="gap-5">
        {teamMembersData.map((member: JsonApiTeamMemberData) => (
          <Card
            key={member.drupal_internal__nid}
            style={{ width: "15rem", border: 0 }}
          >
            <Card.Img
              variant="top"
              style={{ height: "17rem", objectFit: "cover" }}
              src={member.field_avatar_url.uri}
            />
            <Card.Body>
              <Card.Title>{member.title}</Card.Title>
              <Card.Text className="mb-0">
                {member.field_member_title}
              </Card.Text>
              <Card.Text className="mb-0">{member.field_email}</Card.Text>
              <Card.Text className="mb-0">{member.field_phone}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </Row>
    </Container>
  );
}
