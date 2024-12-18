import { useEffect, useState } from "react";
import fetchContentFromDrupal, {
  JsonApiDataAttributes,
} from "../../lib/drupal/drupal-content-api";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
import { setProjectsData } from "../../features/drupalData/drupalSlice";

const ProjectsPage: React.FC = () => {
  const jsonApiLinks = useAppSelector((state) => state.drupal.jsonApiLinks);
  const jsonApiLinksLoading = useAppSelector((state) => state.drupal.isLoading);
  const projectData = useAppSelector((state) => state.drupal.projectsData); // should be projectsData with an s, but keeping the variable name for now
  const dispatch = useAppDispatch();

  const [projectsPageData, setProjectsPageData] =
    useState<JsonApiDataAttributes | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<
    JsonApiDataAttributes[]
  >([]); // For filtered projects
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // For category selection

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

        // Store the project data in redux store for later single project page use
        dispatch(setProjectsData(projectDataResponse.data));
        setFilteredProjects(projectDataResponse.data); // Initially show all projects
      };
      fetchData();
    }
  }, [jsonApiLinksLoading]);

  // Handle category filter
  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category); // Update selected category
    if (category) {
      // Filter projects by category
      const filtered = projectData.filter((project: any) =>
        project.field_projects_categories?.includes(category)
      );
      setFilteredProjects(filtered);
    } else {
      // Show all projects if no category is selected
      setFilteredProjects(projectData);
    }
  };

  if (!projectsPageData) {
    return <p>Loading...</p>;
  }

  const {
    field_heading,
    field_intro_paragraph,
    field_title,
    field_client_logo_link,
    field_projects_categories,
  } = projectsPageData;

  return (
    <Container fluid className="p-0">
      <Container fluid className="p-5 mb-5">
        <div
          className="d-flex flex-column align-items-center text-center"
          style={{ margin: "0 auto" }}
        >
          <h1 className="mt-5 d-flex gap-2">{field_heading[0]}</h1>
          <p className="my-4 lead d-flex flex-column gap-3">
            {field_intro_paragraph && field_intro_paragraph.length > 0
              ? field_intro_paragraph[0]
              : "Default intro paragraph content."}
          </p>
          <div className="d-flex gap-2 flex-wrap justify-content-center">
            {/* Category buttons */}
            <Button
              variant={selectedCategory === null ? "danger" : "outline-danger"}
              className={`rounded-pill px-4 ${selectedCategory === null ? "text-white" : "text-dark"
                }`}
              onClick={() => handleCategoryFilter(null)} // Show all projects
              style={{
                color: selectedCategory === null ? "white" : undefined,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
              onMouseLeave={(e) =>
                selectedCategory === null
                  ? (e.currentTarget.style.color = "white")
                  : (e.currentTarget.style.color = "black")
              }
            >
              All
            </Button>
            {field_projects_categories &&
              field_projects_categories.map(
                (category: string, index: number) => (
                  <Button
                    key={index}
                    variant={
                      selectedCategory === category
                        ? "danger"
                        : "outline-danger"
                    }
                    className={`rounded-pill px-4 ${selectedCategory === category ? "text-white" : "text-dark"
                      }`}
                    onClick={() => handleCategoryFilter(category)}
                    style={{
                      color:
                        selectedCategory === category ? "white" : undefined,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = "white")
                    }
                    onMouseLeave={(e) =>
                      selectedCategory === category
                        ? (e.currentTarget.style.color = "white")
                        : (e.currentTarget.style.color = "black")
                    }
                  >
                    {category}
                  </Button>
                )
              )}
          </div>
        </div>
      </Container>

      {/* Project Cards Section */}
      <Container className="py-5">
        <h1 className="text-center mb-5">Our Projects</h1>
        <Row className="gy-4 mb-5">
          {filteredProjects.map((project: any) => (
            <Col key={project.drupal_internal__nid} xs={12} sm={12} md={6}>
              <ProjectCard projectData={project} />
            </Col>
          ))}
        </Row>
      </Container>

      <Container
        fluid
        className="mt-5 pb-5 border-bottom border-white"
        style={{ backgroundColor: "#000000" }}
      >
        <Row className="gy-5 py-5 mx-5 ">
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
