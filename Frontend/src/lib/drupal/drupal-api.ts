import axios from "axios";

// This default URL should return everything exported by the JSON API
const drupalUrl: string = "http://127.0.0.1:51604/api/";

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
