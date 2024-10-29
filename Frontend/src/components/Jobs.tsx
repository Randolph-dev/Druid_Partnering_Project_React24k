import { useEffect } from 'react';
import fetchContentFromDrupal from '../lib/drupal/drupal-content-api';
import { useAppSelector } from '../hooks/hooks';


export default function Jobs() {
  const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);
  useEffect(() => {
    console.log(fetchContentFromDrupal(jsonApiLinks["node--page"]));
  }, [jsonApiLinks])

  return (
    <div>Jobs</div>
  )
}
