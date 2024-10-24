import axios from "axios";

// this default url should return everything exported by json api
const drupalUrl: string = "http://127.0.0.1:51604/api/";

interface JsonApiLink {
  href: string;
}

interface MetaLinks {
  self: JsonApiLink;
}

interface JsonApiMeta {
  links: MetaLinks;
}

interface JsonApi {
  version: string;
  meta: JsonApiMeta;
}

interface MetaMe {
  id: string;
}

interface MeLink {
  meta: MetaMe;
  href: string;
}

interface Meta {
  links: {
    me: MeLink;
  };
}

interface Links {
  [key: string]: JsonApiLink;
}

interface DrupalJsonApiResponse {
  jsonapi: JsonApi;
  data: any[];
  meta: Meta;
  links: Links;
}

const fetchJsonApiFromDrupal = async (): Promise<DrupalJsonApiResponse> => {
  const res = await axios.get<DrupalJsonApiResponse>(drupalUrl);
  return res.data;
}

export default fetchJsonApiFromDrupal;