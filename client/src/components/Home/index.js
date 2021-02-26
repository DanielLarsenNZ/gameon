import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import { useAPI } from '../../helpers/useApi';
import Loader from '../Loader';
import NewTournamentModal from './NewTournamentModal';
import TournamentCard from './TournamentCard';

const Home = () => {
  const { t } = useTranslation('common');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const toggleNewModal = () => setIsNewModalOpen(!isNewModalOpen);

  const { data: tournaments, status, error } = useAPI('/tournaments');

  return (
    <>
      {status === 'fetching' && <Loader />}

      <Row className="page-title">
        <Col md={3} xl={6}>
          <h4 className="mb-1 mt-0">{t('landing.title')}</h4>
        </Col>
        <Col md={9} xl={6} className="text-md-right">
          <div className="mt-4 mt-md-0">
            <button type="button" className="btn btn-danger mr-4 mb-3 mb-sm-0" onClick={() => toggleNewModal()}>
              <i className="uil-plus mr-1"></i> {t('tournament.new_tournament')}
            </button>
            <div className="btn-group mb-3 mb-sm-0">
              <button type="button" className="btn btn-primary">
                {t('landing.filter_all')}
              </button>
            </div>
            <div className="btn-group ml-1">
              <button type="button" className="btn btn-white">
                {t('landing.filter_ongoing')}
              </button>
              <button type="button" className="btn btn-white">
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
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        {tournaments.map((t) => (
          <Col key={t.id} lg={6} xl={4}>
            <TournamentCard
              id={t.id}
              title={t.name}
              description={t.description}
              location={t.location}
              hasReward={t.playingFor !== null}
              endDate={t.endDate}
              isOpenToJoin={!t.isOpenToJoin}
              players={t.players}
              owner={t.owner}
            />
          </Col>
        ))}
        {error && (
          <>
            There was an error: <pre>{JSON.stringify(error, null, 2)}</pre>
          </>
        )}
      </Row>

      <NewTournamentModal isOpen={isNewModalOpen} toggle={toggleNewModal} />
    </>
  );
};

export default Home;
