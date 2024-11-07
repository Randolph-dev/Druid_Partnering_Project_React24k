import { Container } from "react-bootstrap";

export default function ContactForm() {
  return (
    <Container fluid className="py-5 d-flex flex-column align-items-center" style={{ height: '1000px', padding: 0 }}>
      <h2>Send us a message</h2>
      <iframe
        src="//mautic.alextran.cloud/form/4"
        width="100%"
        height="100%"
        style={{ padding: '2rem' }}
      >
        <p>Please use a different browser to use the form</p>
      </iframe>
    </Container>
  );
}
