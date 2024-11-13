import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./HomePage/Hero";
import Service from "./HomePage/Service";
import Advertise from "./HomePage/Advertise";
import { Paragraph, RestResponseData } from "../types/drupal";

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
      {frontPageData.map((section: any) => {
        const key = section.id[0].value;
        switch (section.entity_bundle[0].value) {
          case "frontpage_hero_intro":
            return <Hero key={key} section={section} />;
          case "frontpage_service_pakages":
            return <Service key={key} section={section} />;
          case "frontpage_advertise":
            return <Advertise key={key} section={section} />;
        }
      })}

      {/* body.value */}
      {/* images.map((image: { "uri": string, "title": string }, index: number) =>
        <img key={`${index}_${image.title}`} src={image.uri} alt={image.title} />
  ) */}

      {/* <Container className="my-5">
        <Row>
          <h1 className="my-5">
            The secrets behind our agile web services and websites
          </h1>
        </Row>
        <Row className="d-flex justify-content-between">
          {field_service_paragraph.map((paragraph: string, index: number) => (
            <Col md={5} key={index} className="my-5">
              <h5>{field_service_paragraph_title[index]}</h5>
              <p>{paragraph}</p>
            </Col>
          ))}
        </Row>
      </Container> */}

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
                    Veikkaus {images[images.length - 1].title}
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
