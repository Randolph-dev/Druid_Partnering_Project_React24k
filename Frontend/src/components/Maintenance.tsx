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

export default function Maintenance() {
  const drupalUrl: string = import.meta.env.VITE_DRUPAL_URL;
  const dispatch = useDispatch();
  const maintenanceData = useSelector(
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
              data: {
                ...maintenanceNode,
                //@ts-ignore
                includes: includedData,
              },
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

  // Find sections in included data
  const introSection = includedData?.find(
    (item) => item.type === "paragraph--maintenance_page_hero_intro"
  );
  const magicalSupportSection = includedData?.find(
    (item) => item.type === "paragraph--magical_support_section"
  );
  const teamAdvantagesSection = includedData?.find(
    (item) => item.type === "paragraph--magical_team_advantages"
  ) as ParagraphData & { attributes: { field_image_url?: { uri: string }[] } };
  const transitionSection = includedData?.find(
    (item) => item.type === "paragraph--transitioning_maintenance_sectio"
  ) as ParagraphData & {
    attributes: {
      field_transition_paragraph?: string[];
      field_image_url?: { uri: string }[];
    };
  };
  const webSolutionsSection = includedData?.find(
    (item) => item.type === "paragraph--web_solution"
  );

  return (
    <Container fluid className="py-5">
      <Row className="mb-5">
        <Col lg={8} className="mx-auto text-center">
          {introSection?.attributes.field_title?.[0] && (
            <h1
              className="mb-4 fw-bold"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "2.5rem" }}
            >
              {introSection.attributes.field_title[0].value}
            </h1>
          )}

          {introSection?.attributes.field_title?.[1] && (
            <h3
              className="mb-4 fw-bold"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "2rem" }}
            >
              {introSection.attributes.field_title[1].value}
            </h3>
          )}

          <div className="content-wrapper">
            {introSection?.attributes.field_maintenance_intro_paragrap?.map(
              (paragraph: string, index: number) =>
                paragraph && (
                  <p
                    key={index}
                    className="mb-4"
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "1.125rem",
                    }}
                  >
                    {paragraph}
                  </p>
                )
            )}
          </div>

          {introSection?.attributes.field_title?.[2]?.value && (
            <h3
              className="fw-bold"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "1.5rem" }}
            >
              {introSection?.attributes.field_title?.[2]?.value}
            </h3>
          )}
          <p
            className="mb-4"
            style={{ fontFamily: "Roboto, sans-serif", fontSize: "1rem" }}
          >
            {introSection?.attributes.field_phone?.[0] && (
              <>
                {introSection.attributes.field_phone[0]} ({" "}
                {introSection?.attributes.field_contact_hours?.[0]})
              </>
            )}
          </p>
          <p
            className="mb-4"
            style={{ fontFamily: "Roboto, sans-serif", fontSize: "1rem" }}
          >
            {introSection?.attributes.field_email?.[0]}
          </p>
        </Col>
      </Row>

      {/* Magical Support Section */}
      <Row className="mb-5">
        <Col lg={8} className="ps-4">
          <div className="bg-light p-4 rounded shadow-sm">
            <h2
              className="mb-4 h3 fw-bold"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "2rem" }}
            >
              {magicalSupportSection?.attributes.field_title?.[0]?.value}
            </h2>

            {magicalSupportSection?.attributes.field_magical_support_paragraph?.map(
              (paragraph: string, index: number) => (
                <p
                  key={index}
                  className="mb-4"
                  style={{ fontFamily: "Roboto, sans-serif", fontSize: "1rem" }}
                >
                  {paragraph}
                </p>
              )
            )}
          </div>
        </Col>
      </Row>

      {/* Magical Team Advantages section */}
      <Row>
        <Col lg={6} className="ps-4">
          <div
            style={{
              backgroundColor: "#FFFFFF",
              padding: "20px",
              borderRadius: "5px",
            }}
          >
            <h2
              className="mb-4 h3 fw-bold"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "2rem" }}
            >
              {teamAdvantagesSection?.attributes.field_title?.[0]?.value}
            </h2>

            {teamAdvantagesSection?.attributes.field_title?.length
              ? teamAdvantagesSection.attributes.field_title
                  .slice(1)
                  .map((title: any, index: number) => (
                    <p
                      key={index}
                      className="mb-4 lh-lg"
                      style={{
                        fontFamily: "Roboto, sans-serif",
                        fontSize: "1rem",
                      }}
                    >
                      <strong>{title.value}</strong>{" "}
                      {
                        (teamAdvantagesSection as any)?.attributes
                          .field_magical_support_team_descr[index]
                      }
                    </p>
                  ))
              : null}

            <Row className="mb-5">
              <Col lg={8} className="ps-3">
                <div
                  className="d-flex align-items-center"
                  style={{ marginTop: "10px" }}
                >
                  <div className="arrow" style={{ marginRight: "10px" }}>
                    <span style={{ fontSize: "18px", color: "red" }}>➔</span>
                  </div>
                  <p style={{ margin: 0, color: "black" }}>Contact Us</p>
                </div>
              </Col>
            </Row>
          </div>
        </Col>

        <Col lg={6} className="d-flex align-items-center">
          {teamAdvantagesSection?.attributes.field_image_url?.[0]?.uri && (
            <img
              src={teamAdvantagesSection.attributes.field_image_url[0].uri}
              alt=""
              className="img-fluid rounded"
            />
          )}
        </Col>
      </Row>

      {/* Transition section with title and steps */}
      <section
        className="transition py-5"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <Container>
          <Row className="text-center">
            <Col>
              <h2
                className="mb-4"
                style={{ fontFamily: "Roboto, sans-serif", fontSize: "2rem" }}
              >
                {transitionSection?.attributes?.field_title?.[0]?.value
                  ?.split("\n")
                  .map((line: string, index: number) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
              </h2>
              <p
                className="mb-4"
                style={{
                  marginTop: "50px",
                  textAlign: "left",
                  fontFamily: "Roboto, sans-serif",
                  fontSize: "1rem",
                }}
              >
                {transitionSection?.attributes?.field_transition_paragraph?.[0]
                  ?.split("\n")
                  .map((line: string, index: number) => (
                    <span key={index}>
                      {line}
                      <br />
                    </span>
                  ))}
              </p>
            </Col>
          </Row>
          <Row>
            <Col md={4} className="d-flex justify-content-start">
              {transitionSection?.attributes.field_image_url?.[0]?.uri && (
                <img
                  src={transitionSection.attributes.field_image_url[0].uri}
                  alt=""
                  className="img-fluid"
                  style={{
                    maxWidth: "80%",
                    opacity: 0.8,
                  }}
                />
              )}
            </Col>
            <Col md={8} className="mx-auto">
              <ListGroup>
                {transitionSection?.attributes.field_transition_steps?.map(
                  (step: string, index: number) => (
                    <ListGroup.Item
                      key={index}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "white",
                        marginBottom: "10px",
                        textAlign: "left",
                      }}
                    >
                      {step}
                    </ListGroup.Item>
                  )
                )}
              </ListGroup>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Web Solutions section with icons and descriptions */}
      <section className="web-solutions py-5">
        <Container>
          <Row className="mb-4">
            <Col className="text-center">
              <h2
                className="mb-4"
                style={{ fontFamily: "Roboto, sans-serif", fontSize: "2rem" }}
              >
                {webSolutionsSection?.attributes.field_title?.[0]?.value}
              </h2>
            </Col>
          </Row>
          {webSolutionsSection?.attributes.field_web_solution_description?.map(
            (desc: string, index: number) => (
              <Row key={index} className="mb-4 align-items-center">
                <Col md={2} className="text-center">
                  {webSolutionsSection?.attributes?.field_web_solution_icon?.[
                    index
                  ] && (
                    <img
                      src={
                        webSolutionsSection.attributes.field_web_solution_icon[
                          index
                        ].uri
                      }
                      alt=""
                      className="img-fluid"
                    />
                  )}
                </Col>
                <Col md={10}>
                  <p
                    style={{
                      fontFamily: "Roboto, sans-serif",
                      fontSize: "1rem",
                    }}
                  >
                    {desc}
                  </p>
                </Col>
              </Row>
            )
          )}
        </Container>
      </section>
    </Container>
  );
}
