const SeasonSection = () => {
  return (
    <section className="season">
 

      <div className="container">
        <div className="row box-seasons">
          <div className="col-sm-6 col-md-4 col-lg-4">
            <div className="box-season box-season1">
              <h3>Gloves</h3>
            </div>
          </div>
          <div className="d-none d-sm-block col-sm-6 col-md-4 col-lg-4">
            <div className="box-season box-season2">
              <h3>Crampons</h3>
            </div>
          </div>
          <div className="d-none d-md-block col-md-4 col-lg-4">
            <div className="box-season box-season3">
              <h3>Category</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="back-season">
      <div className="overlay-season">
        <div className="container">
          <h2 className="title-season">Winter season</h2>
          <p className="text-season">
          A winter hiking product is designed to cater to outdoor enthusiasts who enjoy hiking during the winter season.
          </p>
          <button className="btn-season btn">Discover more</button>
        </div>
      </div>
      </div>
      
    </section>
  );
};

export default SeasonSection;
