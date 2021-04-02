import React, { useState } from 'react';
import { Card, CardBody, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import classNames from 'classnames';
import Details from './Details';

const EditTournament = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Row className="page-title">
        <Col md={12}>
          <h4 className="mb-1 mt-0">Edit Tournament</h4>
        </Col>
      </Row>

      <Row>
        <Col lg={3}>
          <Card>
            <CardBody>Tournament Information</CardBody>
          </Card>
        </Col>

        <Col lg={9}>
          <Card>
            <CardBody>
              <Nav className="nav nav-pills navtab-bg nav-justified">
                <NavItem>
                  <NavLink href="#" className={classNames({ active: activeTab === 1 })} onClick={() => setActiveTab(1)}>
                    Details
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" className={classNames({ active: activeTab === 2 })} onClick={() => setActiveTab(2)}>
                    Players
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" className={classNames({ active: activeTab === 3 })} onClick={() => setActiveTab(3)}>
                    Scores
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" className={classNames({ active: activeTab === 4 })} onClick={() => setActiveTab(4)}>
                    Notifications
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="#" className={classNames({ active: activeTab === 5 })} onClick={() => setActiveTab(5)}>
                    End Tournament
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab}>
                <TabPane tabId={1}>
                  <Details />
                </TabPane>
                <TabPane tabId={2}>
                  <p>Welcome to tab 2</p>
                </TabPane>
                <TabPane tabId={3}>
                  <p>Welcome to tab 3</p>
                </TabPane>
                <TabPane tabId={4}>
                  <p>Welcome to tab 4</p>
                </TabPane>
                <TabPane tabId={5}>
                  <p>Welcome to tab 5</p>
                </TabPane>
              </TabContent>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default EditTournament;
