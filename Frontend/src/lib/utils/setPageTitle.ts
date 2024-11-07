import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { capitalize } from './utils';

export const setPageTitle = () => {
  const location = useLocation();
  const pathname = location.pathname;
  let pageTitle: string;
  // console.log(capitalize(location.pathname.slice(1)));

  if (pathname === "/") {
    pageTitle = "Drupal websites and uncompromising software solutions | Druid";
  } else {
    pageTitle = `${capitalize(location.pathname.slice(1))} | Drupal websites and uncompromising software solutions | Druid`
  }

  useEffect(() => {
    document.title = pageTitle; // Set the desired page title
  }, [location]);
}
