import React from 'react';
import { Award, Calendar, Clock, Users } from 'react-feather';
import { Card, CardBody, Col, Media, Row } from 'reactstrap';

const AdminStats = ({ players, games, last7, last30 }) => {
  return (
    <Row>
      <Col>
        <Card>
          <CardBody className="p-0">
            <Row className="py-1">
              <Col xl={3} sm={6}>
                <Media className="p-3">
                  <Users className="align-self-center icon-lg mr-4"></Users>
                  <Media body>
                    <h4 className="mt-0 mb-0">{players}</h4>
                    <span className="text-muted font-size-13">Total Players</span>
                  </Media>
                </Media>
              </Col>
              <Col xl={3} sm={6}>
                <Media className="p-3">
                  <Award className="align-self-center icon-lg mr-4"></Award>
                  <Media body>
                    <h4 className="mt-0 mb-0">{games}</h4>
                    <span className="text-muted font-size-13">Total Games</span>
                  </Media>
                </Media>
              </Col>
              <Col xl={3} sm={6}>
                <Media className="p-3">
                  <Clock className="align-self-center icon-lg mr-4"></Clock>
                  <Media body>
                    <h4 className="mt-0 mb-0">{last7}</h4>
                    <span className="text-muted font-size-13">Last 7 Days (Games)</span>
                  </Media>
                </Media>
              </Col>
              <Col xl={3} sm={6}>
                <Media className="p-3">
                  <Calendar className="align-self-center icon-lg mr-4"></Calendar>
                  <Media body>
                    <h4 className="mt-0 mb-0">{last30}</h4>
                    <span className="text-muted font-size-13">Last 30 Days (Games)</span>
                  </Media>
                </Media>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default AdminStats;
