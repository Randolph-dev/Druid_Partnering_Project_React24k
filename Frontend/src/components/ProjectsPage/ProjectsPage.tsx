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
        {/* Render `field_heading` with fallback */}
        <h1 className="my-3 d-flex gap-2">
          {field_heading && field_heading.length > 0
            ? field_heading[0]
            : "Default Heading"}
        </h1>

        {/* Render `field_intro_paragraph` with fallback */}
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
      </Container>

      <Container fluid className="p-0" style={{ backgroundColor: "#000000" }}>
        <Row className="gy-5 py-5 mx-5">
          <h1 className="my-3 text-center text-light">
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
                    maxHeight: "100px",
                    objectFit: "contain",
                  }}
                />
              </Col>
            )
          )}
        </Row>
      </Container>

      {/* Project Cards Section */}
      <Container fluid className="py-5">
        <h2 className="text-center mb-5">Our Projects</h2>
        <Row className="gy-4">
          {projectData.map((project, index) => {
            const {
              field_image_url,
              field_project_title,
              field_project_description,
              field_category,
              field_link,
            } = project;

            return (
              <Col key={index} xs={12} sm={6} md={6} lg={6}>
                <ProjectCard
                  imageUrl={
                    field_image_url?.uri ||
                    "https://via.placeholder.com/300x200?text=No+Image"
                  }
                  projectTitle={field_project_title || "Untitled Project"}
                  projectDescription={
                    field_project_description ||
                    "This is a placeholder description."
                  }
                  projectCategory={field_category || "Uncategorized"}
                  projectLink={field_link?.uri}
                />
              </Col>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
};

export default ProjectsPage;
