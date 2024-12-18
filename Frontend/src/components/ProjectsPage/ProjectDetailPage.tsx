import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useAppSelector } from "../../hooks/hooks";
import { ImageField, RestResponseData } from "../../types/drupal";

interface SingleProjectData extends RestResponseData {
  drupal_internal__nid: string;
  title: string;
  field_image_url: ImageField[];
  field_project_description: string[];
};

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract project ID from the route
  const projectsData = useAppSelector((state) => state.drupal.projectsData) as SingleProjectData[];
  const thisProjectData: SingleProjectData | undefined = projectsData.find((project) => project.drupal_internal__nid == id);

  if (!thisProjectData) {
    // redirect back to projects page if project not found
    return <Navigate to="/projects" />;
  }

  const { title, field_image_url, field_project_description } = thisProjectData;

  console.log(thisProjectData);

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <h1>{title}</h1>
          {field_project_description.map((description, index) => (
            <p key={`${index}_${description.slice(0, 10)}`}>{description}</p>
          ))}
        </Col>
        <Col xs={12} md={6}>
          {field_image_url.map((image, index) => (
            <Image
              src={image.uri}
              alt={image.title || "Project Image"}
              key={`${index}_${image.title}`}
              className="img-fluid"
              style={{
                objectFit: "cover",
                maxHeight: "400px",
                width: "100%",
              }}
            />
          ))}
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetailPage;
