import { useEffect, useState } from "react";
import fetchContentFromDrupal, {
  JsonApiDataAttributes,
} from "../lib/drupal/drupal-content-api";
import { useAppSelector } from "../hooks/hooks";
import { Col, Container, Image, Row } from "react-bootstrap";

const Consultation: React.FC = () => {
  const jsonApiLinks = useAppSelector((state) => state.drupal.jsonApiLinks);
  const jsonApiLinksLoading = useAppSelector((state) => state.drupal.isLoading);
  const [consultPageData, setConsultPageData] =
    useState<JsonApiDataAttributes | null>(null);

  useEffect(() => {
    if (!jsonApiLinksLoading) {
      const fetchData = async () => {
        const pageData = await fetchContentFromDrupal(
          jsonApiLinks["node--consultation_page"]
        );
        setConsultPageData(pageData.data[0]);
      };
      fetchData();
    }
  }, [jsonApiLinksLoading]);

  if (!consultPageData) {
    return <p>Loading</p>;
  }

  const {
    field_title,
    field_image_url,
    field_section_paragraph,
    field_first_section_header,
    field_second_section_header,
    field_second_section_paragraph,
  } = consultPageData;

  type ConsultPageField = {
    value: string;
    format: string;
    processed: string;
  };

  return (
    <Container>
      <Row>
        <h1 className="my-5 pt-5 text-center">{field_title[0]}</h1>
      </Row>
      <Row>
        <Row>
          <h3 className="my-5">
            {field_first_section_header.map(
              (span: ConsultPageField, index: number) => (
                <span
                  key={index}
                  dangerouslySetInnerHTML={{ __html: span.processed }}
                />
              )
            )}
          </h3>
        </Row>

        <Col md={6}>
          <p className="d-flex flex-column pe-5 lead">
            {field_section_paragraph.map(
              (span: ConsultPageField, index: number) => (
                <span
                  key={index}
                  dangerouslySetInnerHTML={{ __html: span.processed }}
                />
              )
            )}
          </p>
        </Col>
        <Col md={6}>
          {field_image_url && field_image_url.length > 0 && (
            <Image
              fluid
              src={field_image_url[0].uri}
              alt={field_image_url[0].title || "Image"}
            />
          )}
        </Col>
      </Row>
      <Row className="my-5 pb-5">
        <h2 className="my-5 text-center">
          {field_second_section_header.map(
            (span: ConsultPageField, index: number) => (
              <span
                key={index}
                dangerouslySetInnerHTML={{ __html: span.processed }}
              />
            )
          )}
        </h2>
        <div className="d-flex justify-content-center">
          <p className="lead d-flex flex-column gap-4">
            {field_second_section_paragraph.map(
              (span: ConsultPageField, index: number) => (
                <span
                  key={index}
                  dangerouslySetInnerHTML={{ __html: span.processed }}
                />
              )
            )}
          </p>
        </div>
      </Row>
    </Container>
  );
};

export default Consultation;
