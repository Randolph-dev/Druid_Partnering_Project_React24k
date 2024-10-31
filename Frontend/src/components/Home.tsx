import { Col, Container, Row } from 'react-bootstrap';
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
        const res = await fetchContentFromDrupal(jsonApiLinks["node--front_page"]);
        setHomePageData(res.data[0]);
      };
      fetchData();
    }
  }, [jsonApiLinksLoading]);

  if (!homePageData) {
    return <p>Loading</p>
  }

  console.log(homePageData);

  const { title, body, field_image_url: images } = homePageData;

  return (
    <Container fluid className="p-5">
      <h1>{title}</h1>

<Container>
  <Row>
    <Col lg={6}><p className='h2 fw-light'>We are a team of developers with a commitment to providing user-friendly, innovative, and reliable digital solutions. Our mission is to incoporate technology to businesses in order to help them bring their ideas to life.</p></Col>
  </Row>
</Container>


      {/* body.value */}
      {/* images.map((image: { "uri": string, "title": string }, index: number) =>
        <img key={`${index}_${image.title}`} src={image.uri} alt={image.title} />
  ) */}
    </Container>
  )
}
