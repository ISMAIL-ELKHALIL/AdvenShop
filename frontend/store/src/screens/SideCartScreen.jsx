import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import Message from "../components/Message";
import { addToCart, removeFromCart, selectCart } from "../slices/cartSlice";

/**
 * React component representing the shopping cart screen.
 * Handles the display of cart items, their quantities, and provides options
 * to add, remove items, and proceed to checkout.
 */
const SideCartScreen = () => {
  // React Router hook for navigation
  const navigate = useNavigate();
  // Redux hooks for accessing state and dispatching actions
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const { cartItems } = cart;

  // Handles the addition of a product to the shopping cart.

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  // Handles the removal of a product from the shopping cart.

  const removeFromCartHandler = async (productId) => {
    dispatch(removeFromCart(productId));
  };

  /**
   * Navigates to the login screen if the user is not logged in,
   * otherwise, redirects to the shipping screen for checkout.
   */
  const checkoutHandler = () => {
    // Check if the user is logged in, then proceed to the shipping screen
    navigate("/login?redirect=/shipping");
  };

  return (
    <div>
      <Row>
        <Col md={12}>
          {cartItems.length === 0 ? (
            <Message>
              Your cart is empty <Link to="/products">Check Our Products</Link>
            </Message>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => {
                return (
                  <ListGroup.Item key={item._id}>
                    <Row>
                      <Col md={4}>
                        <Link to={`/products/${item._id}`}>
                          <Image
                            src={item?.image?.[0]}
                            alt={item.name}
                            fluid
                            rounded
                          ></Image>
                        </Link>
                      </Col>

                      <Col md={3}>$ {item.price}</Col>

                      <Col md={3} className="text-center">
                        <Form.Label>
                          <strong>{item.qty}</strong>
                        </Form.Label>
                        <Form.Range
                          value={item.qty}
                          onChange={(event) => {
                            addToCartHandler(item, Number(event.target.value));
                          }}
                          min={Number(1)}
                          max={Number(item.countInStock)}
                        />
                      </Col>
                      <Col md={1} style={{ textAlign: "center" }}>
                        <Button
                          type="button"
                          variant="light"
                          size="sm"
                          onClick={() => {
                            removeFromCartHandler(item._id);
                          }}
                        >
                          <FaTrash></FaTrash>
                        </Button>
                      </Col>
                    </Row>
                    <Row></Row>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
          )}
        </Col>
        <Col md={12}>
          <Card className="my-4 mx-4">
            <ListGroup variant="flush">
              <ListGroup.Item className="d-flex justify-content-between">
                <span>
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}
                  ) items{" "}
                </span>
                <span>
                  {" "}
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </span>
              </ListGroup.Item>

              <ListGroup.Item className="text-center">
                <Button
                  type="button"
                  className="btn-block fs-6"
                  disabled={cartItems.length === 0}
                  onClick={() => checkoutHandler()}
                >
                  Checkout
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SideCartScreen;
