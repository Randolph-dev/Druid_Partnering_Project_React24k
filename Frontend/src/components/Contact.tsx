import { useEffect, useState } from 'react';
import fetchContentFromDrupal, { JsonApiDataAttributes } from '../lib/drupal/drupal-content-api';
import { useAppSelector } from '../hooks/hooks';
import ContactForm from './ContactForm';
import { Container } from 'react-bootstrap';

const Contact: React.FC = () => {
    const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);
    const jsonApiLinksLoading = useAppSelector((state) => state.drupal.isLoading);
    const [contactPageData, setContactPageData] = useState<JsonApiDataAttributes | null>(null);

    useEffect(() => {
        if (!jsonApiLinksLoading) {
            const fetchData = async () => {
                const res = await fetchContentFromDrupal(
                    jsonApiLinks["node--contact_page"]
                );
                setContactPageData(res.data[0]);
            };
            fetchData();
        }
    }, [jsonApiLinksLoading]);

    if (!contactPageData) {
        return <p>Loading</p>;
    }

    console.log(contactPageData);

    const {
        field_first_section_header,
    } = contactPageData;

    type ContactPageField = {
        value: string;
        format: string;
        processed: string;
    };

    return (
        <Container fluid className='p-0'>
            <Container fluid className='p-5'>
                <h1 className='my-5 d-flex gap-2'>
                    {field_first_section_header.map((span: ContactPageField, index: number) => (
                        <p key={index} dangerouslySetInnerHTML={{ __html: span.processed }} />
                    ))}
                </h1>
                <p>Contact page will be here</p>
            </Container>
            <Container fluid className='p-5'>
                <h1>Contact Us</h1>
                <p>Contact page will be here</p>
            </Container>
            <ContactForm />
        </Container>
    )
}

export default Contact;