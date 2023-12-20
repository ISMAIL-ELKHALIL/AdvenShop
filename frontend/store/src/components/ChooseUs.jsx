import React from "react";

const ChooseUs = () => {
  return (
      <section>
      <h2 className="title">Why Choose Us</h2>
      <span className="line-title"></span>
      <div className="choose-us">
        <div className="container">
          
          <div className="row">
            <div className="col-md-6 col-lg-4">
              <div className="choose-item">
                <i className="bi bi-diagram-3"></i>
                <h4>Expertly Curated Selection</h4>
                <p>
                  Our team of outdoor enthusiasts meticulously selects each
                  product to ensure it meets the highest standards of
                  performance and reliability
                </p>
              </div>
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="choose-item">
                <i className="bi bi-tree"></i>
                <h4>Passion for Adventure</h4>
                <p>
                  We don't just sell gear; we live and breathe the outdoor
                  lifestyle. Our passion for adventure fuels our dedication to
                  providing you with the best tools for your journey
                </p>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="choose-item">
                <i className="bi bi-nut"></i>
                <h4>Centric Approach</h4>
                <p>
                  Your satisfaction is our top priority. We are here to assist
                  you at every step, from choosing the right gear to ensuring a
                  smooth shopping experience
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
  );
};

export default ChooseUs;
