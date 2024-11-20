import { Container } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import Hero from "./HomePage/Hero";
import Service from "./HomePage/Service";
import Advertise from "./HomePage/Advertise";
import { Paragraph, RestResponseData } from "../types/drupal";
import Projects from "./HomePage/Projects";
import { setCurrentHomepageData, setHomepagesData } from "../features/drupalData/drupalSlice";
import { useDispatch } from "react-redux";
import { RootState } from "../store/store";
import Quotes from "./HomePage/Quotes";
import { useAppSelector } from "../hooks/hooks";
import { setDynamicContent } from "../lib/mautic/setDynamicContent";
// import { setDynamicContent } from "../lib/mautic/setDynamicContent";

export default function Home() {
  const drupalUrl: string = import.meta.env.VITE_DRUPAL_URL;
  const dispatch = useDispatch();
  const homepagesData = useAppSelector((state: RootState) => state.drupal.homepagesData);
  const currentPageData = useAppSelector((state: RootState) => state.drupal.currentHomepageData.frontpage);
  const userType = useAppSelector((state: RootState) => state.drupal.userType);

  // fetch all homepages from drupal (for all usertypes) and store it in redux
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<RestResponseData[]>(`${drupalUrl}frontpage`);
      dispatch(setHomepagesData(data));
    };
    if (homepagesData.length === 0) {
      fetchData()
    }
  }, []);

  // set the right homepage based on the user type, if no user type is found, show the default homepage
  useEffect(() => {
    if (homepagesData.length > 0 && userType !== undefined) {
      const dynamicContent = setDynamicContent(homepagesData, userType);

      if (dynamicContent.length === 0) {
        dispatch(setCurrentHomepageData({ page: "frontpage", data: homepagesData[0]["field_frontpage_sections"] }));
      } else {
        dispatch(setCurrentHomepageData({ page: "frontpage", data: dynamicContent[0]["field_frontpage_sections"] }));
      }
    }
  }, [userType]);

  // console.log(frontPageData);

  if (!currentPageData) {
    return <p>Loading</p>;
  }

  return (
    <Container fluid className="p-0">
      {currentPageData.map((section: Paragraph) => {
        const key = section.id[0].value;
        // switch here to render the right component based on the paragraph entity name
        switch (section.entity_bundle[0].value) {
          case "frontpage_hero_intro":
            return <Hero key={key} section={section} />;
          case "frontpage_service_pakages":
            return <Service key={key} section={section} />;
          case "frontpage_advertise":
            return <Advertise key={key} section={section} />;
          case "frontpage_projects":
            return <Projects key={key} section={section} />;
          case "frontpage_quote":
            return <Quotes key={key} section={section} />;
          default:
            return;
        }
      })}
    </Container>
  );
}
