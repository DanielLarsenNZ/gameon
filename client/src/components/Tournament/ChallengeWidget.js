import React from 'react';
import { Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledDropdown } from 'reactstrap';

const ChallengeWidget = ({ name, endDate }) => {
  return (
    <Card>
      <CardBody className="p-0">
        <Media className="p-3">
          <Media body>
            <span className="text-muted text-uppercase font-size-14 font-weight-bold">You've been challenged!</span>
            <br />
            <span className="text-muted text-uppercase font-size-12">
              <strong>Who:</strong> {name}
              <br />
              <strong>Deadline:</strong> {endDate}
            </span>
          </Media>
          <UncontrolledDropdown className="align-self-center float-right">
            <DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle text-muted">
              <i className="uil uil-ellipsis-v"></i>
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>
                <i className="uil uil-plus mr-2"></i>Submit Score
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem className="text-danger">
                <i className="uil uil-minus-circle mr-2"></i>Forfeit
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <div className="align-self-center">{/* <Icon className={'icon-lg'}></Icon> */}</div>
        </Media>
      </CardBody>
    </Card>
  );
};

export default ChallengeWidget;
