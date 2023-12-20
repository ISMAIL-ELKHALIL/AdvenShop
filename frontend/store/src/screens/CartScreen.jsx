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
const CartScreen = () => {
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
    <div className="cb">
      <div className="container">
        <Row>
          <Col md={8}>
            {/* <Button className="btn btn-light my-3" onClick={() => navigate(-1)}>
              Go back
            </Button> */}
            <h1 style={{ marginBottom: "20px" }}>Shopping Cart</h1>
            {cartItems.length === 0 ? (
              <Message>
                Your cart is empty{" "}
                <Link to="/"> Shop today' latest products</Link>
              </Message>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item) => {
                  return (
                    <ListGroup.Item key={item._id}>
                      <Row>
                        <Col md={2}>
                          <Image
                            src={item.image?.[0]}
                            alt={item.name.toUpperCase()}
                            fluid
                            rounded
                          ></Image>
                        </Col>
                        <Col md={4}>
                          <Link to={`/products/${item._id}`}>{item.name}</Link>
                        </Col>

                        <Col md={2}>$ {item.price}</Col>

                        <Col md={3} className="text-center">
                          <Col>Quantity:</Col>
                          <Form.Label>
                            <strong>{item.qty}</strong>
                          </Form.Label>
                          <Form.Range
                            value={item.qty}
                            onChange={(event) => {
                              addToCartHandler(
                                item,
                                Number(event.target.value)
                              );
                            }}
                            min={Number(1)}
                            max={Number(item.countInStock)}
                          ></Form.Range>
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
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>
                    Subtotal (
                    {cartItems.reduce((acc, item) => acc + item.qty, 0)} ) items
                  </h4>
                  $
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(2)}
                </ListGroup.Item>

                <ListGroup.Item>
                  <Button
                    type="button"
                    className="btn-block"
                    disabled={cartItems.length === 0}
                    onClick={() => checkoutHandler()}
                  >
                    Proceed To Checkout
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartScreen;
