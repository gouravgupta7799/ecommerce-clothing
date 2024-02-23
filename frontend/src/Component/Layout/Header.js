import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Cart from '../Cart/CartProducts'
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../ContextStore/Auth-Context';

function ColorSchemesExample() {
  const history = useNavigate()
  const AuthCtx = useContext(AuthContext);

  const Auth = AuthCtx.isLoggedIn

  const logoutHandler = () => {
    AuthCtx.logOut();
    history('/home')
  }

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <h2 style={{ color: 'white', margin: '0px 25px 0px' }}>Ecommerce</h2>
          <Nav className="me-auto">
            {<Nav.Link as={Link} to="/home">Home</Nav.Link>}
            {Auth && <Nav.Link as={Link} to="/profile">Profile</Nav.Link>}
            {Auth && <Nav.Link as={Link} to="/Store">Store</Nav.Link>}
            <Nav.Link as={Link} to="/About">About</Nav.Link>
            <Nav.Link as={Link} to="/Contact">ContactUs</Nav.Link>
            {Auth && <Nav.Link as={Link} to="/order">Orders</Nav.Link>}
            {!Auth && <Nav.Link as={Link} to="/">login</Nav.Link>}
            <Nav>
              {Auth &&
                <button style={{
                  font: 'inherit',
                  background: '#7b26b4',
                  border: '1px solid white',
                  color: 'white',
                  fontWeight: 'bold',
                  padding: '0.5rem 1rem',
                  margin: '0 0 0 1.5rem',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }} onClick={logoutHandler}>Logout</button>
              }
            </Nav>
          </Nav>
          <Nav style={{ cursor: 'pointer' }}>
            {Auth && <Cart />}
          </Nav>
        </Container>
      </Navbar >
    </>
  );
}

export default ColorSchemesExample;