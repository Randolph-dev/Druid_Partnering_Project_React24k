import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPageData } from "../features/drupalData/drupalSlice";
import { RootState } from "../store/store";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

interface ApiResponse {
  jsonapi: {
    version: string;
    meta: {
      links: {
        self: {
          href: string;
        };
      };
    };
  };
  data: NodeData[];
  included: ParagraphData[];
  links: {
    self: {
      href: string;
    };
  };
}

interface NodeData {
  type: string;
  id: string;
  attributes: {
    drupal_internal__nid: number;
    title: string;
    field_magical_support_team_descr?: string[];
    field_image_url?: { uri: string }[];
  };
  relationships: {
    field_maintenance_intro: RelationshipData;
    field_magical_support_team: RelationshipData;
    field_magical_team_advantages: RelationshipData;
    field_transition_section: RelationshipData;
    field_web_solutions: RelationshipData;
  };
}

interface RelationshipData {
  data: { type: string; id: string }[] | null;
  links: {
    related: {
      href: string;
    };
    self: {
      href: string;
    };
  };
}

interface ParagraphData {
  type: string;
  id: string;
  attributes: {
    field_title?: { value: string }[];
    field_maintenance_intro_paragrap?: string[];
    field_phone?: string[];
    field_email?: string[];
    field_contact_hours?: string[];
    field_magical_support_paragraph?: string[];
    field_transition_paragraph?: string[];
    field_transition_steps?: string[];
    field_web_solution_description?: string[];
    field_web_solution_icon?: { uri: string }[];
  };
}

const SectionTitle: React.FC<{ title?: string }> = ({ title }) => (
  <h2 className="h3">{title}</h2>
);

const ParagraphList: React.FC<{ paragraphs?: string[] }> = ({ paragraphs }) => (
  <>
    {paragraphs?.map((paragraph, index) => (
      <p key={index} className="lead mb-4">
        {paragraph}
      </p>
    ))}
  </>
);

const ImageSection: React.FC<{ imageUrl?: string }> = ({ imageUrl }) =>
  imageUrl ? <img src={imageUrl} alt="" className="img-fluid rounded" /> : null;

