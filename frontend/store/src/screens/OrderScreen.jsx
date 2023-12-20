// Importing necessary dependencies from React and other libraries
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";

// Importing custom components for displaying messages and loaders
import Message from "../components/Message";
import Loader from "../components/Loader";
import { toast } from "react-toastify";

// Importing generated API slices for fetching order details and PayPal client ID
import {
  useGetOrderDetailsQuery,
  useGetPayPalClientIdQuery,
  usePayOrderMutation,
} from "../slices/ordersApiSlice";
import { selectAuth } from "../slices/authSlice.js";

// Importing PayPal components for payment processing
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

// Functional component for displaying order details
const OrderScreen = () => {
  // Extracting order ID from the URL parameters
  const { id: orderId } = useParams();

  // Extracting user information from the Redux store
  const { userInfo } = useSelector(selectAuth);

  // Fetching order details using the generated API slice
  const {
    data: order,
    isLoading: isLoadingOrder,
    error,
    refetch,
  } = useGetOrderDetailsQuery(orderId);

  const [payOrder, { isLoading: isLoadingPayOrder }] = usePayOrderMutation();
  // Managing PayPal script loading state using the PayPal script reducer
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Fetching PayPal client ID using the generated API slice
  const {
    data: PayPal,
    isLoading: isLoadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  // Effect hook to load PayPal script when the component mounts
  useEffect(() => {
    if (!errorPayPal && !isLoadingPayPal && PayPal?.clientId) {
      const loadPayPalScript = async () => {
        // Resetting PayPal script options with the obtained client ID
        paypalDispatch({
          type: "resetOptions",
          value: {
            clientId: PayPal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };

      // Checking if the order exists and is not paid
      if (order && !order.isPaid) {
        // Checking if the PayPal script is not already loaded
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, PayPal, paypalDispatch, isLoadingPayPal, errorPayPal]);

  // PayPal methods for handling payment approval, errors, and creating orders
  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment Successful");
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment Successful");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
    });
  };

  const onError = (error) => {
    toast.error(error.message);
  };
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: order.totalPrice,
          },
        },
      ],
    });
  };

  // Rendering loader while order details are being fetched
  if (isLoadingOrder) {
    return <Loader />;
  }

  // Rendering error message if there is an error fetching order details
  if (error) {
    return (
      <Message variant={"danger"}>
        {error?.data?.message || error.error}
      </Message>
    );
  }

  return isLoadingOrder ? (
    <Loader></Loader>
  ) : error ? (
    <Message variant={"danger"}>{error?.data?.message || error.error}</Message>
  ) : (
    <div className="orders cb pt-4 pb-4">
      <div className="container">
        <h2 className="mt-3">Order {order._id}</h2>
        <Row>
          <Col md={8}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>Shipping information</h3>
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.country}{" "}
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <Message variant={"success"}>
                    Delivered on{" "}
                    {new Date(order.deliveredAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Message>
                ) : (
                  <Message variant={"danger"}>Not Delivered</Message>
                )}
              </ListGroup.Item>

              <ListGroup.Item>
                <h3>Payment Method</h3>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>

                {order.isPaid ? (
                  <Message variant={"success"}>
                    Paid At{" "}
                    {new Date(order.paidAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Message>
                ) : (
                  <Message variant={"danger"}>Not Paid</Message>
                )}
              </ListGroup.Item>
              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.map((item, index) => {
                  return (
                    <ListGroup.Item key={index}>
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
                          <Link to={`/products/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.price * item.qty}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={4}>
            <Card>
              <ListGroup>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Row>
                    <Col>Items Price:</Col>
                    <Col>${order.itemsPrice}</Col>
                  </Row>
                  <Row>
                    <Col>Shipping Price:</Col>
                    <Col>
                      {order.shippingPrice === 0
                        ? "Free"
                        : ` $${order.shippingPrice}`}
                    </Col>
                  </Row>
                  {/* 
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
 */}
                  <Row>
                    <Col>Total Price:</Col>
                    <Col>${order.totalPrice}</Col>
                  </Row>

                  {!order.isPaid && (
                    <ListGroup.Item>
                      {isLoadingPayPal && <Loader />}
                      {isPending ? (
                        <Loader />
                      ) : (
                        <div>
                          {/* <Button
                            onClick={() => {
                              onApproveTest();
                            }}
                            style={{ marginBottom: "10px" }}
                          >
                            Test Pay Order
                          </Button> */}
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        </div>
                      )}
                    </ListGroup.Item>
                  )}
                  {/**! PAY AS DELIVERED PLACEHOLDER */}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderScreen;
