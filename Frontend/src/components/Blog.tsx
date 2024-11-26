import { useEffect, useState } from "react";
import { useAppSelector } from "../hooks/hooks";
import fetchContentFromDrupal from "../lib/drupal/drupal-content-api";

interface BlogItem {
  drupal_internal__nid: number;
  field_heading: string;
  field_date?: string[];
  field_author?: string[];
  field_technology?: string[];
  field_paragraph_description?: string[];
  field_image_url?: { uri: string }[];
}

const Blog: React.FC = () => {
  const jsonApiLinks = useAppSelector((state) => state.drupal.jsonApiLinks);
  const [blogItems, setBlogItems] = useState<BlogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogItems = async () => {
      try {
        const response = await fetchContentFromDrupal(
          jsonApiLinks["node--article"]
        );
        setBlogItems(response.data);
      } catch (err) {
        setError("Failed to load blog items.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogItems();
  }, [jsonApiLinks]);

  const handleTechSelect = (tech: string) => {
    setSelectedTech(tech === selectedTech ? null : tech);
  };

  const filteredBlogItems = selectedTech
    ? blogItems.filter((item) => item.field_technology?.includes(selectedTech))
    : blogItems;

  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  if (error) {
    return <p className="text-danger text-center mt-5">{error}</p>;
  }

  return (
    <div className="container py-5">
      {/* Page Header */}
      <header className="text-center mb-5">
        <h1 className="display-4">Blog</h1>
        <p className="lead">
          Writings on and off-topic about everyday life, culture, and the world
          of software development.
        </p>
        <div className="d-flex justify-content-center flex-wrap gap-3">
          {[
            "Druids",
            "Mautic",
            "Drupal",
            "CMS",
            "Website",
            "Customer Experience",
            "DXP",
          ].map((tech) => (
            <span
              key={tech}
              onClick={() => handleTechSelect(tech)}
              className={`tech-term ${selectedTech === tech ? "selected" : ""} 
                bg-white text-black border border-danger rounded-pill 
                d-inline-block p-2 mx-2 cursor-pointer`}
            >
              {tech}
            </span>
          ))}
        </div>
      </header>

      {/* Blog Grid */}
      <div className="row gy-4">
        {filteredBlogItems.map((item) => (
          <div className="col-md-6" key={item.drupal_internal__nid}>
            <div className="card h-100 shadow-sm">
              {item.field_image_url?.[0] && (
                <img
                  src={item.field_image_url[0].uri}
                  className="card-img-top"
                  alt={item.field_heading}
                />
              )}
              <div className="card-body">
                <h5 className="card-title">{item.field_heading}</h5>
                <p className="text-muted mb-2 small">
                  {item.field_date?.[0] || "No Date"}{" "}
                  <span className="mx-2">|</span>{" "}
                  {item.field_author?.[0] || "Unknown Author"}{" "}
                  <span className="mx-2">|</span>{" "}
                  {item.field_technology?.length > 0
                    ? item.field_technology.map((tech, index) => (
                        <span key={index}>
                          {tech}
                          {index < item.field_technology.length - 1 && (
                            <span className="mx-2">|</span>
                          )}
                        </span>
                      ))
                    : "No Technology"}
                </p>
                <p className="card-text">
                  {item.field_paragraph_description?.[0] || "No Description"}
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
