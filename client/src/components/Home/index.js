import { useAccount, useMsal } from '@azure/msal-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import Loader from '../Loader';
import NewTournamentModal from './NewTournamentModal';
import TournamentCard from './TournamentCard';

const fetchAll = async (accessToken) => {
  const { REACT_APP_API_URI } = process.env;

  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers: headers,
  };

  try {
    const response = await fetch(`${REACT_APP_API_URI}/tournaments`, options);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

const Home = ({ loading }) => {
  const { t } = useTranslation('common');
  const [isNewModalOpen, setIsNewModalOpen] = useState(false);
  const toggleNewModal = () => setIsNewModalOpen(!isNewModalOpen);

  const [tournaments, setTournaments] = useState(null);

  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  useEffect(() => {
    if (account) {
      instance
        .acquireTokenSilent({
          scopes: ['api://GameOn.Api/Users'],
          account: account,
        })
        .then((response) => {
          if (response) {
            fetchAll(response.accessToken)
              .then((result) => setTournaments(result))
              .catch((err) => console.log(err));
          }
        })
        .catch(function (error) {
          //Acquire token silent failure, and send an interactive request
          console.log(error);
          if (error.errorMessage.indexOf('interaction_required') !== -1) {
            instance.acquireTokenRedirect({
              scopes: ['api://GameOn.Api/Users'],
              account: account,
            });
          }
        });
    }
  }, [account, instance]);

  return (
    <>
      {!tournaments && <Loader />}

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
        {tournaments &&
          tournaments.map((t) => (
            <Col key={t.id} lg={6} xl={4}>
              <TournamentCard
                id={t.id}
                title={t.name}
                description={t.description}
                location={t.location}
                timing={t.TimeOfPlayDescription}
                endDate={t.endDate}
                isOpenToJoin={t.isOpenToJoin}
                players={t.players}
                owner={t.owner}
              />
            </Col>
          ))}
      </Row>

      <NewTournamentModal isOpen={isNewModalOpen} toggle={toggleNewModal} />
    </>
  );
};

export default Home;
