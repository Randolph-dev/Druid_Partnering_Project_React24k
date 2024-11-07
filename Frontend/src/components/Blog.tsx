import { useEffect } from "react";
import { useAppSelector } from "../hooks/hooks";
import fetchContentFromDrupal from "../lib/drupal/drupal-content-api";

const Blog: React.FC = () => {
    const jsonApiLinks = useAppSelector(state => state.drupal.jsonApiLinks);

    useEffect(() => {
        console.log(fetchContentFromDrupal(jsonApiLinks["node--article"]));
    }, [jsonApiLinks])

    return (
        <div>
            <h1>Blogs</h1>
            <p>Blog content will be here</p>
        </div>
    )
}

export default Blog;