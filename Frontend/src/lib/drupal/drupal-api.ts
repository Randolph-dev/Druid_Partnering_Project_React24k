import axios from "axios";

// This default URL should return everything exported by the JSON API
const drupalUrl: string = "http://127.0.0.1:51604/api/";

interface JsonApiLink {
  href: string;
}

interface Links {
  [key: string]: JsonApiLink;
}

const fetchJsonApiLinksFromDrupal = async (): Promise<Links> => {
  const { data: { links } } = await axios.get<{ links: Links }>(drupalUrl);
  return links;
};

export default fetchJsonApiLinksFromDrupal;
