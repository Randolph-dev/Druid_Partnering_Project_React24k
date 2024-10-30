import { useEffect } from 'react';
import fetchContentFromDrupal from '../lib/drupal/drupal-content-api';
import { useAppSelector } from '../hooks/hooks';

const AboutUs: React.FC = () => {
    const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);

    useEffect(() => {
        // the link node--page will return all 3 pages of type "basic pages", we just want the second one which is About us
        fetchContentFromDrupal(jsonApiLinks["node--page"])
            .then(res => console.log(res.data[1]))
    }, [jsonApiLinks])

    return (
        <div>
            <h1>About us</h1>
            <p>About us text will be here</p>
        </div>
    )
}

export default AboutUs;