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
        field_paragraph_description,
        field_image_url,
    } = aboutUsData;
    console.log(field_heading[0].split("."));


    return (
        <Container style={{maxWidth: '100%'}} className='p-4' >           
            <Container className="text-center my-4 p-5">
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

            <div style={{ backgroundColor: '#000', color: '#fff', maxWidth: '100%' }}>
                <Container fluid className='py-5'>
                    <h2>
                        <b>
                        {field_heading[1].split(",")[0]},
                        </b>
                        <br />
                        <i>
                        {field_heading[1].split(",")[1]}
                        </i>
                    </h2>
                    <h2 style={{position: 'relative', 
                        color: 'red',
                        marginRight: '10rem'}} 
                        className='text-center text-md-end'>Our story</h2>
                </Container>
                <Row>
                    <Col md={6} className="d-flex justify-content-end p-4">
                    <div className="text-start">
                        <p>{field_paragraph_description[0].split("The company ")[0]}</p>
                        <p>{field_paragraph_description[0].split("dreams.")[1]}</p>
                        <p>{field_paragraph_description[0].split("services.")[1]}</p>
                    </div>
                    </Col>
                    <Col md={6} className='text-start p-4'>
                        <Image 
                        src={field_image_url[1].uri} 
                        alt={field_image_url[1].title} 
                        fluid 
                        />
                    </Col>
                    
                </Row>
            </div>

        </Container>
    )
}

export default AboutUs;