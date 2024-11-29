import { Container } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Field, Paragraph } from "../../types/drupal";
import { generateFieldKey } from "../../lib/utils/utils";

interface QuestionsProps {
  section: Paragraph;
}

interface Question extends Paragraph {
  field_title: Field[];
  field_paragraph: Field[];
}

export default function Questions(props: QuestionsProps) {
  const { section } = props;
  const { field_jobspage_questions, field_title } = section;

  const questions = field_jobspage_questions as Question[];
  const titles = field_title as Field[];

  if (!section) {
    return <p>Loading</p>;
  }

  return (
    <Container className="my-5">
      {titles.map((title, index) => (
        <h1
          className="py-5 text-center"
          key={generateFieldKey(title, index)}
          dangerouslySetInnerHTML={{ __html: title.value }}
        />
      ))}
      <Accordion defaultActiveKey="0">
        {questions.map((question, index) => (
          <Accordion.Item eventKey={index.toString()} key={index}>
            <Accordion.Header>
              {question.field_title.map((title, i) => (
                <span
                  key={generateFieldKey(title, i)}
                  dangerouslySetInnerHTML={{ __html: title.value }}
                />
              ))}
            </Accordion.Header>
            <Accordion.Body>
              {question.field_paragraph.map((paragraph, i) => (
                <div
                  key={generateFieldKey(paragraph, i)}
                  dangerouslySetInnerHTML={{ __html: paragraph.value }}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  );
}
