import { useEffect, useState } from "react";
import fetchContentFromDrupal, {
  JsonApiDataAttributes,
} from "../lib/drupal/drupal-content-api";
import { useAppSelector } from "../hooks/hooks";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

const Jobs: React.FC = () => {
  const jsonApiLinksLoading = useAppSelector((state) => state.drupal.isLoading);
  const jsonApiLinks = useAppSelector((state) => state.drupal.jsonApiLinks);

  const [jobsPageData, setJobsData] = useState<JsonApiDataAttributes | null>(
    null
  );

  useEffect(() => {
    // Ensure loading is complete and jsonApiLinks is defined
    if (!jsonApiLinksLoading) {
      const fetchData = async () => {
        const res = await fetchContentFromDrupal(
          jsonApiLinks["node--jobs_page"]
        );
        setJobsData(res.data[0]);
      };
      fetchData();
    }
  }, [jsonApiLinksLoading]);

  if (!jobsPageData) {
    return <p>Loading</p>;
  }

  const {
    field_heading,
    field_intro_paragraph,
    field_image_description,
    field_paragraph_description,
    field_paragraph_title,
    field_image_url: images,
  } = jobsPageData;

  return (
    <Container className="p-0" fluid>
      <Container
        className="d-flex align-items-center"
        style={{ height: "90vh" }}
      >
        <Row className="d-flex justify-content-between">
          <Col md={6}>
            <h1>
              <b>{field_heading[0]}</b>
            </h1>
            <div className="py-3">
              {field_intro_paragraph.map((intro: string) => (
                <p style={{ fontSize: "20px" }}>{intro}</p>
              ))}
            </div>

            <Col className="mt-4">
              <Button
                className="me-2 p-3 px-5 rounded-pill border-0"
                style={{ backgroundColor: "#EF3428" }}
              >
                Connect
              </Button>
              <Button
                className="p-3 px-5 rounded-pill border-0"
                style={{ backgroundColor: "#EF3428" }}
              >
                Job openings
              </Button>
            </Col>
          </Col>
          <Col md={5}>
            <Image
              src={images[0].uri}
              alt={images[0].title}
              style={{ width: "100%" }}
            />
            <p className="pt-3 text-end">{field_image_description}</p>
          </Col>
        </Row>
      </Container>

      <Container>
        <h2 className="py-5 text-center">{field_heading[1]}</h2>

        <Row className="d-flex justify-content-center">
          {field_paragraph_description.map(
            (description: string, index: number) => (
              <Col key={index} md={5} className="pb-5">
                <h5>{field_paragraph_title[index]}</h5>
                <p>{description}</p>
              </Col>
            )
          )}
        </Row>
      </Container>

      <Container className="my-5 py-5 bg-dark text-light" fluid>
        <h2 className="pb-5 text-center">Meet the druids</h2>
        <Row className="justify-content-center">
          <Col xs="auto" className="d-flex justify-content-center mb-4">
            <div
              className="d-flex, justify-content-center, align-items-center rounded-pill"
              style={{
                width: "180px",
                height: "180px",
                overflow: "hidden",
              }}
            >
              <Image
                src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                alt="Profile 1"
                roundedCircle
                fluid
              />
            </div>
          </Col>
        </Row>
        <Col>
          <Button
            className="p-3 px-5 rounded-pill border-0"
            style={{ backgroundColor: "#EF3428" }}
          >
            More people
          </Button>
        </Col>
      </Container>
    </Container>
  );
};

export default Jobs;
