import { useEffect } from 'react';
import fetchContentFromDrupal from '../lib/drupal/drupal-content-api';
import { useAppSelector } from '../hooks/hooks';


export default function Jobs() {
  const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);
  useEffect(() => {
    // the link node--page will return all 3 pages of type "basic pages", we just want the last one which is Jobs
    fetchContentFromDrupal(jsonApiLinks["node--page"])
      .then(res => console.log(res.data[2]))
  }, [jsonApiLinks])

  return (
    <div>Jobs</div>
  )
}
