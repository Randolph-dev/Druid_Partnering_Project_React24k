import { Container } from "react-bootstrap";

export default function ContactForm() {
  return (
    <Container fluid style={{ height: '100vh', padding: 0 }}>
      <iframe
        src="//mautic.alextran.cloud/form/4"
        width="100%"
        height="100%"
      >
        <p>Please use a different browser to use the form</p>
      </iframe>
    </Container>
  );
}
