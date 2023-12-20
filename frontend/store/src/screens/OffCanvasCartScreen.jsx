import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button } from "react-bootstrap";
import SideCartScreen from "./SideCartScreen";

function OffCanvasCartScreen({ disabled, onClick }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <Button
        variant="primary"
        disabled={disabled}
        onClick={() => {
          toggleShow();
          onClick();
        }}
        className="me-2"
      >
      Add to cart
      </Button>
      <Offcanvas show={show} onHide={handleClose} backdrop={true} scroll>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as={"h3"}>Shopping Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SideCartScreen></SideCartScreen>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffCanvasCartScreen;
