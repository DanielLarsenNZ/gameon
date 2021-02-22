import { useAccount, useMsal } from '@azure/msal-react';
import React, { useState, useEffect } from 'react';
import Loader from '../Loader';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import About from './About';
import AdminStats from './AdminStats';
import ChallengeWidget from './ChallengeWidget';
import Leaderboard from './Leaderboard';
import { useProfile } from '../App/Profile';

const { REACT_APP_API_URI } = process.env;

const fetchTournament = async (id, accessToken) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);

  const options = {
    method: 'GET',
    headers: headers,
  };

  try {
    const response = await fetch(`${REACT_APP_API_URI}/tournaments/${id}`, options);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

const joinTournament = async (tid, uid, accessToken) => {
  const headers = new Headers();
  const bearer = `Bearer ${accessToken}`;

  headers.append('Authorization', bearer);
  headers.append('Content-Type', 'application/json');

  const options = {
    method: 'POST',
    headers: headers,
    body: `["${uid}"]`,
  };

  try {
    const response = await fetch(`${REACT_APP_API_URI}/tournaments/${tid}/players`, options);
    return await response.json();
  } catch (error) {
    return console.log(error);
  }
};

const Tournament = ({ match, location }) => {
  const { t } = useTranslation('common');

  // Get search params
  const { id } = match.params;
  const params = new URLSearchParams(location.search);
  const action = params.get('action');

  // Tournament Store
  const [tournament, setTournament] = useState({});

  const { instance, accounts } = useMsal();
  const account = useAccount(accounts[0] || {});

  const { profile } = useProfile();

  useEffect(() => {
    if (account) {
      instance
        .acquireTokenSilent({
          scopes: ['api://GameOn.Api/Users'],
          account: account,
        })
        .then((response) => {
          if (response) {
            fetchTournament(id, response.accessToken)
              .then((result) => setTournament(result))
              .then(() => {
                if (action === 'join') {
                  joinTournament(id, profile?.id, response.accessToken);
                }
              })
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
  }, [id, account, instance]);

  // TODO: Remove me later
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // const [tournament, setTournament] = useState({
  //   id: 1,
  //   name: 'Table Tennis Championship',
  //   description:
  //     "Every good tournament has an even better description to inform its potential players and tell them what's up for grabs. In this series, any player is welcome at any point in the competition. Every good tournament has an even better description to inform its potential players and tell them what's up for grabs. In this series, any player is welcome at any point in the competition.",
  //   location: 'The Hub, Auckland',
  //   playingFor: 'Land the plane they have downloaded gmail and seems to be working for now granularity.',
  //   playerCount: 3,
  //   players: [],
  //   startDate: today,
  //   endDate: tomorrow,
  //   timeOfPlayDescription: 'Every Mon, Wed, Fri at Lunch',
  //   maxPlayers: 25,
  //   owner: { id: 1234 },
  //   rulesURL: 'https://www.rulesofsport.com/sports/table-tennis-ping-pong.html',
  // });
  const isPlayer = true;

  return (
    <>
      {!tournament && <Loader />}
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
      <AdminStats players={tournament?.playerCount} games={89} last7={14} last30={53} /> {/* TODO: Remove Temp Data */}
      <Row>
        <Col xl={4}>
          <ChallengeWidget name="Erik Employee" endDate="02 February" />
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
