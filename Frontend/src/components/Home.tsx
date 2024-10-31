import { Button } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { useAppSelector } from '../hooks/hooks';
import { useEffect, useState } from 'react';
import fetchContentFromDrupal, { JsonApiDataAttributes } from '../lib/drupal/drupal-content-api';

export default function Home() {
  const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);
  const jsonApiLinksLoading = useAppSelector(state => state.drupal.isLoading);
  const [homePageData, setHomePageData] = useState<JsonApiDataAttributes | null>(null);

  useEffect(() => {
    // Ensure loading is complete and jsonApiLinks is defined
    if (!jsonApiLinksLoading) {
      const fetchData = async () => {
        const data = await fetchContentFromDrupal(jsonApiLinks["node--front_page"]);
        setHomePageData(data);
      };
      fetchData();
    }
  }, [jsonApiLinks, jsonApiLinksLoading]);

  return (
    <Container fluid className="p-5">
      <h1>Hello world! This is team 3</h1>
      <Button variant="primary">Click me!</Button>
      {homePageData && <div>{JSON.stringify(homePageData)}</div>}
    </Container>
  )
}
