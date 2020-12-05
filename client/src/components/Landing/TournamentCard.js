import React from 'react';
import { Row, Col, Card, CardBody, Progress, UncontrolledTooltip, Button } from 'reactstrap';
import classNames from 'classnames';

const TournamentCard = () => {
  const tournament = {
    id: 1,
    title: 'Table Tennis Championship',
    state: 'Ongoing',
    shortDesc:
      "Every good tournament has an even better description to inform its potential players and tell them what's up for grabs. In this series, any player is welcome at any point in the competition.",
    memberCount: 0,
    location: 'The Hub, Auckland',
    timing: 'Anytime',
  };

  return (
    <Card>
      <CardBody>
        <div
          className={classNames('badge', 'float-right', {
            'badge-success': tournament.state === 'Finished',
            'badge-warning': tournament.state === 'Ongoing',
            'badge-info': tournament.state === 'Planned',
          })}>
          {tournament.state}
        </div>
        <p
          className={classNames('text-uppercase', 'font-size-12', 'mb-2', {
            'text-success': tournament.state === 'Finished',
            'text-warning': tournament.state === 'Ongoing',
            'text-info': tournament.state === 'Planned',
          })}>
          {tournament.location}
        </p>

        <h5>
          <a href="/" className="text-dark">
            {tournament.title}
          </a>
        </h5>

        <p className="text-muted mb-4">{tournament.shortDesc}</p>

        <div>
          {tournament.memberCount < 1 ? <p>Be the first to join this tournament</p> : <p>A few members</p>}
          {/* <a href="/" className="d-inline-block mr-1">
            <img src={avatar3} className="avatar-sm m-1 rounded-circle" alt="friend" />
          </a>

          <a href="/" className="d-inline-block mr-1">
            <img src={avatar1} className="avatar-sm m-1 rounded-circle" alt="friend" />
          </a> */}
          {/* {tournament.totalMembers - 2 > 0 && (
            <a href="/" className="">
              <div className="avatar-sm font-weight-bold d-inline-block m-1">
                <span className="avatar-title rounded-circle bg-soft-warning text-warning">
                  +{tournament.totalMembers - 2}
                </span>
              </div>
            </a>
          )} */}
        </div>
      </CardBody>

      <CardBody className="border-top">
        <Row className="align-items-center">
          <Col className="col-sm-auto">
            <ul className="list-inline mb-0">
              <li className="list-inline-item pr-2">
                <a href="/" className="text-muted d-inline-block" id={`timing-${tournament.id}`}>
                  <i className="uil uil-calender mr-1"></i> {tournament.timing}
                </a>
                <UncontrolledTooltip placement="top" target={`timing-${tournament.id}`}>
                  You can play at any time. No recurring meetups are scheduled.
                </UncontrolledTooltip>
              </li>
            </ul>
          </Col>
          <Col className="ml-auto">
            <ul className="list-inline mb-0">
              <li className="list-inline-item pr-2">
                <Button className="text-muted d-inline-block btn btn-secondary" id={`join-${tournament.id}`}>
                  Join Tournament
                </Button>
                <UncontrolledTooltip placement="top" target={`join-${tournament.id}`}>
                  Immediately join this tournament.
                </UncontrolledTooltip>
              </li>
            </ul>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default TournamentCard;
