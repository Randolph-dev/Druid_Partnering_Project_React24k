import { useEffect } from 'react';
import fetchContentFromDrupal from '../lib/drupal/drupal-content-api';
import { useAppSelector } from '../hooks/hooks';

export default function Projects() {
  const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);

  useEffect(() => {
    // the link node--page will return all 3 pages of type "service pages", we just want the first one which is Projects
    fetchContentFromDrupal(jsonApiLinks["node--service"])
      .then(res => console.log(res.data[0]))
  }, [jsonApiLinks])

  return (
    <div>Projects</div>
  )
}
