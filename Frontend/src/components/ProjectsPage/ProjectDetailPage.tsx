import React from "react";
import { Navigate, useParams } from "react-router-dom";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useAppSelector } from "../../hooks/hooks";

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract project ID from the route
  const projectsData = useAppSelector((state) => state.drupal.projectsData);
  const thisProjectData = projectsData.find((project) => project.drupal_internal__nid == id);

  if (!thisProjectData) {
    // redirect back to projects page if project not found
    return Navigate({ to: "/projects" });
  }

  console.log(thisProjectData);


  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col xs={12} md={6}>
          <h1></h1>
          <p>
            This is a placeholder description for the project with ID:{" "}
            <strong>{id}</strong>. You can replace this content with actual
            project data when you fetch it.
          </p>
        </Col>
        <Col xs={12} md={6}>
          <Image
            src="https://via.placeholder.com/600x400"
            alt="Placeholder Image"
            className="img-fluid"
            style={{
              objectFit: "cover",
              maxHeight: "400px",
              width: "100%",
            }}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default ProjectDetailPage;
