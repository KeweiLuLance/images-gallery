import { Nav, Navbar, Container } from 'react-bootstrap';

const NavigationHeader = ({ title }) => {
  return (
    <Container className="mb-2">
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">{title}</Navbar.Brand>
          <Nav className="me-auto"></Nav>
        </Container>
      </Navbar>
    </Container>
  );
};

export default NavigationHeader;
