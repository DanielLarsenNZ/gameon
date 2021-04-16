import { add } from 'date-fns';
import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Card, CardBody, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { initialsAvatarURL, sanitiseName } from '../../helpers/Helpers';

const TournamentCard = ({
  id,
  title,
  description,
  startDate,
  endDate,
  isOpenToJoin,
  location,
  hasReward,
  players = [],
}) => {
  const { t } = useTranslation('common');

  const getStatusMessage = ({ startDate, endDate }) => {
    const today = new Date();

    if (startDate > today) {
      return { color: 'info', text: 'Starting Soon' };
    }
    if (endDate && endDate < today) {
      return { color: 'danger', text: 'Finished' };
    }
    if (!endDate || endDate > add(today, { weeks: 2 })) {
      return { color: 'success', text: 'Ongoing' };
    } else if (!startDate) {
      return { color: 'info', text: 'Register Today' };
    } else {
      return { color: 'warning', text: 'Ending Soon' };
    }
  };

  const { color, text } = getStatusMessage(new Date(startDate), new Date(endDate));
  const descLimit = 250;

  return (
    <Card>
      <CardBody>
        <div className={`badge float-right badge-${color}`}>{text}</div>
        <p className={`text-uppercase font-size-12 mb-2 text-${color}`}>{location}</p>

        <h5>
          <Link to={`/tournaments/${id}`} className="text-dark">
            {title}
          </Link>
        </h5>

        <p className="text-muted mb-4">
          {description.length > descLimit ? description.substring(0, descLimit) + '...' : description}
        </p>

        <div>
          {/* NOTE: Tournament owner is the only member */}
          {players.length === 1 ? (
            <p>{t('tournament.be_first_to_join')}</p>
          ) : (
            <>
              {/* Show 7 members max */}
              {players.slice(0, 7).map((player, i) => {
                const { givenName = '', surname = '' } = player;
                const avatarURL = initialsAvatarURL(givenName, surname);

                return (
                  <Fragment key={`avatar-${i}-${id}`}>
                    <img
                      src={player?.imageUrl || avatarURL}
                      className="d-inline-block avatar-sm m-1 rounded-circle"
                      alt="Player Avatar"
                      id={`avatar-${i}-${id}`}
                    />
                    <UncontrolledTooltip placement="top" id={`tooltip-${i}-${id}`} target={`avatar-${i}-${id}`}>
                      {sanitiseName(givenName, surname)}
                    </UncontrolledTooltip>
                  </Fragment>
                );
              })}
            </>
          )}
          {players.length - 7 > 0 && (
            <a href="/" className="">
              <div className="avatar-sm font-weight-bold d-inline-block m-1">
                <span className="avatar-title rounded-circle bg-soft-info text-info">+{players.length - 7}</span>
              </div>
            </a>
          )}
        </div>
      </CardBody>

      <CardBody className="border-top">
        <Row className="align-items-center">
          <Col className="col-sm-auto">
            {hasReward && (
              <ul className="list-inline mb-0">
                <li className="list-inline-item pr-2">
                  <div className="text-muted d-inline-block" id={`reward-${id}`}>
                    <i className={`uil uil-trophy mr-2 ${isOpenToJoin && 'text-warning'}`}></i>
                    {t('tournament.prizes.text')}
                  </div>
                  <UncontrolledTooltip placement="top" target={`reward-${id}`}>
                    {t('tournament.prizes.tool_tip')}
                  </UncontrolledTooltip>
                </li>
              </ul>
            )}
          </Col>
          <Col className="ml-auto">
            <ul className="list-inline mb-0 text-right">
              <li className="list-inline-item pr-2">
                <Link to={`tournaments/${id}`} className="btn btn-primary d-inline-block" id={`join-${id}`}>
                  {t('tournament.view')}
                </Link>
              </li>
            </ul>
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
};

export default TournamentCard;
