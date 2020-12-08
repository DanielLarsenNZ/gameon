import classNames from 'classnames';
import React from 'react';
import { Button, Card, CardBody, Col, Row, UncontrolledTooltip } from 'reactstrap';

const TournamentCard = ({ id, title, description, endDate, isOpenToJoin, location, timing, members = [], owner }) => {
  return (
    <Card>
      <CardBody>
        <div
          className={classNames('badge', 'float-right', {
            'badge-success': endDate === true,
            'badge-warning': endDate === false,
          })}>
          {endDate ? 'Ongoing' : 'Finished'}
        </div>
        <p
          className={classNames('text-uppercase', 'font-size-12', 'mb-2', {
            'text-success': endDate === true,
            'text-warning': endDate === false,
          })}>
          {location}
        </p>

        <h5>
          <a href="/" className="text-dark">
            {title}
          </a>
        </h5>

        <p className="text-muted mb-4">{description}</p>

        <div>
          {/* NOTE: Tournament owner is the only member */}
          {members.length === 1 ? (
            <p>Be the first to join!</p>
          ) : (
            <>
              {/* Show 7 members max */}
              {members.slice(0, 7).map((member) => (
                <a key={member.id} href="/" className="d-inline-block mr-1">
                  <img src={member?.imageUrl} className="avatar-sm m-1 rounded-circle" alt="Player Avatar" />
                </a>
              ))}
            </>
          )}
          {members.length - 7 > 0 && (
            <a href="/" className="">
              <div className="avatar-sm font-weight-bold d-inline-block m-1">
                <span className="avatar-title rounded-circle bg-soft-info text-info">+{members.length - 7}</span>
              </div>
            </a>
          )}
        </div>
      </CardBody>

      <CardBody className="border-top">
        <Row className="align-items-center">
          <Col className="col-sm-auto">
            {timing && (
              <ul className="list-inline mb-0">
                <li className="list-inline-item pr-2">
                  <a href="/" className="text-muted d-inline-block" id={`timing-${id}`}>
                    <i className="uil uil-calender mr-1"></i> {timing}
                  </a>
                  <UncontrolledTooltip placement="top" target={`timing-${id}`}>
                    You can play at any time. No recurring meetups are scheduled.
                  </UncontrolledTooltip>
                </li>
              </ul>
            )}
          </Col>
          <Col className="ml-auto">
            <ul className="list-inline mb-0 text-right">
              <li className="list-inline-item pr-2">
                {isOpenToJoin ? (
                  <>
                    <Button color="primary" className="d-inline-block" id={`join-${id}`} disabled={!id}>
                      Join Tournament
                    </Button>
                    <UncontrolledTooltip placement="top" target={`join-${id}`}>
                      Immediately join this tournament.
                    </UncontrolledTooltip>
                  </>
                ) : (
                  <>
                    <Button color="light" className="d-inline-block" id={`contact-${id}`} disabled={!id}>
                      Registrations Closed
                    </Button>
                    <UncontrolledTooltip placement="top" target={`contact-${id}`}>
                      Contact the tournament owner.
                    </UncontrolledTooltip>
                  </>
                )}
              </li>
            </ul>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default TournamentCard;
