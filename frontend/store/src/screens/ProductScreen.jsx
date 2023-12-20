import React, { Fragment, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import {
  useGetProductDetailsQuery,
  useCreateProductReviewMutation,
} from "../slices/productsApiSlice";

import Loader from "../components/Loader";
import Message from "../components/Message";
import { toast } from "react-toastify";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { selectAuth } from "../slices/authSlice";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [activeSize, setActiveSize] = useState(false);
  const [size, setSize] = useState(false);
  const handleSizeClick = (clickedSize) => {
    setActiveSize(clickedSize);
    setSize(size);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    error,
    refetch,
    isLoading,
  } = useGetProductDetailsQuery(productId);

  const [createProductReview, { isLoading: isLoadingProductReview }] =
    useCreateProductReviewMutation();

  const { userInfo } = useSelector(selectAuth);

  const addToCartHandler = () => {
    //? make sure the ...product and qty are in a object
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const addProductReviewHandler = async (event) => {
    event.preventDefault();
    console.log("add review clicked");
    try {
      await createProductReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review Submitted");
      setComment("");
      setRating(0);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };
  return (
    <div className="cb">
    <div className="container">
      {/* <Link className="btn btn-light my-3" to={-1}>
        Go back
      </Link> */}
      {isLoading ? (
        <Loader></Loader>
      ) : error ? (
        <Message>{error?.data?.message || error.error}</Message>
      ) : (
        <>
          <Row className="back-product">
            <Col lg={5}>
              <Carousel
                className="text-center "
                indicators={false}
                variant="dark"
              >
                {product?.image?.map((img) => {
                  return (
                    <Carousel.Item key={product._id}>
                      <Image src={img} alt={img} fluid></Image>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </Col>
            <Col className="bg-white pt-3 pb-4" md={12} lg={7}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item variant="flush">
                  <Rating
                    key={product._id}
                    ratingValue={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </ListGroup.Item>
                <ListGroup.Item>{product.description}</ListGroup.Item>
              </ListGroup>
            
              <Card className="order-product">
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product?.countInStock >= 1 && (
                    <ListGroup.Item>
                      <Row className="text-center">
                        <Col className="qty-product">Quantity:</Col>
                        <Col className="text-center">
                          <Form.Label>
                            <strong>{qty}</strong>
                          </Form.Label>
                          <Form.Range
                            onChange={(event) => {
                              setQty(Number(event.target.value));
                            }}
                            defaultValue={1}
                            min={Number(1)}
                            max={Number(product.countInStock)}
                          />
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item className="text-end">
                    <Button
                      className="btn-block"
                      disabled={product.countInStock <= 0}
                      type="button"
                      onClick={addToCartHandler}
                    >
                      Add to cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          {/*REVIEW SECTION */}
          <Row className="review">
            <Col lg={6} >
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message variant={"light"}>No Reviews</Message>}
              <ListGroup variant="flush">
                <div style={{ maxHeight: "200px", overflowY: "scroll" }}>
                  {product.reviews.map(
                    (review) =>
                      review.isAppropriate && (
                        <ListGroup.Item key={review?._id}>
                          <strong>{review.name}</strong>
                          <Rating ratingValue={review.rating} addRate />
                          <p>{review.createdAt.substring(0, 10)}</p>
                          <p>{review.comment}</p>
                        </ListGroup.Item>
                      )
                  )}
                </div>
                <ListGroup.Item>
                  <h2>Write a review your opinion matters</h2>

                  {isLoadingProductReview && <Loader />}

                  {userInfo ? (
                    <Form onSubmit={addProductReviewHandler}>
                      <Form.Group className="my-2" controlId="rating">
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as="select"
                          required
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value="">Select...</option>
                          <option value="1">1 - Poor</option>
                          <option value="2">2 - Fair</option>
                          <option value="3">3 - Good</option>
                          <option value="4">4 - Very Good</option>
                          <option value="5">5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group className="my-2" controlId="comment">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          required
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={isLoadingProductReview}
                        type="submit"
                        variant="primary"
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to="/login">sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </div>
    </div>
  );
};

export default ProductScreen;
