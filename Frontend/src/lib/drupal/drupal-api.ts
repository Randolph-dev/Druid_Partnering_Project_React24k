import axios from "axios";

// TODO: write function to fetch articles, pages, cases, etc. from the links provided by this function

// This default URL should return everything exported by the JSON API
const drupalUrl: string = import.meta.env.VITE_DRUPAL_URL;

export interface JsonApiLink {
  href: string;
}

export interface JsonApiLinks {
  [key: string]: JsonApiLink;
}

const fetchJsonApiLinksFromDrupal = async (): Promise<JsonApiLinks> => {
  const { data: { links } } = await axios.get<{ links: JsonApiLinks }>(drupalUrl);
  console.log(links["node--article"]);
  return links;
};

export default fetchJsonApiLinksFromDrupal;
