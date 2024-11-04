import { Container } from "react-bootstrap";
import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
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
    </Container>
  );
}
