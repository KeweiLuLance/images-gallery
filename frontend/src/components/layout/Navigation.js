import { Nav, Navbar, Container } from 'react-bootstrap';
import { ReactComponent as Logo } from '../../images/logo.svg';

const navbarStyle = {
  backgroundColor: '#eeeeee',
};

const NavigationHeader = ({ title }) => {
  return (
    <Navbar style={navbarStyle} variant="light">
      <Container>
        <Logo alt={title} style={{ maxWidth: '12rem', maxHeight: '2rem' }} />
      </Container>
    </Navbar>
  );
};

export default NavigationHeader;
