import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import About from './About';
import AdminStats from './AdminStats';
import Leaderboard from './Leaderboard';

const Tournament = () => {
  const { t } = useTranslation('common');

  // TODO: Remove me later
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [tournament, setTournament] = useState({
    id: 1,
    name: 'Table Tennis Championship',
    description:
      "Every good tournament has an even better description to inform its potential players and tell them what's up for grabs. In this series, any player is welcome at any point in the competition. Every good tournament has an even better description to inform its potential players and tell them what's up for grabs. In this series, any player is welcome at any point in the competition.",
    location: 'The Hub, Auckland',
    playingFor: 'Land the plane they have downloaded gmail and seems to be working for now granularity.',
    playerCount: 3,
    players: [],
    startDate: today,
    endDate: tomorrow,
    timeOfPlayDescription: 'Every Mon, Wed, Fri at Lunch',
    maxPlayers: 25,
    owner: { id: 1234 },
    rulesURL: 'https://www.rulesofsport.com/sports/table-tennis-ping-pong.html',
  });
  const isPlayer = true;

  return (
    <>
      <Row className="page-title">
        <Col sm={8} xl={6}>
          <h4 className="mb-1 mt-0">{tournament.name}</h4>
        </Col>
        <Col sm={4} xl={6} className="text-md-right">
          {isPlayer ? (
            <>
              <div className="btn-group ml-2 d-none d-sm-inline-block">
                <button type="button" className="btn btn-primary btn-sm">
                  <i className="uil uil-edit mr-1"></i>
                  {t('tournament.edit_tournament')}
                </button>
              </div>
              <div className="btn-group ml-1 d-none d-sm-inline-block">
                <button type="button" className="btn btn-danger btn-sm">
                  <i className="uil uil-exit mr-1"></i>
                  {t('tournament.exit_tournament')}
                </button>
              </div>
            </>
          ) : (
            <button type="button" className="btn btn-danger mb-3 mb-sm-0">
              <i className="uil-user-plus mr-1"></i> Join this Tournament
            </button>
          )}
        </Col>
      </Row>
      <AdminStats players={42} games={89} last7={14} last30={53} /> {/* TODO: Remove Temp Data */}
      <Row>
        <Col xl={4}>
          <Leaderboard />
        </Col>
        <Col xl={8}>
          <About
            description={tournament.description}
            reward={tournament.playingFor}
            rulesURL={tournament.rulesURL}
            startDate={tournament.startDate}
            endDate={tournament.endDate}
            location={tournament.location}
            timeOfPlay={tournament.timeOfPlayDescription}
            maxPlayers={tournament.maxPlayers}
            playerCount={tournament.playerCount}
          />
        </Col>
      </Row>
    </>
  );
};

export default Tournament;
