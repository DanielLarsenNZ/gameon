import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import { useAPI } from '../../helpers/useApi';
import useModalState from '../../helpers/useModalState';
import Loader from '../Loader';
import NewTournamentModal from './NewTournamentModal';
import TournamentCard from './TournamentCard';

const Home = () => {
  const { t } = useTranslation('common');
  const { isOpen, onToggle } = useModalState();

  const { data: tournaments = [], status, error } = useAPI('/tournaments');

  return (
    <>
      {status === 'fetching' && <Loader />}

      <Row className="page-title">
        <Col md={3} xl={6}>
          <h4 className="mb-1 mt-0">{t('landing.title')}</h4>
        </Col>
        <Col md={9} xl={6} className="text-md-right">
          <div className="mt-4 mt-md-0">
            <button type="button" className="btn btn-danger mr-4 mb-3 mb-sm-0" onClick={() => onToggle()}>
              <i className="uil-plus mr-1"></i> {t('tournament.create')}
            </button>
            {/* <div className="btn-group mb-3 mb-sm-0">
              <button type="button" className="btn btn-sm btn-primary">
                {t('landing.filter_all')}
              </button>
              <button type="button" className="btn btn-sm btn-white">
                {t('landing.filter_joined')}
              </button>
            </div>
            <div className="btn-group ml-1">
              <button type="button" className="btn btn-sm btn-primary">
                {t('landing.filter_ongoing')}
              </button>
              <button type="button" className="btn btn-sm btn-white">
                {t('landing.filter_finished')}
              </button>
            </div>
            <div className="btn-group ml-2 d-none d-sm-inline-block">
              <button type="button" className="btn btn-primary btn-sm">
                <i className="uil uil-apps"></i>
              </button>
            </div>
            <div className="btn-group d-none d-sm-inline-block ml-1">
              <button type="button" className="btn btn-white btn-sm">
                <i className="uil uil-align-left-justify"></i>
              </button>
            </div> */}
          </div>
        </Col>
      </Row>

      <Row>
        {error && (
          <>
            There was an error: <pre>{JSON.stringify(error, null, 2)}</pre>
          </>
        )}
        {tournaments.map((t) => (
          <Col key={t.id} lg={6} xl={4}>
            <TournamentCard
              id={t.id}
              title={t.name}
              description={t.description}
              location={t.location}
              hasReward={t.playingFor !== null}
              startDate={t.startDate}
              endDate={t.endDate}
              isOpenToJoin={!t.isOpenToJoin}
              players={t.players}
              owner={t.owner}
            />
          </Col>
        ))}
      </Row>

      <NewTournamentModal isOpen={isOpen} toggle={onToggle} />
    </>
  );
};

export default Home;
