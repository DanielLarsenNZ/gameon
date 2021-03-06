import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, Col, Row, UncontrolledTooltip } from 'reactstrap';
import { initialsAvatarURL } from '../../helpers/Helpers';

const TournamentCard = ({ id, title, description, endDate, isOpenToJoin, location, hasReward, players = [] }) => {
  const { t } = useTranslation('common');

  return (
    <Card>
      <CardBody>
        <div
          className={classNames('badge', 'float-right', {
            'badge-success': endDate === true || !endDate,
            'badge-warning': endDate === false,
          })}>
          {endDate ? t('tournament.ongoing') : t('tournament.finished')}
        </div>
        <p
          className={classNames('text-uppercase', 'font-size-12', 'mb-2', {
            'text-success': endDate === true,
            'text-warning': endDate === false,
          })}>
          {location}
        </p>

        <h5>
          <Link to={`/tournaments/${id}`} className="text-dark">
            {title}
          </Link>
        </h5>

        <p className="text-muted mb-4">{description}</p>

        <div>
          {/* NOTE: Tournament owner is the only member */}
          {players.length === 1 ? (
            <p>{t('tournament.be_first_to_join')}</p>
          ) : (
            <>
              {/* Show 7 members max */}
              {players.slice(0, 7).map((player) => {
                const { givenName = '', surname = '' } = player;
                const avatarURL = initialsAvatarURL(givenName, surname);

                return (
                  <a key={player.id} href="/" className="d-inline-block mr-1">
                    <img
                      src={player?.imageUrl || avatarURL}
                      className="avatar-sm m-1 rounded-circle"
                      alt="Player Avatar"
                    />
                  </a>
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
                    <i className={`uil uil-trophy mr-1 ${isOpenToJoin && 'text-warning'}`}></i> Prizes
                  </div>
                  <UncontrolledTooltip placement="top" target={`reward-${id}`}>
                    {t('tournament.reward_offered')}
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
                    <Link to={`tournaments/${id}`} className="btn btn-primary d-inline-block" id={`join-${id}`}>
                      {t('tournament.join_tournament')}
                    </Link>
                    <UncontrolledTooltip placement="top" target={`join-${id}`}>
                      {t('tournament.join_tooltip')}
                    </UncontrolledTooltip>
                  </>
                ) : (
                  <>
                    <Button color="light" className="d-inline-block" id={`contact-${id}`} disabled={!id}>
                      {t('tournament.registrations_closed')}
                    </Button>
                    <UncontrolledTooltip placement="top" target={`contact-${id}`}>
                      {t('tournament.registrations_closed_tooltip')}
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
