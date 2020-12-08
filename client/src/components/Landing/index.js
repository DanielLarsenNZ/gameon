import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import tournaments from '../../helpers/sampleData';
import Loader from '../Loader';
import NewTournamentModal from './NewTournamentModal';
import TournamentCard from './TournamentCard';

const Landing = ({ loading }) => {
  const { t } = useTranslation('common');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const toggleNewModal = () => setIsNewModalOpen(!isNewModalOpen);

  return (
    <>
      <div className="">
        {/* Loader */}
        {loading && <Loader />}

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
            <Col lg={6} xl={4} key={t.id}>
              <TournamentCard
                id={t.id}
                title={t.title}
                description={t.description}
                location={t.location}
                timing={t.timing}
                endDate={t.endDate}
                isOpenToJoin={t.isOpenToJoin}
                members={t.members}
                owner={t.owner}
              />
            </Col>
          ))}
        </Row>

        <NewTournamentModal isOpen={isNewModalOpen} toggle={toggleNewModal} />
      </div>
    </>
  );
};

export default Landing;
