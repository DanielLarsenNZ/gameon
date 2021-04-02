import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const Details = () => {
  return (
    <>
      <h4 className="header-title mt-0">Update Details</h4>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="title" placeholder="Tournament 1" />
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="description" placeholder="Tournament Description" />
            </FormGroup>

            <Button color="primary" type="submit">
              Update
            </Button>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="title" placeholder="Tournament 1" />
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Input type="textarea" name="description" id="description" placeholder="Tournament Description" />
            </FormGroup>

            <Button color="primary" type="submit">
              Update
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Details;
