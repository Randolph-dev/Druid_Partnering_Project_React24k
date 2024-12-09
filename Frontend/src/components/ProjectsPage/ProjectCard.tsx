import React from "react";
import { Card } from "react-bootstrap";

interface ProjectCardProps {
  imageUrl: string;
  projectTitle: string;
  projectDescription: string;
  projectCategory: string;
  projectLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  imageUrl,
  projectTitle,
  projectDescription,
  projectCategory,
  projectLink,
}) => {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={imageUrl}
        alt={projectTitle}
        style={{ objectFit: "cover", height: "200px" }}
      />
      <Card.Body>
        <div className="d-flex py-4 justify-content-between align-items-center">
          <Card.Title className="mb-0">{projectTitle || "Untitled"}</Card.Title>
          <span className="text-muted small">
            {projectCategory || "Uncategorized"}
          </span>
        </div>
        <Card.Text>
          {projectDescription ||
            "This is a placeholder description for the project."}
        </Card.Text>
        {projectLink && (
          <p className="text-primary mb-0">
            <a href={projectLink} target="_blank" rel="noopener noreferrer">
              &rarr; Read more
            </a>
          </p>
        )}
      </Card.Body>
    </Card>
  );
};

export default ProjectCard;
