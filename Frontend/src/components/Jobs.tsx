import { Container } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";

import { Paragraph, RestResponseData } from "../types/drupal";
import { setPageData } from "../features/drupalData/drupalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import Hero from "./JobsPage/Hero";
import Benefits from "./JobsPage/Benefits";
import AboutCompany from "./JobsPage/AboutCompany";

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
          case "jobspage_benefits":
            return <Benefits key={key} section={section} />;
          case "jobspage_about_company":
            return <AboutCompany key={key} section={section} />;
          default:
            return null;
        }
      })}
    </Container>
  );
}

/*

 <Container className="p-0" fluid>
    hero section...

    benefits section...

      <Container className="my-5 py-5 bg-dark text-light" fluid>
        <h2 className="pb-5 text-center">Meet the druids</h2>
        <Row className="justify-content-center">
          <Col xs="auto" className="d-flex justify-content-center mb-4">
            <div
              className="d-flex, justify-content-center, align-items-center rounded-pill"
              style={{
                width: "180px",
                height: "180px",
                overflow: "hidden",
              }}
            >
              <Image
                src="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                alt="Profile 1"
                roundedCircle
                fluid
              />
            </div>
          </Col>
        </Row>
        <Col>
          <Button
            className="p-3 px-5 rounded-pill border-0"
            style={{ backgroundColor: "#EF3428" }}
          >
            More people
          </Button>
        </Col>
      </Container>
    </Container>

*/
