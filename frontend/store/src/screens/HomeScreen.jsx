import { Row, Col, Button } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import OffCanvasCartScreen from "../screens/OffCanvasCartScreen";
import Carousel from "react-elastic-carousel";
import Categories from "../components/Categories";
import Testimonial from "../components/Testimonial";
import Value from "../components/Value";
import NavBarCategories from "../components/NavBarCategories";
import { useGetAllCategoriesQuery } from "../slices/categoriesApiSlice";

import ChooseUs from "../components/ChooseUs";

import SeasonSection from "../components/SeasonSection";
import HeaderVideo from "../components/HeaderVideo";
import { useEffect } from "react";

const HomeScreen = () => {
  const {
    data: products,
    isLoading: isLoadingProducts,
    error: errorProducts,
    refetch: refetchProducts,
  } = useGetProductsQuery({ refetchOnMountOrArgChange: true });

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: categoriesError,
    refetch: refetchCategories,
  } = useGetAllCategoriesQuery();

  // Redux hooks for accessing state and dispatching actions

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handles the addition of a product to the shopping cart.

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  useEffect(() => {
    refetchCategories();
    refetchProducts();
  }, [refetchCategories, refetchProducts]);

  return (
    <>
      {!isLoadingCategories &&
        !isLoadingProducts &&
        !categoriesError &&
        !errorProducts && (
          <NavBarCategories
            categories={categories}
            products={products}
          ></NavBarCategories>
        )}

      <HeaderVideo />

      <SeasonSection />

      <ChooseUs></ChooseUs>

      <Categories />

      <div className="container">
        <div className="last-posts">
          {isLoadingProducts ? (
            <Loader></Loader>
          ) : errorProducts ? (
            <Message variant={"danger"} className={"text-center"}>
              {
                "We're sorry, but we encountered an issue while processing your request."
              }
            </Message>
          ) : (
            <section className="last-products">
              <h2 className="title">Latest products</h2>
              <span className="line-title"></span>

              <Row>
                <Carousel
                  enableAutoPlay={true}
                  enableMouseSwipe
                  enableSwipe
                  pagination={false}
                  breakPoints={[
                    { width: 320, itemsToShow: 1 },
                    { width: 576, itemsToShow: 2 },
                    { width: 768, itemsToShow: 3 },
                    { width: 992, itemsToShow: 4 },
                    { width: 1200, itemsToShow: 5 },
                    { width: 1400, itemsToShow: 6 },
                  ]}
                >
                  {products?.slice(0, 10).map((product) => {
                    return (
                      <Col key={product._id} className="mx-1">
                        <Product className="product" product={product}>
                          {
                            <OffCanvasCartScreen
                              disabled={product.countInStock <= 0}
                              onClick={() => addToCartHandler(product, 1)}
                            >
                              add to cart
                            </OffCanvasCartScreen>
                          }
                        </Product>
                      </Col>
                    );
                  })}
                </Carousel>

                <Col className="text-center">
                  <Button className="btn-more" onClick={() => navigate("/products")}>
                    Show more
                  </Button>
                </Col>
              </Row>
            </section>
          )}
        </div>
      </div>

      <Testimonial />
      <Value />
      <button
        className="top"
        onClick={() => window.scrollTo(0, 0)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
        }}
      >
        <i className="bi bi-chevron-up"></i>
      </button>
    </>
  );
};

export default HomeScreen;
