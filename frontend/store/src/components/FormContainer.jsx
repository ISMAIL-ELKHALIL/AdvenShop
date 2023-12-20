import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import { useLoginMutation } from "../slices/usersApiSlice";


const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

FormContainer.propTypes = {
  children: PropTypes.array,
};

export default FormContainer;
