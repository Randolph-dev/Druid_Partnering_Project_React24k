import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ArticleResponse } from "../../types/frontend";

const BlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<ArticleResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(
          `https://druidpartneringapp.lndo.site/api/node/article/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch article");
        }

        const data: ArticleResponse = await response.json();
        setArticle(data);
      } catch (err) {
        setError("Something went wrong. Please try again later.");
      }
    };

    fetchArticle();
  }, [id]);

  if (error) {
    return <div className="container text-center py-5">{error}</div>;
  }

  if (!article) {
    return <div className="container text-center py-5">Loading...</div>;
  }

  const {
    field_image_url,
    field_heading,
    field_author,
    field_date,
    field_content,
  } = article.data.attributes;

  return (
    <div className="container py-5">
      <div className="row justify-content-start">
        <div className="col-md-7">
          {/* Image and Author/Date*/}
          {field_image_url && field_image_url.length > 0 && (
            <div className="mb-3">
              <img
                src={field_image_url[0].uri}
                alt={field_heading[0] || "Article image"}
                className="img-fluid rounded mb-3"
              />
              <p className="text-muted mb-3">
                <small>
                  {field_author?.join(", ") || "Unknown Author"} |{" "}
                  {new Date(field_date[0])
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, ".")}
                </small>
              </p>
            </div>
          )}

          {/* Title */}
          <h1 className="fw-bold mb-4">
            {field_heading[0] || "Untitled Article"}
          </h1>

          {/* Content */}
          <div className="content">
            <div
              dangerouslySetInnerHTML={{
                __html: field_content[0]?.value || "No content available",
              }}
            />
          </div>

          {/* Line Break */}
          <div className="border-top border-secondary mt-4"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
