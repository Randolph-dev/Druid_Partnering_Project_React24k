import { Container } from "react-bootstrap";
import { Field, LinkField, Paragraph } from "../../types/drupal";
import { Link } from "react-router-dom";


interface QuotesProps {
  section: Paragraph;
}

export default function Quotes(props: QuotesProps) {
  const { section } = props;
  const { field_link, field_title } = section;
  const links = field_link as LinkField[];
  const titles = field_title as Field[];

  // console.log(section);

  if (!section) {
    return <p>Loading</p>;
  };

  return (
    <Container className="my-5 text-center">
      {titles.map((title, index) => (
        <h1
          key={index}
          dangerouslySetInnerHTML={{ __html: title.value }}
        />
      ))}
      {links.map((link, index) => (
        <Link
          key={index}
          to={link.uri}
          style={{ textDecoration: "none", color: "black" }}
          dangerouslySetInnerHTML={{ __html: link.title }}
        />
      ))}
    </Container>
  )
}
