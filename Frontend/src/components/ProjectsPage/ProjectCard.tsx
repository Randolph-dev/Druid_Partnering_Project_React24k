import { Card } from "react-bootstrap";

interface Props {
  projectData: JsonApiProjectCardData;
}

interface JsonApiProjectCardData {
  drupal_internal__nid: number;
  title: string;
  field_image_url: Array<{
    uri: string;
    title: string;
    options: any[];
  }>;
  field_link: Array<{
    uri: string;
    title: string;
    options: any[];
  }>;
  field_project_description: string[];
  field_project_tiltle: string[];
  [key: string]: any;
}

export default function ProjectCard({ projectData }: Props) {
  return (
    <Card className="h-100">
      <Card.Img
        variant="top"
        src={projectData.field_image_url[0]?.uri}
        alt={projectData.field_project_tiltle[0]}
        style={{ objectFit: "cover", height: "300px" }}
      />
      <Card.Body>
        <div className="d-flex py-4 justify-content-between align-items-center">
          <Card.Title className="mb-0">
            {projectData.title || "Untitled"}
          </Card.Title>
          <span className="text-muted small">{"Uncategorized"}</span>
        </div>
        <Card.Text>
          {projectData.field_project_description[0] ||
            "This is a placeholder description for the project."}
        </Card.Text>
        {projectData.field_link[0]?.uri && (
          <p className="text-primary mb-0">
            <a
              href={projectData.field_link[0]?.uri}
              target="_blank"
              rel="noopener noreferrer"
            >
              &rarr; Read more
            </a>
          </p>
        )}
      </Card.Body>
    </Card>
  );
}
