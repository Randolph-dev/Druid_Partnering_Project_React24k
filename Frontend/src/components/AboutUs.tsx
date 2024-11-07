import { useEffect, useState } from 'react';
import fetchContentFromDrupal, { JsonApiDataAttributes } from "../lib/drupal/drupal-content-api";
import { useAppSelector } from '../hooks/hooks';
import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutUs: React.FC = () => {
    const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);
    const [aboutUsData, setAboutUsData] = useState<JsonApiDataAttributes | null>(null);

    useEffect(() => {
        if (jsonApiLinks["node--page"]) {
            fetchContentFromDrupal(jsonApiLinks["node--page"]).then(res => {
                setAboutUsData(res.data[1]);
            });
        }
    }, [jsonApiLinks]);

    if (!aboutUsData) return <div>Loading...</div>;

    const { field_heading, field_paragraph, field_paragraph_description, field_paragraph_title, field_image_url } = aboutUsData;

    return (
        <Container style={{ maxWidth: '100%' }} className="p-0">
            <Container className="text-center my-4 p-5">
                <h2>
                    <i>{field_heading[0].split(".")[0]}</i>.
                    <b>{field_heading[0].split(".")[1]}.</b>
                </h2>
            </Container>

            <Row>
                <Col md={6} className="p-4">
                    <Image src={field_image_url[0].uri} alt={field_image_url[0].title} fluid />
                </Col>
                <Col md={6} className="d-flex justify-content-end p-4 text-start">
                    <div>
                        <h2>{field_paragraph[0]}</h2>   
                        <p>
                            <span style={{ color: 'red' }}> &rarr; </span>
                            Check out our services
                        </p>
                    </div>
                </Col>
            </Row>

            <div style={{ backgroundColor: '#000', color: '#fff', maxWidth: '100%' }}>
                <Container fluid className="py-5 pb-4 p-5">
                    <h2>
                        <b>{field_heading[1].split(",")[0]},</b>
                        <br />
                        <i>{field_heading[1].split(",")[1]}</i>
                    </h2>
                    <h2 style={{ position: 'relative', color: 'red', marginRight: '10rem' }} className="text-center text-md-end">
                        Our story
                    </h2>
                </Container>
                
                <Row className='p-5'>
                    <Col md={6} className="d-flex justify-content-end p-4">
                        <div className="text-start">
                            <p>{field_paragraph_description[0].split("The company ")[0]}</p>
                            <p>{field_paragraph_description[0].split("dreams.")[1]}</p>
                            <p>{field_paragraph_description[0].split("services.")[1]}</p>

                            <p>
                                <span style={{ color: 'red' }}> &rarr; </span>
                                Get to know us
                            </p>
                        </div>
                    </Col>
                    <Col md={6} className="text-start p-4">
                        <Image src={field_image_url[1].uri} alt={field_image_url[1].title} fluid />
                    </Col>
                </Row>
            </div>

            <Container className="my-4 p-5">
                <h2 className="text-danger">
                    {field_heading[2].split(".")[0]}
                </h2>
                
                <Row>
                    <Col md={6}>
                        <Image
                            src={field_image_url[2].uri} 
                            alt={field_image_url[2].title} 
                            style={{ width: '100%', maxWidth: '600px', height: 'auto' }}
                        />
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div>
                            <h3>
                                <b>{field_paragraph_title[0].split("flexible cooperation")[0]}</b>
                                <i>flexible cooperation</i>
                            </h3>
                            <p>
                                {field_paragraph_description[1]}
                            </p>
                            <h3>
                                <i>{field_paragraph_title[1].split("A smooth ride")[0]}</i>
                                <b>A smooth ride</b> from one technology to another
                            </h3>
                            <p>{field_paragraph_description[2]}</p>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col md={6} className="my-5">
                        <h3>
                            <b>Knowledge</b>
                            <i> and passion</i>
                        </h3>
                        <p>
                            {field_paragraph_description[3]}
                        </p>
                        <h3>
                            <b>Big picture.</b> Small details.
                        </h3>
                        <p>
                            {field_paragraph_description[4]}
                        </p>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default AboutUs;