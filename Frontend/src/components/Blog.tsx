import { useEffect, useState } from "react";
import axios from "axios";

interface BlogItem {
  drupal_internal__nid: number;
  attributes: {
    field_heading: string[];
    field_date?: string[];
    field_author?: string[];
    field_technology?: string[];
    field_paragraph_description?: string[];
    field_image_url?: { uri: string }[];
  };
}

interface HeaderData {
  title: string;
  field_intro_paragraph: string[];
  field_technology: string[];
}

const Blog: React.FC = () => {
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const [headerData, setHeaderData] = useState<HeaderData | null>(null);
  const [selectedTechnology, setSelectedTechnology] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://druidpartneringapp.lndo.site/api/node/article"
        );
        const articles = response.data.data;

        const headerArticle = articles.find(
          (article: { id: string; attributes: any }) =>
            article.id === "b00ecad0-8f38-4520-b5e1-8bd6ea308144"
        );

        if (headerArticle) {
          setHeaderData({
            title: headerArticle.attributes.field_heading[0],
            field_intro_paragraph:
              headerArticle.attributes.field_intro_paragraph,
            field_technology: headerArticle.attributes.field_technology,
          });
        }

        const filteredBlogItems = articles.filter(
          (article: { id: string; attributes: any }) =>
            article.id !== "b00ecad0-8f38-4520-b5e1-8bd6ea308144"
        );

        const sortedBlogItems = filteredBlogItems.sort(
          (
            a: { attributes: { field_date: string[] } },
            b: { attributes: { field_date: string[] } }
          ) => {
            const dateA = new Date(a.attributes.field_date[0]).getTime();
            const dateB = new Date(b.attributes.field_date[0]).getTime();
            return dateB - dateA;
          }
        );

        setBlogItems(sortedBlogItems);
      } catch (err) {
        setError("Failed to load blog data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTechnologyClick = (tech: string) => {
    setSelectedTechnology((prev) => (prev === tech ? null : tech));
  };

  const filteredBlogItems = selectedTechnology
    ? blogItems.filter((item) =>
      item.attributes.field_technology?.includes(selectedTechnology)
    )
    : blogItems;

  if (loading) {
    return <p className="text-center mt-5">Loading</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-5">{error}</p>;
  }

  return (
    <div className="container py-5">
      {headerData && (
        <header className="text-center mb-5">
          <h2 className="display-4">{headerData.title}</h2>
          <p className="lead">{headerData.field_intro_paragraph[0]}</p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            {headerData.field_technology.map((tech) => (
              <span
                key={tech}
                className={`p-2 rounded-pill border border-1 ${selectedTechnology === tech
                  ? "bg-danger text-white"
                  : "bg-white text-black border-danger"
                  } fw-light custom-cursor cursor-pointer`}
                onClick={() => handleTechnologyClick(tech)}
                style={{ cursor: "pointer" }}
              >
                {tech}
              </span>
            ))}
          </div>
        </header>
      )}

      <div className="row gy-4">
        {filteredBlogItems.length > 0 ? (
          filteredBlogItems.map((item, index) => (
            <div className="col-md-6" key={`${index}_${item.drupal_internal__nid}`}>
              <div
                className="card h-100 shadow-sm transition-transform"
                onMouseEnter={(e) => {
                  e.currentTarget.classList.add("shadow-lg", "scale-102");
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.classList.remove("shadow-lg", "scale-100");
                }}
              >
                {item.attributes.field_image_url?.[0] && (
                  <img
                    src={item.attributes.field_image_url[0].uri}
                    className="card-img-top"
                    alt={item.attributes.field_heading[0]}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">
                    {item.attributes.field_heading[0]}
                  </h5>
                  <p className="text-muted mb-2 small">
                    {item.attributes.field_date?.[0]}{" "}
                    <span className="mx-2">|</span>{" "}
                    {item.attributes.field_author?.[0]}{" "}
                    <span className="mx-2">|</span>{" "}
                    {item.attributes.field_technology &&
                      item.attributes.field_technology.length > 0
                      ? item.attributes.field_technology.map((tech, index) => (
                        <span key={index} className="text-muted small mx-1">
                          {tech}
                          {index <
                            //@ts-ignore
                            item.attributes.field_technology.length - 1 && (
                              <span className="mx-2">|</span>
                            )}
                        </span>
                      ))
                      : null}
                  </p>
                  <p className="card-text">
                    {item.attributes.field_paragraph_description?.[0]}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p key="no-blog-found" className="text-center mt-4">No blog items available.</p>
        )}
      </div>
    </div>
  );
};

export default Blog;
