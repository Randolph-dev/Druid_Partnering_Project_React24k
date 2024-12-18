import { useEffect, useState } from "react";
import fetchContentFromDrupal, {
  JsonApiDataAttributes,
} from "../lib/drupal/drupal-content-api";
import { useAppSelector } from "../hooks/hooks";
import ContactForm from "./ContactForm";
import { Col, Container, Row } from "react-bootstrap";
import ContactPageTeam from "./ContactPageTeam";
import { useLocation } from "react-router-dom";

const Contact: React.FC = () => {
  const jsonApiLinks = useAppSelector((state) => state.drupal.jsonApiLinks);
  const jsonApiLinksLoading = useAppSelector((state) => state.drupal.isLoading);
  const [contactPageData, setContactPageData] = useState<JsonApiDataAttributes | null>(null);
  const [teamMembersData, setTeamMembersData] = useState<JsonApiDataAttributes | null>(null);
  const { search } = useLocation();

  useEffect(() => {
    if (search == "?messageSent") {
      console.log("Message sent");

    }
  }, [search]);

  useEffect(() => {
    if (!jsonApiLinksLoading) {
      const fetchData = async () => {
        const pageData = await fetchContentFromDrupal(
          jsonApiLinks["node--contact_page"]
        );
        setContactPageData(pageData.data[0]);
        const teamData = await fetchContentFromDrupal(
          jsonApiLinks["node--team_member"]
        );
        setTeamMembersData(teamData.data);
      };
      fetchData();
    }
  }, [jsonApiLinksLoading]);

  if (!contactPageData) {
    return <p>Loading</p>;
  }

  const {
    field_first_section_header,
    field_first_section_paragraph,
    field_second_section_header,
    field_second_section_paragraph,
    field_info_section_heading,
    field_info_title,
    field_info_description,
  } = contactPageData;

  type ContactPageField = {
    value: string;
    format: string;
    processed: string;
  };

  return (
    <Container fluid className="p-0">
      <Container className="py-5 d-flex flex-column">
        <h1 className="my-3 gap-2">
          {field_first_section_header.map(
            (span: ContactPageField, index: number) => (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: span.processed }}
              />
            )
          )}
        </h1>
        <p
          style={{ maxWidth: "70%" }}
          className="lead d-flex flex-column gap-5 px-5"
        >
          {field_first_section_paragraph.map(
            (span: ContactPageField, index: number) => (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: span.processed }}
              />
            )
          )}
        </p>
      </Container>
      <Container>
        <h1 className="my-3 d-flex gap-2">
          {field_second_section_header.map(
            (span: ContactPageField, index: number) => (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: span.processed }}
              />
            )
          )}
        </h1>
        <p
          style={{ maxWidth: "70%" }}
          className="lead d-flex flex-column gap-3 px-5"
        >
          {field_second_section_paragraph.map(
            (span: ContactPageField, index: number) => (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: span.processed }}
              />
            )
          )}
        </p>
      </Container>

      <ContactPageTeam teamMembersData={teamMembersData} />

      <Container fluid className="bg-light">
        <Row>
          <Col md={6}>
            <ContactForm />
          </Col>
          <Col md={6} className="bg-dark text-light py-5">
            <h3 className="my-5 pb-2 text-center">
              {field_info_section_heading.map(
                (span: ContactPageField, index: number) => (
                  <span
                    key={index}
                    dangerouslySetInnerHTML={{ __html: span.processed }}
                  />
                )
              )}
            </h3>

            <div className="d-flex flex-column justify-content-center align-items-center text-center gap-4">
              <div>
                {field_info_title.map(
                  (title: ContactPageField, index: number) => (
                    <div key={index} className="mb-4">
                      <p
                        dangerouslySetInnerHTML={{ __html: title.processed }}
                      />
                      {field_info_description[index] && (
                        <span
                          dangerouslySetInnerHTML={{
                            __html: `<span style="color: red;">&rarr;</span> ${field_info_description[index].processed}`,
                          }}
                        />
                      )}
                    </div>
                  )
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default Contact;
