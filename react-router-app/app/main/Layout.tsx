import { Container } from "reactstrap";
import { Outlet } from "react-router";
import { Menu } from "./Menu";
import { Footer } from "../components/Footer";

export default function Layout() {
  return (
    <>
      <Menu />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}
