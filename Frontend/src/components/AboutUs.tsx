import { useEffect, useState } from 'react';
import fetchContentFromDrupal, {
    JsonApiDataAttributes,
} from "../lib/drupal/drupal-content-api";
import { useAppSelector } from '../hooks/hooks';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutUs: React.FC = () => {
    const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);
    const [aboutUsData, setAboutUsData] = useState<JsonApiDataAttributes | null>(null);

    useEffect(() => {
        // the link node--page will return all 3 pages of type "basic pages", we just want the second one which is About us
        if (jsonApiLinks["node--page"]) {
            fetchContentFromDrupal(jsonApiLinks["node--page"])
                .then(res => {
                    console.log(res.data[1]); 
                    setAboutUsData(res.data[1]);
                });
        }
    }, [jsonApiLinks]);

    if (!aboutUsData) {
        return <div>Loading...</div>;
    }

    const {
        field_heading,
        field_paragraph,
        field_image_url,
    } = aboutUsData;
    console.log(field_heading[0].split("."));


    return (
        <Container className="p-4">           
            <Container className="text-center my-4 p-2">
                <h2>
                    <i>
                        {field_heading[0].split(".")[0]}
                        </i>.
                        <b>{field_heading[0].split(".")[1]}.</b>
                        </h2>
            </Container>
            <Row>
                <Col md={6} className='p-4'>
                    <Image src={field_image_url[0].uri} alt={field_image_url[0].title} fluid />
                </Col>
                <Col md={6} className="d-flex justify-content-end p-4" >
                    <div className="text-start">
                        <h2>{field_paragraph[0]}</h2>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default AboutUs;