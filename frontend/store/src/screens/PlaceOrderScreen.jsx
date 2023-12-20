/**
 * React component for the Place Order screen.
 * Displays shipping information, ordered items, and order summary.
 * Allows the user to place an order and initiates the order creation process.
 */
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { clearCartItems, selectCart } from "../slices/cartSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";

const PlaceOrderScreen = () => {
  // React Router hook for navigation
  const navigate = useNavigate();

  // Redux hooks for accessing state and dispatching actions
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  // Use API mutation for creating an order
  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  // Effect to check if shipping address and payment method are selected
  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  /**
   * Handles the click event to place an order.
   * Initiates the order creation process, clears the cart, and redirects to the order confirmation page.
   */
  const placeOrderHandler = async () => {
    try {
      // Use the createOrder mutation to create a new order
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();

      // Dispatch the action to clear cart items
      dispatch(clearCartItems());

      // Redirect to the order confirmation page
      navigate(`/orders/${res?._id}`);
    } catch (error) {
      // Display an error message if the order creation fails
      toast.error(error);
      console.log(error);
    }
  };
  return (
    <div className="cb">
    <div className="container">
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <strong>Method: </strong>
              {cart.paymentMethod}
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Oder Items:</h2>
              {cart?.cartItems?.length === 0 ? (
                <Message>Your Cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => {
                    return (
                      <ListGroup.Item key={`key_${index}`}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item?.image?.[0]}
                              alt={item.name}
                              fluid
                              rounded
                            ></Image>
                          </Col>

                          <Col>
                            <Link to={`/products/${item?._id}`}>
                              {item.name}
                            </Link>
                          </Col>

                          <Col md={4}>
                            {item.qty}*{item.price}=${item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping:</Col>
                  <Col>
                    {cart.shippingPrice === 0
                      ? "Free Shipping"
                      : `$${cart.shippingPrice}`}
                  </Col>
                </Row>
              </ListGroup.Item>
              {/*     <ListGroup.Item>
                <Row>
                  <Col>Tax:</Col>
                  <Col>${cart.TaxPrice}</Col>
                </Row>
              </ListGroup.Item> */}
              <ListGroup.Item>
                <Row>
                  <Col>Total:</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && <Message variant={"danger"}>{error}</Message>}
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cart.cartItems.length === 0}
                  onClick={placeOrderHandler}
                >
                  Place Order
                </Button>

                {isLoading && <Loader></Loader>}
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
    </div>
  );
};

export default PlaceOrderScreen;
