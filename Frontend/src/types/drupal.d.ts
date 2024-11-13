export type Field = {
  value: string;
  format: string;
};

export type Paragraph = {
  entity_bundle: { value: string }[];
  id: { value: number }[];
  [key: string]: Field[] | Paragraph[];
};

export type RestResponseData = {
  [key: string]: any;
};