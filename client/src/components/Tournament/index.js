import React from 'react';
import { useTranslation } from 'react-i18next';
import { Col, Row } from 'reactstrap';
import { useAPI } from '../../helpers/useApi';
import { useProfile } from '../App/Profile';
import Loader from '../Loader';
import About from './About';
import AdminStats from './AdminStats';
import ChallengeWidget from './ChallengeWidget';
import Leaderboard from './Leaderboard';

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
    // const response = await fetch(`${REACT_APP_API_URI}/tournaments/${tid}/players`, options);
    return console.log(JSON.stringify(uid, null, 2)); //await response.json();
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

  const { data: tournament, status, error } = useAPI(`/tournaments/${id}`);

  // FIXME: Fix fragile statement
  const { me } = useProfile();
  const hasUserJoined = tournament?.players?.some((player) => player.id === me?.id);

  /* TODO: Implement Joining
    if (action === 'join') {
      console.log('User wants to join this tournament.', profile?.id);
      joinTournament(id, profile?.id, response.accessToken);
    }  
  */

  return (
    <>
      {status === 'fetching' && <Loader />}
      {error && (
        <>
          There was an error: <pre>{JSON.stringify(error, null, 2)}</pre>
        </>
      )}
      {tournament && (
        <>
          <Row className="page-title">
            <Col sm={8} xl={6}>
              <h4 className="mb-1 mt-0">{tournament.name}</h4>
            </Col>
            <Col sm={4} xl={6} className="text-md-right">
              {hasUserJoined ? (
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
          <AdminStats players={tournament?.playerCount} games={89} last7={14} last30={53} />
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
      )}
    </>
  );
};

export default Tournament;
