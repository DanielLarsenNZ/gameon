import React from 'react';
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
import useModalState from '../../helpers/useModalState';
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
      <h3 className="mr-3 v-center float-right">{rank ? `#${rank}` : '--'}</h3>
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

const Leaderboard = ({ players = [], canSubmitScore }) => {
  const { t } = useTranslation('tournament');
  const { isOpen, onToggle } = useModalState();

  return (
    <>
      <Card>
        <CardBody className="pt-2">
          {canSubmitScore && (
            <Button outline className="float-right mt-2" size={'sm'} color="secondary" onClick={() => onToggle()}>
              <i className="uil uil-plus mr-2"></i>
              {t('actions.submit_score')}
            </Button>
          )}
          <h6 className="header-title mb-4">{t('leaderboard.title')}</h6>
          {!players.length ? (
            <p>Unable to load the leaderboard.</p>
          ) : (
            players.map((player) => (
              <Player
                key={player.id}
                imageUrl={initialsAvatarURL(player.givenName, player.surname)}
                name={player.name}
                rank={player.rank}
                points={player.rankingScore}
              />
            ))
          )}
        </CardBody>
      </Card>
      <NewScoreModal players={players} isOpen={isOpen} toggle={onToggle} />
    </>
  );
};

export default Leaderboard;
