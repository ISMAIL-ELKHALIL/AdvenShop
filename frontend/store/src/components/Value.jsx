const Value = () => {
  return (
    <section className="values">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-md-3 col-lg-3">
            <div className="value">
              <i className="bi bi-truck"></i>
              <h3>Free shipping</h3>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3">
            <div className="value">
              <i className="bi bi-credit-card"></i>
              <h3>Secure payment</h3>
            </div>
          </div>
          <div className="col-sm-6 col-md-3 col-lg-3">
            <div className="value">
              <i className="bi bi-headset"></i>
              <h3>24/7 Support</h3>
            </div>
          </div>
            <div className="col-sm-6 col-md-3 col-lg-3">
                <div className="value">
                <i className="bi bi-clock"></i>
                <h3>30 days return</h3>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Value;
