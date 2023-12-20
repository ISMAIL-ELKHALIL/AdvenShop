const Testimonial = () => {
  return (
    <section className="testimonial">
      <h1 className="title">Testimonial</h1>
      <span className="line-title"></span>
      <div id="carouselExample" className="carousel-testimonial carousel slide">
        <div className="carousel-inner container">
          <div className="carousel-item carousel-item-testi active">
            <img
              src={`${process.env.PUBLIC_URL}/images/avatar.png`}
              className="d-block avatar"
              alt="..."
            />
            <h4>John Smith</h4>
            <div className="rating">
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              voluptatibus exercitationem earum officia numquam unde laboriosam
              sint, labore mollitia ex. Minima possimus, labore maiores illo
              molestiae commodi esse alias qui.
            </p>
          </div>
          <div className="carousel-item carousel-item-testi">
            <img
              src={`${process.env.PUBLIC_URL}/images/avatar.png`}
              className="d-block avatar"
              alt="..."
            />
            <h4>Ahmed Elmensouri</h4>
            <div className="rating">
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              voluptatibus exercitationem earum officia numquam unde laboriosam
              sint, labore mollitia ex. Minima possimus, labore maiores illo
              molestiae commodi esse alias qui.
            </p>
          </div>
          <div className="carousel-item carousel-item-testi">
            <img
              src={`${process.env.PUBLIC_URL}/images/avatar.png`}
              className="d-block avatar"
              alt="..."
            />
            <h4>John Smith</h4>
            <div className="rating">
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
              <span className="star">
                <i className="bi bi-star-fill"></i>
              </span>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas
              voluptatibus exercitationem earum officia numquam unde laboriosam
              sint, labore mollitia ex. Minima possimus, labore maiores illo
              molestiae commodi esse alias qui.
            </p>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          {/* <span class="carousel-control-prev-icon" aria-hidden="true"></span> */}
          <span className="prev">
            <i className="bi bi-chevron-left"></i>
          </span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          {/* <span class="carousel-control-next-icon" aria-hidden="true"></span> */}
          <span className="next">
            <i className="bi bi-chevron-right"></i>
          </span>
        </button>
      </div>
    </section>
  );
};

export default Testimonial;