const Maintenance: React.FC = () => {
  const drupalUrl: string = import.meta.env.VITE_DRUPAL_URL;
  const dispatch = useDispatch();
  const maintenanceData: any = useSelector(
    (state: RootState) => state.drupal.pageData.maintenance
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<ApiResponse>(
          `${drupalUrl}node/service?filter[title]=Maintenance&include=field_maintenance_intro,field_magical_support_team,field_magical_team_advantages,field_transition_section,field_web_solutions`
        );

        const maintenanceNode = data.data.find(
          (node) => node.attributes.title === "Maintenance"
        );

        if (maintenanceNode) {
          const includedData: ParagraphData[] = (data.included || []).map(
            (item) => item as ParagraphData
          );

          dispatch(
            setPageData({
              page: "maintenance",
              // @ts-ignore
              data: {
                ...maintenanceNode,
                includes: includedData as ParagraphData[],
              } as NodeData,
            })
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (!maintenanceData) {
      fetchData();
    }
  }, [drupalUrl, dispatch, maintenanceData]);

  if (!maintenanceData) {
    return <p>Loading...</p>;
  }

  const includedData = maintenanceData.includes as unknown as ParagraphData[];

  const introSection = includedData?.find(
    (item) => item.type === "paragraph--maintenance_page_hero_intro"
  );
  const magicalSupportSection = includedData?.find(
    (item) => item.type === "paragraph--magical_support_section"
  );
  const teamAdvantagesSection = includedData?.find(
    (item) => item.type === "paragraph--magical_team_advantages"
  );
  const transitionSection = includedData?.find(
    (item) => item.type === "paragraph--transitioning_maintenance_sectio"
  );
  const webSolutionsSection = includedData?.find(
    (item) => item.type === "paragraph--web_solution"
  );

  return (
    <Container fluid className="p-0">
      {/* Intro Section */}
      <Row className="my-5">
        <Col lg={8} className="mt-5 mx-auto text-center">
          {introSection?.attributes.field_title?.map((title, index) => (
            <SectionTitle key={index} title={title.value} />
          ))}
          <div className="my-5">
            <ParagraphList
              paragraphs={
                introSection?.attributes.field_maintenance_intro_paragrap
              }
            />
            <p className="mb-4">
              {introSection?.attributes.field_phone?.[0]} (
              {introSection?.attributes.field_contact_hours?.[0]})
            </p>
            <p className="mb-4">{introSection?.attributes.field_email?.[0]}</p>
          </div>
        </Col>
      </Row>

      {/* Magical Support Section */}
      <Row className="d-flex justify-content-center my-5">
        <Col lg={10} className="">
          <div className="bg-light p-5 rounded shadow-sm">
            <SectionTitle
              title={magicalSupportSection?.attributes.field_title?.[0]?.value}
            />
            <ParagraphList
              paragraphs={
                magicalSupportSection?.attributes
                  .field_magical_support_paragraph
              }
            />
          </div>
        </Col>
      </Row>

      {/* Magical Team Advantages Section */}
      <Container className="my-5 py-5">
        <Row>
          <Col lg={6}>
            <SectionTitle
              title={teamAdvantagesSection?.attributes.field_title?.[0]?.value}
            />
            {teamAdvantagesSection?.attributes.field_title?.length
              ? teamAdvantagesSection.attributes.field_title
                  .slice(1)
                  .map((title, index) => (
                    <p key={index} className="mb-4 lh-lg">
                      <strong>{title.value}</strong>{" "}
                      {
                        (
                          teamAdvantagesSection.attributes as NodeData["attributes"]
                        ).field_magical_support_team_descr?.[index]
                      }
                    </p>
                  ))
              : null}
          </Col>
          <Col lg={6} className="d-flex align-items-center">
            <ImageSection
              imageUrl={
                // @ts-ignore
                teamAdvantagesSection?.attributes.field_image_url?.[0]?.uri
              }
            />
          </Col>
        </Row>
      </Container>

      {/* Transition Section */}
      <Container fluid className="py-5 bg-black text-white">
        <Row className="pt-2 text-center">
          <Col>
            <h2>{transitionSection?.attributes?.field_title?.[0]?.value}</h2>
            <p className="p-5">
              {transitionSection?.attributes?.field_transition_paragraph?.[0]
                ?.split("\n")
                .map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
            </p>
          </Col>
        </Row>
        <Row className="px-5 d-flex align-items-center">
          <Col md={6}>
            <ImageSection
              imageUrl={
                // @ts-ignore
                transitionSection?.attributes.field_image_url?.[0]?.uri
              }
            />
          </Col>
          <Col>
            <ListGroup>
              {transitionSection?.attributes.field_transition_steps?.map(
                (step, index) => (
                  <ListGroup.Item
                    key={index}
                    className="p-4 bg-transparent border-0 text-white"
                  >
                    <span className="p-2" style={{ color: "red" }}>
                      &rarr;
                    </span>
                    {step}
                  </ListGroup.Item>
                )
              )}
            </ListGroup>
          </Col>
        </Row>
      </Container>

      {/* Web Solutions Section */}
      <section className="web-solutions py-5">
        <Container>
          <Row className="mt-5">
            <Col className="text-center">
              <SectionTitle
                title={webSolutionsSection?.attributes.field_title?.[0]?.value}
              />
            </Col>
          </Row>
          {webSolutionsSection?.attributes.field_web_solution_description?.map(
            (desc, index) => (
              <Row
                key={index}
                className="my-5 align-items-center justify-content-center"
              >
                <Col md={2} className="text-center">
                  <ImageSection
                    imageUrl={
                      webSolutionsSection?.attributes.field_web_solution_icon?.[
                        index
                      ]?.uri
                    }
                  />
                </Col>
                <Col md={10} className="">
                  <p>{desc}</p>
                </Col>
              </Row>
            )
          )}
        </Container>
      </section>
    </Container>
  );
};

export default Maintenance;
