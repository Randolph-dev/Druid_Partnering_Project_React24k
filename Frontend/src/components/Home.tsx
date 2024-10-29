import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../hooks/hooks';
import { useEffect } from 'react';
import fetchContentFromDrupal from '../lib/drupal/drupal-content-api';

export default function Home() {
  const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);

  useEffect(() => {
    console.log(fetchContentFromDrupal(jsonApiLinks["node--front_page"]));
  }, [jsonApiLinks])

  return (
    <Container fluid className="p-5">
      <h1>Hello world! This is team 3</h1>
      <Button variant="primary">Click me!</Button>
    </Container>
  )
}
