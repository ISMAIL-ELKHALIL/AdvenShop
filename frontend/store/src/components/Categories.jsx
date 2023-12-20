const Categories = () => {
  return (
    <section className="categories">
      <h2 className="title">Our awesome categories</h2>
      <span className="line-title"></span>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-7">
            <div className="row">
              <div className="col-md-6 mt-3">
                <div className="box-category cat-1 ">
                  <div className="cat-overlay">
                    <h3>MEN</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="box-category cat-2">
                  <div className="cat-overlay">
                    <h3>WOMEN</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-12 mt-3">
                <div className="box-category cat-3">
                  <div className="cat-overlay">
                    <h3>EQUIPMENT</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-5">
            <div className="row">
              <div className="col-md-12">
                <div className="box-category cat-4 mt-3">
                  <div className="cat-overlay">
                    <h3>PACKS & BAGS </h3>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="box-category cat-5">
                  <div className="cat-overlay">
                    <h3>TENTS</h3>
                  </div>
                </div>
              </div>
              <div className="col-md-6 mt-3">
                <div className="box-category cat-6">
                  <div className="cat-overlay">
                    <h3>ACCESSORIES</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;
