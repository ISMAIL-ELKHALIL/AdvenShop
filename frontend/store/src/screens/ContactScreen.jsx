const ContactScreen = () => {
  return (
    <div className="contact">
      <header className="header-page header-contact">
        <div className="header-page-overlay">
          <h1>CONTACT</h1>
        </div>
      </header>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="contact-info-item">
              <i className="bi bi-geo-alt-fill"></i>
              <p>123 rue de la paix</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-info-item">
              <i className="bi bi-telephone-fill"></i>
              <p>06 12 34 56 78</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="contact-info-item">
              <i className="bi bi-envelope-fill"></i>
              <p>contact@adenshop.com</p>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-form">
        <div className="container">
          <div className="row">
            <div className="col-md-5">
              <h3>Send us message</h3>
              <form className="row">
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="first"
                    placeholder="First Name"
                  />
                </div>
                <div className="form-group col-md-6">
                  <input
                    type="text"
                    className="form-control"
                    id="last"
                    placeholder="Last Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="object"
                    placeholder="Object"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                    placeholder="Message"
                  ></textarea>
                </div>
                <button type="submit" className="btn-contact btn btn-primary">
                  Send
                </button>
              </form>
            </div>
            <div className="col-md-7">
              <h3>Find us on map</h3>
              <div className="mapouter">
                <div className="gmap_canvas">
                  <iframe
                    title="map"
                    width="100%"
                    height="100%"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=paris&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameBorder="0"
                    scrolling="no"
                    marginHeight="0"
                    marginWidth="0"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
