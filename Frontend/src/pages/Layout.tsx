import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./Footer";
import { useEffect } from "react";

export default function Layout() {
  const location = useLocation();
  const pathname = location.pathname;
  let pageTitle: string;
  if (pathname === "/") {
    pageTitle = "Drupal websites and uncompromising software solutions | Druid";
  } else {
    pageTitle = `${location.pathname.slice(1)} | Drupal websites and uncompromising software solutions | Druid`
  }

  useEffect(() => {
    document.title = pageTitle; // Set the desired page title
  }, [location]);

  return (
    // page container
    <Container
      fluid
      className="d-flex flex-column p-0"
      style={{ minHeight: "100vh" }}
    >
      <NavBar />
      {/* main content container */}
      <Container fluid className="flex-grow-1 p-0">
        {/* this is the output from react router */}
        <Outlet />
      </Container>
      {/* TODO: footer here */}
      <Footer />
    </Container>
  );
}
