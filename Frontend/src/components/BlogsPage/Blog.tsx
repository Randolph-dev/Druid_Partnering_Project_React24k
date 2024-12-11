import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArticlesResponse } from "../../types/frontend";

const Blog: React.FC = () => {
  const [headerData, setHeaderData] = useState<{
    heading: string;
    intro: string;
    technologies?: string[];
  } | null>(null);
  const [allArticles, setAllArticles] = useState<ArticlesResponse["data"]>([]);
  const [filteredArticles, setFilteredArticles] = useState<
    ArticlesResponse["data"]
  >([]);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://druidpartneringapp.lndo.site/api/node/article"
        );
        if (!response.ok) throw new Error("Failed to fetch articles");

        const data: ArticlesResponse = await response.json();

        const header = data.data.find(
          (item) => item.attributes.title === "Header"
        );

        // Get header data
        if (header) {
          setHeaderData({
            heading: header.attributes.field_heading[0],
            intro: (header.attributes as any).field_intro_paragraph?.[0] || "",
            technologies: header.attributes.field_technology,
          });
        }

        // Filter out the header from articles
        const articles = data.data.filter(
          (item) => item.attributes.title !== "Header"
        );

        // Sort articles by newest date first
        const sortedArticles = articles.sort((a, b) => {
          const dateA = new Date(a.attributes.field_date[0]).getTime();
          const dateB = new Date(b.attributes.field_date[0]).getTime();
          if (dateB !== dateA) return dateB - dateA;
          return a.attributes.title.localeCompare(b.attributes.title);
        });

        setAllArticles(sortedArticles);
        setFilteredArticles(sortedArticles);
      } catch (err) {
        setError("Failed to load articles. Please try again later.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let updatedArticles = selectedTechnology
      ? allArticles.filter((article) =>
          article.attributes.field_technology?.includes(selectedTechnology)
        )
      : allArticles;

    setFilteredArticles(updatedArticles);
  }, [selectedTechnology, allArticles]);

  const handleTechnologyClick = (tech: string) => {
    setSelectedTechnology(tech);
  };

  if (error) {
    return <div className="container text-center py-5">{error}</div>;
  }

  return (
    <div className="container py-5">
      {/* Header Section */}
      {headerData && (
        <header className="text-center mb-5">
          <h2 className="display-4">{headerData.heading}</h2>
          <p className="lead">{headerData.intro}</p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            {headerData.technologies?.map((tech) => (
              <span
                key={tech}
                className={`p-2 rounded-pill border border-1 ${
                  selectedTechnology === tech
                    ? "bg-danger text-white"
                    : "bg-white text-black border-danger"
                } fw-light`}
                onClick={() => handleTechnologyClick(tech)}
                style={{ cursor: "pointer" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </header>
      )}

      {/* Articles Section */}
      <div className="row gy-4">
        {filteredArticles.map((article) => (
          <div className="col-md-6" key={article.id}>
            <div
              className="card h-100 shadow-sm transition-transform"
              onMouseEnter={(e) => {
                e.currentTarget.classList.add("shadow-lg", "scale-102");
              }}
              onMouseLeave={(e) => {
                e.currentTarget.classList.remove("shadow-lg", "scale-102");
              }}
            >
              {article.attributes.field_image_url?.length > 0 && (
                <Link to={`/article/${article.id}`}>
                  <img
                    src={article.attributes.field_image_url[0].uri}
                    alt={article.attributes.field_heading[0] || "Article image"}
                    className="card-img-top"
                  />
                </Link>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  <Link
                    to={`/article/${article.id}`}
                    className="text-decoration-none text-dark"
                  >
                    {article.attributes.field_heading[0] || "Untitled Article"}
                  </Link>
                </h5>
                <p className="text-muted mb-2 small">
                  {new Date(article.attributes.field_date[0])
                    .toLocaleDateString("en-GB")
                    .replace(/\//g, ".")}
                  <span className="mx-2">|</span>
                  {article.attributes.field_author.join(", ")}
                  {article.attributes.field_technology && (
                    <>
                      <span className="mx-2">|</span>
                      {article.attributes.field_technology.join(" | ")}
                    </>
                  )}
                </p>
                <p className="card-text flex-grow-1">
                  {article.attributes.field_paragraph_description?.join(", ")}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
