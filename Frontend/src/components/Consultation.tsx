import { useEffect } from 'react';
import fetchContentFromDrupal from '../lib/drupal/drupal-content-api';
import { useAppSelector } from '../hooks/hooks';

export default function Consultation() {
  const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);

  useEffect(() => {
    // the link node--page will return all 3 pages of type "service pages", we just want the last one which is consultation
    fetchContentFromDrupal(jsonApiLinks["node--service"])
      .then(res => console.log(res.data[2]))
  }, [jsonApiLinks])

  return (
    <div>Consultation</div>
  )
}
