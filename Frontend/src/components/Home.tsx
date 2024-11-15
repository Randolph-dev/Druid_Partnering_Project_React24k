import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import Hero from "./HomePage/Hero";
import Service from "./HomePage/Service";
import Advertise from "./HomePage/Advertise";
import { Paragraph, RestResponseData } from "../types/drupal";
import Projects from "./HomePage/Projects";
import { setPageData } from "../features/drupalData/drupalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Home() {
  const drupalUrl: string = import.meta.env.VITE_DRUPAL_URL;
  const dispatch = useDispatch();
  const frontPageData = useSelector((state: RootState) => state.drupal.pageData.frontpage);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get<RestResponseData[]>(`${drupalUrl}frontpage`);
      dispatch(setPageData({ page: "frontpage", data: data[0]["field_frontpage_sections"] }));
    };
    if (!frontPageData) {
      fetchData()
    }
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

      {/*  */}
      <Container className="my-5">
        <h1 className="text-center">Community for developers by developers.</h1>
        <p className="text-center">&rarr; Get to know our culture and people</p>
      </Container>
    </Container>
  );
}
