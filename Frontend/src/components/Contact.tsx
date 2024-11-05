import { useEffect } from 'react';
import fetchContentFromDrupal from '../lib/drupal/drupal-content-api';
import { useAppSelector } from '../hooks/hooks';

const Contact: React.FC = () => {
    const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);

    useEffect(() => {
        // the link node--page will return all 3 pages of type "basic pages", we just want the first one which is Contact
        fetchContentFromDrupal(jsonApiLinks["node--page"])
            .then(res => console.log(res.data[0]))
    }, [jsonApiLinks])

    return (
        <div>
            <h1>Contact Us</h1>
            <p>Contact page will be here</p>
            <iframe src="//mautic.alextran.cloud/form/4" width="300" height="300"><p>Your browser does not support iframes.</p></iframe>
        </div>
    )
}

export default Contact;