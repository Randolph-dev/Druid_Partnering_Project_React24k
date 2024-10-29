import axios from "axios";
import { JsonApiLink, JsonApiLinks } from "./drupal-api";

export interface JsonApiData {
  attributes: {
    [key: string]: any; // accept any field of any type
  };
}

// response structure contains content data and links
export interface JsonApiContent {
  data: JsonApiData[];
  links: JsonApiLinks;
}

// Fetch content from a Json API link, destructure the data/attribute and links
const fetchContentFromDrupal = async (link: JsonApiLink): Promise<JsonApiContent> => {
  const { data: { data, links } } = await axios.get<JsonApiContent>(link.href);

  // Log the attributes and links for each content item
  console.log("Data:", data);
  console.log("Links:", links);

  return { data, links };
}

export default fetchContentFromDrupal;
