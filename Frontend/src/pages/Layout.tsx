import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import { setPageTitle } from "../lib/utils/setPageTitle";

export default function Layout() {
  // a custom script to set the current page title
  // this is important for Mautic to know which page the user visited
  setPageTitle();

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
