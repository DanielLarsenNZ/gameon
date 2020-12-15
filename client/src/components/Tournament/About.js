import React from 'react';
import { Card, CardBody } from 'reactstrap';

const About = () => {
  return (
    <Card>
      <CardBody>
        <h6 className="mt-0 header-title">About this Tournament</h6>

        <div className="text-muted mt-3">
          <p>
            Every good tournament has an even better description to inform its potential players and tell them what's up
            for grabs. In this series, any player is welcome at any point in the competition. Every good tournament has
            an even better description to inform its potential players and tell them what's up for grabs. In this
            series, any player is welcome at any point in the competition.
          </p>

          <h6 className="mt-0 header-subtitle">Rules</h6>
          <ul className="pl-4 mb-4">
            <li>
              We need distributors to evangelize the new line to local markets that's not on the roadmap optimize for
              search.
            </li>
            <li>
              Scope creep. What do you feel you would bring to the table if you were hired for this position circle back
              get all your ducks in a row.
            </li>
            <li>
              Minimize backwards overflow incentivization form without content style without meaning or social currency.
            </li>
            <li>In an ideal world teams were able to drive adoption and awareness powerpoint.</li>
          </ul>

          <h6 className="mt-0 header-subtitle">Reward</h6>
          <p>Land the plane they have downloaded gmail and seems to be working for now granularity.</p>

          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="mt-4">
                <p className="mb-2">
                  <i className="uil-calender text-danger"></i> Start Date
                </p>
                <h5 className="font-size-16">01 December 2020</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mt-4">
                <p className="mb-2">
                  <i className="uil-calendar-slash text-danger"></i> End Date
                </p>
                <h5 className="font-size-16">Ongoing</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mt-4">
                <p className="mb-2">
                  <i className="uil-clock text-danger"></i> When
                </p>
                <h5 className="font-size-16">Every Mon, Wed, Fri at Lunch</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="mt-4">
                <p className="mb-2">
                  <i className="uil-location-pin-alt text-danger"></i> Location
                </p>
                <h5 className="font-size-16">The Hub, Auckland</h5>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default About;
