import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import About from './About';
import AdminStats from './AdminStats';
import Leaderboard from './Leaderboard';

const Tournament = () => {
  const { t } = useTranslation('common');

  const [tournament, setTournament] = useState({ title: 'Table Tennis Championship' });
  const isPlayer = true;

  return (
    <>
      <Row className="page-title">
        <Col sm={8} xl={6}>
          <h4 className="mb-1 mt-0">{tournament.title}</h4>
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
          <About />
        </Col>
      </Row>
    </>
  );
};

export default Tournament;
