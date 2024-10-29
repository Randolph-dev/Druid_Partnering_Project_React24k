import axios from "axios";
import { JsonApiLink, JsonApiLinks } from "./drupal-api";

export interface JsonApiDataAttributes {
  [key: string]: any; // Accept any field of any type
}

// response structure contains content attributes and links
export interface JsonApiContent {
  data: JsonApiDataAttributes[];
  links: JsonApiLinks;
}

// Fetch content from a Json API link, destructure the data/attribute and links
const fetchContentFromDrupal = async (link: JsonApiLink): Promise<JsonApiContent> => {

  // destructure the response in drupal and keep only the attributes fields and the links
  const { data: { data: data, links } } = await axios.get<{
    data: { attributes: JsonApiDataAttributes }[],
    links: JsonApiLinks
  }>(link.href);

  // further destructuring the data object to keep only the attributes
  const attributesOnly = data.map((item) => item.attributes);

  // Log the attributes and links for each content item
  // JUST FOR DEVELOP, DELETE THIS ON PRODUCTION BUILD
  console.log(link.href, { data: attributesOnly, links });

  return { data: attributesOnly, links };
}

export default fetchContentFromDrupal;
