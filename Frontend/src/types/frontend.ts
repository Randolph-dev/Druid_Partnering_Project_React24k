export interface Article {
  id: string;
  attributes: {
    field_author: string[];
    title: string;
    field_date: string[];
    field_heading: string[];
    field_technology?: string[];
    field_paragraph_description?: string[];
    field_image_url: { uri: string }[];
    field_content: { value: string }[];
  };
}

export interface ArticleResponse {
  data: Article;
}

export interface ArticlesResponse {
  data: Article[];
}
