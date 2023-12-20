import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const ProductCarousel = ({ products }) => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      infiniteLoop
      useKeyboardArrows
      autoPlay
      stopOnHover
    >
      {products.map((product) => (
        <div key={product._id}>
          <Product className="product" product={product}></Product>
        </div>
      ))}
    </Carousel>
  );
}

export default ProductCarousel;