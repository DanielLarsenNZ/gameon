import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  CardBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  UncontrolledDropdown,
} from 'reactstrap';
import { initialsAvatarURL } from '../../helpers/Helpers';
import { useAPI } from '../../helpers/useApi';
import NewScoreModal from './NewScoreModal';

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
            <i className="uil uil-grin mr-2"></i>Challenge Player
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="text-danger">
            <i className="uil uil-exit mr-2"></i>Remove Player
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Media>
  );
};

const Leaderboard = ({ tid, canSubmitScore }) => {
  const { t } = useTranslation('common');
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const toggleScoreModal = () => setIsScoreModalOpen(!isScoreModalOpen);

  // TODO: Implement endpoint in hook
  const scoreboard = [];
  const status = 'fetched';
  const error = 'Endpoint /rankings/{t_id} is not implemented.';
  // const { data: scoreboard, status, error } = useAPI(`/rankings/${tid}`);

  return (
    <>
      <Card>
        <CardBody className="pt-2">
          {canSubmitScore && (
            <Button
              outline
              className="float-right mt-2"
              size={'sm'}
              color="secondary"
              onClick={() => toggleScoreModal()}>
              <i className="uil uil-plus mr-2"></i>New Result
            </Button>
          )}
          <h6 className="header-title mb-4">{t('tournament.leaderboard')}</h6>
          {status === 'fetching' && <p>Building Leaderboard</p>}

          {error && <p>Unable to load the leaderboard.</p>}
          {scoreboard.map((ranking) => {
            const { player } = ranking;
            return (
              <Player
                key={player.id}
                imageUrl={initialsAvatarURL(player.givenName, player.surname)}
                name={player.name}
                rank={ranking.rank}
                points={ranking.score}
              />
            );
          })}
        </CardBody>
      </Card>
      <NewScoreModal players={[]} isOpen={isScoreModalOpen} toggle={toggleScoreModal} />
    </>
  );
};

export default Leaderboard;
