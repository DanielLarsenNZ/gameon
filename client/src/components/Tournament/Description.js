import classNames from 'classnames';
import React, { useState } from 'react';
import { Card, CardBody, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

const Description = () => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <Card>
      <CardBody>
        <Nav className="nav-pills navtab-bg">
          <NavItem>
            <NavLink
              href="#"
              className={classNames({ active: activeTab === 'description' })}
              onClick={() => {
                setActiveTab('description');
              }}>
              Description
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              href="#"
              className={classNames({ active: activeTab === 'settings' })}
              onClick={() => {
                setActiveTab('settings');
              }}>
              Settings
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="description">
            <h3>Tab 1</h3>
            {/* <Comments /> */}
          </TabPane>
          <TabPane tabId="settings">
            {/* <Attachments /> */}
            <h3>Tab 2</h3>
          </TabPane>
        </TabContent>
      </CardBody>
    </Card>
  );
};

export default Description;
