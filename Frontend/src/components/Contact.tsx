import { useEffect, useState } from 'react';
import fetchContentFromDrupal, { JsonApiDataAttributes } from '../lib/drupal/drupal-content-api';
import { useAppSelector } from '../hooks/hooks';
import ContactForm from './ContactForm';

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

    return (
        <div>
            <h1>Contact Us</h1>
            <p>Contact page will be here</p>
            <ContactForm />
        </div>
    )
}

export default Contact;