import { useEffect, useState } from "react";
import fetchContentFromDrupal, {
  JsonApiDataAttributes,
} from "../../lib/drupal/drupal-content-api";
import { useAppSelector } from "../../hooks/hooks";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import ProjectCard from "./ProjectCard";

const ProjectsPage: React.FC = () => {
  const jsonApiLinks = useAppSelector((state) => state.drupal.jsonApiLinks);
  const jsonApiLinksLoading = useAppSelector((state) => state.drupal.isLoading);

  const [projectsPageData, setProjectsPageData] =
    useState<JsonApiDataAttributes | null>(null);
  const [projectData, setProjectData] = useState<JsonApiDataAttributes[]>([]);

  useEffect(() => {
    if (!jsonApiLinksLoading) {
      const fetchData = async () => {
        // Fetch the projects page data
        const pageDataResponse = await fetchContentFromDrupal(
          jsonApiLinks["node--projects_page"]
        );
        setProjectsPageData(pageDataResponse.data[0]);

        // Fetch the actual project data
        const projectDataResponse = await fetchContentFromDrupal(
          jsonApiLinks["node--projects"]
        );
        setProjectData(projectDataResponse.data); // Assume it's an array
      };
      fetchData();
    }
  }, [jsonApiLinksLoading]);

  if (!projectsPageData) {
    return <p>Loading...</p>;
  }

  // Destructure fields for the projects page metadata
  const {
    field_heading,
    field_intro_paragraph,
    field_title,
    field_client_logo_link,
  } = projectsPageData;

  return (
    <Container fluid className="p-0">
      <Container fluid className="p-5 mb-5">
        <div>
          <h1 className="my-3 d-flex gap-2">
            {
              <>
                <strong>{field_heading[0].split(" ")[0]}</strong>
                <i>{field_heading[0].split(" ").slice(1).join(" ")}</i>
              </>
            }
          </h1>
          <p style={{ maxWidth: "500px" }} className="d-flex flex-column gap-3">
            {field_intro_paragraph && field_intro_paragraph.length > 0
              ? field_intro_paragraph[0]
              : "Default intro paragraph content."}
          </p>
          <div className="d-flex gap-2">
            <Button
              variant="outline-danger"
              className="text-dark rounded-pill px-4"
            >
              Web Service
            </Button>
            <Button
              variant="outline-danger"
              className="text-dark rounded-pill px-4"
            >
              Websites
            </Button>
            <Button
              variant="outline-danger"
              className="text-dark rounded-pill px-4"
            >
              Webshop
            </Button>
          </div>
        </div>
      </Container>

      {/* Project Cards Section */}
      <Container className="py-5">
        <h1 className="text-center mb-5">Our Projects</h1>
        <Row className="gy-4 mb-5">
          {projectData.map((project: any) => (
            <Col key={project.drupal_internal__nid} xs={12} sm={12} md={6}>
              <ProjectCard projectData={project} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container
        fluid
        className="mt-5 pb-5"
        style={{ backgroundColor: "#000000" }}
      >
        <Row className="gy-5 py-5 mx-5">
          <h1 className="my-5 text-center text-light">
            {field_title && field_title.length > 0
              ? field_title[0]
              : "Default Heading"}
          </h1>
          {field_client_logo_link.map(
            (logo: { uri: string; title: string }, index: number) => (
              <Col
                key={index}
                xs={6}
                sm={4}
                md={3}
                className="d-flex justify-content-center"
              >
                <Image
                  src={logo.uri}
                  alt={logo.title || "Client logo"}
                  className="img-fluid"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "80px",
                    objectFit: "contain",
                  }}
                />
              </Col>
            )
          )}
        </Row>
      </Container>
    </Container>
  );
};

export default ProjectsPage;
