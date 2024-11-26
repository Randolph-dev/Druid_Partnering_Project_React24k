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
  const { field_jobspage_questions } = section;

  const questions = field_jobspage_questions as Question[];

  if (!section) {
    return <p>Loading</p>;
  }

  return (
    <Container className="my-5">
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
