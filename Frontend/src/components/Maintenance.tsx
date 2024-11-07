import { useEffect } from 'react';
import fetchContentFromDrupal from '../lib/drupal/drupal-content-api';
import { useAppSelector } from '../hooks/hooks';

export default function Maintenance() {
  const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);

  useEffect(() => {
    // the link node--page will return all 3 pages of type "service pages", we just want the second one which is Maintenance
    fetchContentFromDrupal(jsonApiLinks["node--service"])
      .then(res => console.log(res.data[1]))
  }, [jsonApiLinks])

  return (
    <div>Maintenance</div>
  )
}
