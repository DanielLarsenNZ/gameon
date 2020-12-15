import React from 'react';
import { Card, CardBody, DropdownItem, DropdownMenu, DropdownToggle, Media, UncontrolledDropdown } from 'reactstrap';

const Player = ({ name, imageUrl, rank, points }) => {
  let icon = null;
  let text = `${points} points`;

  switch (rank) {
    case 1:
      text += ' | Champion';
      icon = 'trophy';
      break;
    case 2:
      text += ' | Runner up';
      icon = 'award';
      break;
    case 3:
      text += ' | Third Place';
      icon = 'award-alt';
      break;
    default:
      break;
  }
  return (
    <Media className="mt-1 border-top pt-3">
      <h3 className="mr-3 v-center float-right">{`#${rank}`}</h3>
      <img src={imageUrl} className={`avatar rounded mr-3`} alt={name} />
      <Media body>
        <h6 className="mt-1 mb-0 font-size-15">
          {name} <i className={`uil uil-${icon} mr-2 text-warning`} />
        </h6>

        <h6 className="text-muted font-weight-normal mt-1 mb-3">{text}</h6>
      </Media>

      <UncontrolledDropdown className="align-self-center float-right">
        <DropdownToggle tag="button" className="btn btn-link p-0 dropdown-toggle text-muted">
          <i className="uil uil-ellipsis-v"></i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>
            <i className="uil uil-exit mr-2"></i>Challenge this Player
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="text-danger">
            <i className="uil uil-exit mr-2"></i>Remove from Tournament
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Media>
  );
};

const Leaderboard = () => {
  return (
    <Card>
      <CardBody className="pt-2">
        <h6 className="header-title mb-4">Leaderboard</h6>

        <Player imageUrl="https://randomuser.me/api/portraits/men/34.jpg" name="Thomas Tester" rank={1} points={3400} />
        <Player
          imageUrl="https://randomuser.me/api/portraits/women/34.jpg"
          name="Emily Employee"
          rank={2}
          points={2800}
        />
        <Player imageUrl="https://randomuser.me/api/portraits/men/14.jpg" name="Erik Employee" rank={3} points={2000} />
        <Player imageUrl="https://randomuser.me/api/portraits/women/14.jpg" name="Emma Example" rank={4} points={840} />
      </CardBody>
    </Card>
  );
};

export default Leaderboard;
