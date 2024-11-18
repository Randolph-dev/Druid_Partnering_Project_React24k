import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setPageData } from "../features/drupalData/drupalSlice";
import { RootState } from "../store/store";
import { Container, Row, Col, ListGroup } from "react-bootstrap";

export default function Maintenance() {
  const drupalUrl: string = import.meta.env.VITE_DRUPAL_URL;
  const dispatch = useDispatch();
  const maintenanceData = useSelector(
    (state: RootState) => state.drupal.pageData.maintenance
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${drupalUrl}node/service?filter[title]=Maintenance&include=field_maintenance_intro,field_magical_support_team,field_magical_team_advantages,field_transition_section,field_web_solutions`
        );

        const maintenanceNode = data.data.find(
          (node: any) => node.attributes.title === "Maintenance"
        );

        if (maintenanceNode) {
          const includedData = data.included || [];
          dispatch(
            setPageData({
              page: "maintenance",
              data: {
                ...maintenanceNode,
                included: includedData,
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
    return <p>Loading</p>;
  }

  // Find sections in included data
  const introSection = maintenanceData.included?.find(
    (item: any) => item.type === "paragraph--maintenance_page_hero_intro"
  );
  const magicalSupportSection = maintenanceData.included?.find(
    (item: any) => item.type === "paragraph--magical_support_section"
  );
  const teamAdvantagesSection = maintenanceData.included?.find(
    (item: any) => item.type === "paragraph--magical_team_advantages"
  );
  const transitionSection = maintenanceData.included?.find(
    (item: any) => item.type === "paragraph--transitioning_maintenance_sectio"
  );
  const webSolutionsSection = maintenanceData.included?.find(
    (item: any) => item.type === "paragraph--web_solution"
  );

  return (
    <Container fluid className="py-5">
      <Row className="mb-5">
        <Col lg={8} className="mx-auto text-center">
          {introSection?.attributes.field_title[0] && (
            <h1
              className="mb-4 fw-bold"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "2.5rem" }}
            >
              {introSection.attributes.field_title[0].value}
            </h1>
          )}

          {introSection?.attributes.field_title[1] && (
            <h3
              className="mb-4 fw-bold"
              style={{ fontFamily: "Roboto, sans-serif", fontSize: "2rem" }}
            >
              {introSection.attributes.field_title[1].value}
            </h3>
          )}

          <div className="content-wrapper">
            {introSection?.attributes.field_maintenance_intro_paragrap.map(
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

          <h3
            className="fw-bold"
            style={{ fontFamily: "Roboto, sans-serif", fontSize: "1.5rem" }}
          >
            {introSection?.attributes.field_title[2]?.value}
          </h3>
          <p
            className="mb-4"
            style={{ fontFamily: "Roboto, sans-serif", fontSize: "1rem" }}
          >
            {introSection?.attributes.field_phone[0]} ({" "}
            {introSection?.attributes.field_contact_hours[0]})
          </p>
          <p
            className="mb-4"
            style={{ fontFamily: "Roboto, sans-serif", fontSize: "1rem" }}
          >
            {introSection?.attributes.field_email[0]}
          </p>
        </Col>
      </Row>
    </Container>
  );
}
