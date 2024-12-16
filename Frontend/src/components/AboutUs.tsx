import { useEffect, useState } from 'react';
import fetchContentFromDrupal, { JsonApiDataAttributes } from "../lib/drupal/drupal-content-api";
import { useAppSelector } from '../hooks/hooks';
// import { Container, Row, Col, Image } from 'react-bootstrap';

const AboutUs: React.FC = () => {
    const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);
    const jsonApiLinksLoading = useAppSelector((state) => state.drupal.isLoading);
    const [aboutUsData, setAboutUsData] = useState<JsonApiDataAttributes | null>(null);

    useEffect(() => {
        if (!jsonApiLinksLoading) {
        const fetchData = async () => {
            const pageData = await fetchContentFromDrupal(
                jsonApiLinks["node--about_us_page"]
            );
            setAboutUsData(pageData.data[0]);
        };
        fetchData();
        }
    }, [jsonApiLinksLoading]);

    if (!aboutUsData) return <p>Loading...</p>;

}

export default AboutUs;