import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./HomePage/Hero";
import Service from "./HomePage/Service";
import Advertise from "./HomePage/Advertise";
import { Paragraph, RestResponseData } from "../types/drupal";
import Projects from "./HomePage/Projects";

export default function Home() {
  const [frontPageData, setFrontPageData] = useState<Paragraph[] | []>([]); // TODO: type this properly

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<RestResponseData[]>('https://druidpartneringapp.lndo.site/api/frontpage');
      setFrontPageData(data[0]["field_frontpage_sections"]);
    };
    fetchData();
  }, []);

  // console.log(frontPageData);

  if (!frontPageData) {
    return <p>Loading</p>;
  }

  return (
    <Container fluid className="p-0">
      {frontPageData.map((section: Paragraph) => {
        const key = section.id[0].value;
        switch (section.entity_bundle[0].value) {
          case "frontpage_hero_intro":
            return <Hero key={key} section={section} />;
          case "frontpage_service_pakages":
            return <Service key={key} section={section} />;
          case "frontpage_advertise":
            return <Advertise key={key} section={section} />;
          case "frontpage_projects":
            return <Projects key={key} section={section} />;
          default:
            return;
        }
      })}

      {/* <Container className="my-5">
        <Row className="justify-content-between">
          <Col md={5}>
            {images
              .slice(1, -1)
              .map((image: { uri: string; title: string }, index: number) => (
                <div key={index} className="my-5">
                  <Image src={image.uri} alt={image.title} fluid />
                  <h3 className="my-4">City of Helsinki</h3>
                  <p>
                    New universal Drupal platform and the revamp of Hel.fi web
                    service - efficient and accessible content production.
                  </p>
                  <p>&rarr; Read more</p>
                </div>
              ))}
          </Col>

          <Col md={6}>
            <h1 className="d-flex justify-content-end">Our Work</h1>
            <div>
              {images.length > 0 && (
                <div className="my-5">
                  <Image
                    src={images[images.length - 1].uri}
                    alt={images[images.length - 1].title}
                    fluid
                  />
                  <h3 className="my-4">
                    Veikkaus {images[images.length - 1].title}
                  </h3>
                  <p>
                    New universal Drupal platform and the revamp of Hel.fi web
                    service - efficient and accessible content production.
                  </p>
                  <p>&rarr; Read more</p>
                </div>
              )}
            </div>
          </Col>
        </Row>
      </Container> */}

      {/* <Container className="my-5">
        <h1 className="text-center">Community for developers by developers.</h1>
        <p className="text-center">&rarr; Get to know our culture and people</p>
      </Container> */}
    </Container>
  );
}
