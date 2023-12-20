import React, { useEffect, useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Badge,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";
import { FaCartShopping, FaUser } from "react-icons/fa6";
import { LinkContainer } from "react-router-bootstrap"; //need it
import { useDispatch, useSelector } from "react-redux";
import { selectCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { selectAuth, logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/usersApiSlice";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useLocation } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";

const Header = () => {
  const { cartItems } = useSelector(selectCart);
  const { userInfo } = useSelector(selectAuth);
  const [search, setSearch] = useState();
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar
        className={`top-nav ${location.pathname === "/" ? "navbar-home" : ""}`}
        bg="dark"
        variant="dark"
        expand="md"
        fixed=""
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={`${process.env.PUBLIC_URL}/logo.png`}
                alt="logo"
                width={80}
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-n av">
            <Nav className="me-auto">
              <LinkContainer to="/products">
                <Nav.Link>Shop</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/contact">
                <Nav.Link>Contact</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
            {location.pathname !== "/products" && (
              <div className="d-flex m-auto box-search">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="me-2 search-nav"
                  aria-label="Search"
                  defaultValue={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button
                  className="search-btn"
                  variant="outline-success"
                  onClick={() =>
                    navigate("/products", {
                      state: { search },
                    })
                  }
                >
                  <BiSearchAlt></BiSearchAlt>
                </Button>

              </div>
            )}
            <Nav className="ms-auto">
              <LinkContainer
                className="cart1"
                to="/cart"
                style={{ position: "relative" }}
              >
                <Nav.Link>
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg=""
                      style={{
                        position: "absolute",
                        padding: "2px 5px",
                        borderRadius: "100%",
                        top: "5px",
                        left: "-4px",
                        backgroundColor: "#fe4749",
                      }}
                    >
                      {cartItems.reduce(
                        (a, c) => (a + c.qty < 99 ? a + c.qty : "99+"),
                        0
                      )}
                    </Badge>
                  )}
                  <FaCartShopping className="mx-2"></FaCartShopping>
                  Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <FaUser className="mx-2"></FaUser>Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>

          {/* <DropdownButton
            drop="down-centered"
            title="Menu"
            className="button-menu"
          >
            <LinkContainer to={"cart"}>
              <Dropdown.Item>Cart</Dropdown.Item>
            </LinkContainer>
            <Dropdown.Divider />
            <LinkContainer to={"login"}>
              <Dropdown.Item>Login</Dropdown.Item>
            </LinkContainer>
          </DropdownButton> */}
          <LinkContainer
            className="cart2"
            to="/cart"
            style={{ position: "relative" }}
          >
            <Nav.Link>
              {cartItems.length > 0 && (
                <Badge
                  pill
                  bg=""
                  style={{
                    position: "absolute",
                    padding: "2px 5px",
                    borderRadius: "100%",
                    top: "-5px",
                    left: "-12px",
                    backgroundColor: "#fe4749",
                  }}
                >
                  {cartItems.reduce(
                    (a, c) => (a + c.qty < 99 ? a + c.qty : "99+"),
                    0
                  )}
                </Badge>
              )}
              <FaCartShopping className="mx-2"></FaCartShopping>
              Cart
            </Nav.Link>
          </LinkContainer>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
