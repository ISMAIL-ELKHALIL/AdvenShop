import { Col, Row, ListGroup, Form, Button } from "react-bootstrap";
import {
  useGetProductsQuery,
  useFilterProductsQuery,
} from "../slices/productsApiSlice";
import { useGetAllCategoriesQuery } from "../slices/categoriesApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, selectCart } from "../slices/cartSlice";
import Rating from "../components/Rating";
import OffCanvasCartScreen from "./OffCanvasCartScreen";
import { useLocation } from "react-router-dom";

function FilterProductsScreen() {

  const [isFilterOpen, setFilterOpen] = useState(false);

  const handleFilterButtonClick = () => {
    setFilterOpen(!isFilterOpen);
  };

  const handleCloseButtonClick = () => {
    setFilterOpen(false);
  };

  const location = useLocation();
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetAllCategoriesQuery();

  const searchRef = useRef();

  const {
    data: allProducts,
    isLoading: isLoadingAllProducts,
    error: allProductsError,
  } = useGetProductsQuery();

  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [category, setCategory] = useState(
    location?.state?.category ?? location?.state?.category
  );
  const [rating, setRating] = useState();
  const [search, setSearch] = useState(
    location?.state?.search ?? location?.state?.search
  );
  const [hideRating, setHideRating] = useState(false);
  const [hidePricing, setHidePricing] = useState(false);
  const [hideCategorizing, setHideCategorizing] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);

  const {
    data: products,
    isLoading: isLoadingProducts,
    error,
    refetch: refetchProducts,
  } = useFilterProductsQuery({
    minPrice,
    maxPrice,
    category,
    name: search,
    rating,
  });

  // const [products, setProducts] = useState(isLoadingProducts ? [] : data);
  // Handles the addition of a product to the shopping cart.

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  return (
    <div className="page-all-products">
      <div className="container">
        <Row>
          <Col lg={3}>
            <div className={`side-filter ${isFilterOpen ? 'open' : ''}`}>
            <span className="close-btn" onClick={handleCloseButtonClick}><i class="bi bi-x-circle"></i></span>
              <ListGroup>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Disabled input example"
                  ref={searchRef}
                  defaultValue={search}
                  onChange={() =>
                    setTimeout(() => {
                      setSearch(searchRef?.current?.value ?? search);
                    }, 1500)
                  }
                />
              </ListGroup>

              <h5>Category</h5>
              <ListGroup>
                {hideCategorizing && (
                  <ListGroup.Item>
                    <Form.Check
                      type="radio"
                      label="All categories"
                      name="category"
                      onClick={() => {
                        setCategory("");
                        setHideCategorizing(false);
                      }}
                    />
                  </ListGroup.Item>
                )}
                {/* *Todo: don't show categories if empty */}
                {!isLoadingCategories &&
                  !categoriesError &&
                  categories?.map((category) => {
                    return (
                      <ListGroup.Item key={category._id}>
                        <Form.Check
                          defaultChecked={
                            location?.state?.category === category._id
                          }
                          type="radio"
                          label={`${category.name} (${
                            allProducts?.filter(
                              (product) => product.category === category._id
                            ).length || 0
                          })`}
                          value={category._id}
                          name="category"
                          onClick={(event) => {
                            setCategory(event.target?.value);
                            setHideCategorizing(true);
                          }}
                        />
                      </ListGroup.Item>
                    );
                  })}
              </ListGroup>
              <h5>Price</h5>
              <ListGroup>
                {hidePricing && (
                  <ListGroup.Item>
                    <Form.Check
                      type="radio"
                      label="Any price"
                      name="price"
                      onClick={() => {
                        setMaxPrice();
                        setMinPrice();
                        setHidePricing(false);
                      }}
                    />
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    label="$0 - $25"
                    name="price"
                    onClick={(e) => {
                      setMinPrice(0);
                      setMaxPrice(25);
                      setHidePricing(true);
                    }}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    label="$25 - $50"
                    name="price"
                    onClick={(e) => {
                      setMinPrice(25);
                      setMaxPrice(50);
                      setHidePricing(true);
                    }}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    label="$50 - $100"
                    name="price"
                    onClick={(e) => {
                      setMinPrice(50);
                      setMaxPrice(100);
                      setHidePricing(true);
                    }}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    label="$100 - $200"
                    name="price"
                    onClick={(e) => {
                      setMinPrice(100);
                      setMaxPrice(200);
                      setHidePricing(true);
                    }}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    label="$200 - above"
                    name="price"
                    onClick={(e) => {
                      setMinPrice(200);
                      setMaxPrice();
                      setHidePricing(true);
                    }}
                  />
                </ListGroup.Item>
              </ListGroup>

              <h5>Rating</h5>
              <ListGroup>
                {hideRating && (
                  <ListGroup.Item>
                    <Form.Check
                      type="radio"
                      name="rate"
                      label={"Any rate"}
                      onClick={(e) => {
                        setRating();
                        setHideRating(false);
                      }}
                    />
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    name="rate"
                    label={
                      <>
                        <Rating ratingValue={4} addRate></Rating>
                      </>
                    }
                    onClick={() => {
                      setRating(4);
                      setHideRating(true);
                    }}
                  />
                </ListGroup.Item>
                <ListGroup.Item className="d-flex align-content-center">
                  <Form.Check
                    type="radio"
                    name="rate"
                    label={<Rating ratingValue={3} addRate></Rating>}
                    onClick={() => {
                      setRating(3);
                      setHideRating(true);
                    }}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    name="rate"
                    label={<Rating ratingValue={2} addRate></Rating>}
                    onClick={() => {
                      setRating(2);
                      setHideRating(true);
                    }}
                  />
                </ListGroup.Item>
                <ListGroup.Item>
                  <Form.Check
                    type="radio"
                    name="rate"
                    label={<Rating ratingValue={1} addRate></Rating>}
                    onClick={() => {
                      setRating(1);
                      setHideRating(true);
                    }}
                  />
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
         

          <Col md={12} lg={9}>
          <button className="btn-filter" onClick={handleFilterButtonClick}>Show Filter</button>
            <div className="show-products">
              <Row>
                {isLoadingProducts ? (
                  <Loader></Loader>
                ) : error ? (
                  <Message className="text-center" variant={"danger"}>
                    {
                      "We're sorry, but we encountered an issue while processing your request."
                    }
                  </Message>
                ) : (
                  <div className="all-products">
                    <Row>
                      {products.length === 0 ? (
                        <Message className="text-center" variant={"danger"}>
                          No product found
                        </Message>
                      ) : (
                        products?.map((product) => {
                          return (
                            <Col key={product._id} sm={12} md={6} lg={4}>
                              <Product className="product" product={product}>
                                {
                                  <>
                                    <OffCanvasCartScreen
                                      disabled={product.countInStock <= 0}
                                      onClick={() => {
                                        addToCartHandler(product, 1);
                                      }}
                                    >
                                      add to cart
                                    </OffCanvasCartScreen>
                                  </>
                                }
                              </Product>
                            </Col>
                          );
                        })
                      )}
                    </Row>
                  </div>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default FilterProductsScreen;
