import { Container } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

import { Paragraph, RestResponseData } from "../types/drupal";
import { setPageData } from "../features/drupalData/drupalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Hero from "./JobsPage/Hero";

export default function Jobs() {
  const drupalUrl: string = import.meta.env.VITE_DRUPAL_URL;
  const dispatch = useDispatch();
  const jobsPageData = useSelector(
    (state: RootState) => state.drupal.pageData.jobspage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<RestResponseData[]>(
          `${drupalUrl}jobspage`
        );
        dispatch(
          setPageData({
            page: "jobspage",
            data: data[0]["field_jobspage_sections"],
          })
        );
      } catch (error) {
        console.error("Error fetching jobs page data:", error);
      }
    };

    if (!jobsPageData) {
      fetchData();
    }
  }, [jobsPageData, dispatch]);

  if (!jobsPageData) {
    return <p>Loading...</p>;
  }

  return (
    <Container fluid className="p-0">
      {jobsPageData.map((section: Paragraph) => {
        const key = section.id[0]?.value ?? "default-key";
        switch (section.entity_bundle[0]?.value) {
          case "jobspage_hero_intro":
            return <Hero key={key} section={section} />;
          default:
            return null;
        }
      })}
    </Container>
  );
}
