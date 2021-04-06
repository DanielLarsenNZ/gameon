import React from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';

const Details = () => {
  const updateBasicDetails = () => console.log('User wants to update basic details.');
  const updateDates = () => console.log('User wants to update the dates.');
  const updateRewards = () => console.log('User wants to update the reward.');

  return (
    <>
      <h4 className="header-title mt-2">Tournament Details</h4>
      <Form>
        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="title">Title</Label>
              <Input type="text" name="title" id="title" placeholder="e.g. Table Tennis - Singles 2021" required />
            </FormGroup>

            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="description"
                id="description"
                placeholder="e.g. Tell everyone what this tournament is about..."
                rows={5}
                required
              />
            </FormGroup>

            <Button color="info" onClick={() => updateBasicDetails()} disabled>
              <i className="uil uil-check mr-2"></i>
              Update Details
            </Button>
          </Col>

          <Col md={6}>
            <FormGroup>
              <Label for="location">Location</Label>
              <Input type="text" name="location" id="location" placeholder="e.g. The Lunch Room" required />
            </FormGroup>

            <FormGroup>
              <Label for="timing">Timing (leave blank if players can play at any time)</Label>
              <Input type="text" name="timing" id="timing" placeholder="e.g. Every Wednesday" />
            </FormGroup>

            <FormGroup>
              <Label for="rulesURL">Link to Rules</Label>
              <Input
                type="text"
                name="rulesURL"
                id="rulesURL"
                placeholder="eg. https://www.rulesofsport.com/table-tennis.html"
              />
            </FormGroup>
          </Col>
        </Row>

        <div className="border-top mt-4 mb-4" />
        <h4 className="header-title">Tournament Dates</h4>

        <Row>
          <Col md={6}>
            <FormGroup tag="fieldset">
              <Label for="start">When does this tournament end?</Label>

              <FormGroup check>
                <Label check>
                  <Input type="radio" name="hasEndDate" defaultChecked /> No End Date (ongoing)
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="hasEndDate" disabled /> Set an End Date
                </Label>
              </FormGroup>
            </FormGroup>

            <FormGroup hidden>
              <Label for="end">End Date</Label>
              <Input type="text" name="end" id="end" placeholder="eg. 25 / 06 / 2021" />
            </FormGroup>

            <Button color="info" onClick={() => updateDates()} disabled>
              <i className="uil uil-check mr-2"></i>
              Update Dates
            </Button>
          </Col>
          <Col md={6}>
            <p>Why should I be defining an end date?</p>
            <ul>
              <li>Players will know the competition is time-boxed.</li>
              <li>Matches may occur more frequently.</li>
              <li>We automate the competition window for you.</li>
            </ul>
          </Col>
        </Row>

        <div className="border-top mt-4 mb-4" />
        <h4 className="header-title">Rewards</h4>

        <Row>
          <Col md={6}>
            <FormGroup>
              <Label for="rewards">Description of Rewards &amp; Eligibility</Label>
              <Input
                type="textarea"
                name="rewards"
                id="rewards"
                placeholder="e.g. Chocolates for the top 5 players."
                rows={3}
              />
            </FormGroup>

            <Button color="info" onClick={() => updateRewards()} disabled>
              <i className="uil uil-check mr-2"></i>
              Update Rewards
            </Button>
          </Col>
          <Col md={6}>
            <p>Why are rewards important?</p>
            <ul>
              <li>Rewards incentivise players to participate.</li>
              <li>They provide a sense of achievement.</li>
              <li>Competitions with rewards attract more plauers.</li>
            </ul>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Details;
