import React from 'react';
import { ChevronDown, Edit, XOctagon } from 'react-feather';
import { useTranslation } from 'react-i18next';
import { Col, DropdownItem, DropdownMenu, DropdownToggle, Row, UncontrolledButtonDropdown } from 'reactstrap';
import { useAPI } from '../../helpers/useApi';
import { useProfile } from '../App/Profile';
import Loader from '../Loader';
import About from './About';
import AdminStats from './AdminStats';
import Leaderboard from './Leaderboard';

const Tournament = ({ match, location }) => {
  const { t } = useTranslation('common');

  // Get search params
  const { id } = match.params;
  const params = new URLSearchParams(location.search);
  // eslint-disable-next-line no-unused-vars
  const action = params.get('action');

  const { data: tournament, status, error } = useAPI(`/tournaments/${id}`);

  // FIXME: Fix fragile statement
  const { me } = useProfile();
  const hasUserJoined = tournament?.players?.some((player) => player.id === me?.id);
  const userIsOwner = tournament?.owner?.id === me?.id;

  /* TODO: Implement Joining
  if (action === 'join') {
    console.log('User wants to join this tournament.');
    joinTournament(id, profile?.id, response.accessToken);
  }*/

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
              {/* Players can quit, owner can't */}
              {hasUserJoined && !userIsOwner && (
                <div className="btn-group ml-1 d-none d-sm-inline-block">
                  <button type="button" className="btn btn-soft-danger btn-sm">
                    <i className="uil uil-exit mr-1"></i>
                    {t('tournament.exit_tournament')}
                  </button>
                </div>
              )}

              {/* Owner Actions */}
              {userIsOwner && (
                <UncontrolledButtonDropdown>
                  <DropdownToggle color="soft-danger" className="dropdown-toggle ml-2 btn-sm">
                    <i className="uil uil-cog mr-1"></i>Admin
                    <i className="icon ml-1">
                      <ChevronDown />
                    </i>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <DropdownItem>
                      <Edit className="icon-dual icon-xs mr-2"></Edit>
                      <span>{t('tournament.edit_tournament')}</span>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="text-danger">
                      <XOctagon className="icon-xs mr-2"></XOctagon>
                      <span>End Tournament</span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledButtonDropdown>
              )}

              {/* New users can join */}
              {!hasUserJoined && (
                <button type="button" className="btn btn-danger mb-3 mb-sm-0">
                  <i className="uil-user-plus mr-1"></i> Join this Tournament
                </button>
              )}
            </Col>
          </Row>
          <AdminStats players={tournament?.playerCount} games={89} last7={14} last30={53} />
          <Row>
            <Col xl={4}>
              {/* <ChallengeWidget name="Erik Employee" endDate="02 February" /> */}
              <Leaderboard tid={tournament?.id} canSubmitScore={hasUserJoined} />
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
