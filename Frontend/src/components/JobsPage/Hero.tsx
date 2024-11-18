import { Container } from "react-bootstrap";
import { Field, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";

interface HeroProps {
  section: Paragraph;
}

export default function Hero(props: HeroProps) {
  const { section } = props;
  const { field_title } = section;

  const titles = field_title as Field[];

  if (!section) {
    return <p>Loading</p>;
  }

  return (
    <Container fluid className="my-5 py-5 bg-dark text-light">
      {titles.map((title, index) => (
        <h1
          key={generateFieldKey(title, index)}
          className="text-center my-5"
          dangerouslySetInnerHTML={{ __html: title.value }}
        />
      ))}
    </Container>
  );
}
