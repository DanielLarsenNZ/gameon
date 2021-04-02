import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from 'reactstrap';
import imgNotFound from '../assets/images/not-found.png';

const Error = ({ title, children }) => {
  return (
    <div className="account-pages my-5">
      <Container>
        <Row className="justify-content-center">
          <Col xl={4} lg={5}>
            <div className="text-center">
              <div>
                <img src={imgNotFound} alt="" className="img-fluid" />
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center">
            <h3 className="mt-3">{title}</h3>
            <p className="text-muted mb-5">{children}</p>

            <Link to="/" className="btn btn-lg btn-primary mt-4">
              Take me Home
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const Error500 = () => (
  <Error title="Opps, something went wrong">
    Server Error 500. We apoligise and are fixing the problem.
    <br /> Please try again at a later stage.
  </Error>
);

const Error404 = () => (
  <Error title="We couldn’t connect the dots">
    This page was not found. <br /> You may have mistyped the address or the page may have moved.
  </Error>
);

const ComingSoon = () => (
  <Error title="We're still building this thing!">
    You've stumbled upon a gem; but we aren't ready for you yet.
    <br /> Please try again at a later stage.
  </Error>
);

export { ComingSoon, Error500, Error404 };
